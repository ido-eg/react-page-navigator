import { useSyncExternalStore, useMemo, useState } from "react";
import { Route, useRouter, matchRoute } from "wouter";
import { subscribe, getSnapshot } from "./store";
import NavigatorContext from "./NavigatorContext";
import Record from "./Record";
import RouteProvider from "./RouteProvider";
import { RouteConfig } from "./types";

interface NavigatorProps {
    routes: RouteConfig[];
}

/** 更长（更具体）的 path 优先匹配，避免宽路径吞掉子路径 */
function sortBySpecificity(routes: RouteConfig[], parentPath: string) {
    return [...routes].sort((a, b) => {
        const pa = parentPath + (a.path || "");
        const pb = parentPath + (b.path || "");
        return pb.length - pa.length;
    });
}

export default function Navigator({ routes: initialRoutes }: NavigatorProps) {
    const [routes] = useState(() => initialRoutes);

    const records = useSyncExternalStore(subscribe, getSnapshot);
    const { parser } = useRouter();

    const children = useMemo(() => {
        const items: any[] = [];
        for (const record of records) {
            if (!record) continue;
            const matchRoutes = (currentRoutes: RouteConfig[], parent: any, list: any[]) => {
                const ordered = sortBySpecificity(currentRoutes, parent.path || "");
                for (const route of ordered) {
                    if (!route.path) continue;
                    const path = parent.path ? parent.path + route.path : route.path;
                    let [matched, , pathname] = matchRoute(parser, path, record.pathname, !!route.children) as unknown as [
                        boolean,
                        any,
                        string,
                    ];
                    if (matched) {
                        let target = list.find((item) => item.key === path);
                        if (!target) {
                            target = { ...route, key: path, children: route.children ? [] : undefined, pathname };
                            list.push(target);
                        } else {
                            const index = list.indexOf(target);
                            list.splice(index, 1);
                            list.push(target);
                        }
                        target.location = record.pathname;
                        target.pathname = pathname;

                        if (route.children) {
                            matchRoutes(route.children, { path }, target.children);
                        }
                        break;
                    }
                }
            };
            matchRoutes(routes, { path: "" }, items);
        }

        return items.map((item, index, arr) => {
            const Render = item.component;
            // key 带上具体 location，动态段变化时重新挂载，避免 params 残留
            const reactKey = `${item.path}@${item.location}`;
            return (
                <Record key={reactKey} path={item.location}>
                    <Route path={item.path} nest>
                        <RouteProvider inactive={index !== arr.length - 1} route={item}>
                            <Render />
                        </RouteProvider>
                    </Route>
                </Record>
            );
        });
    }, [records, routes, parser]);

    const ctx = useMemo(() => ({}), []);
    return <NavigatorContext.Provider value={ctx}>{children}</NavigatorContext.Provider>;
}
