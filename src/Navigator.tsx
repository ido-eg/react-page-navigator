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

export default function Navigator({ routes: initialRoutes }: NavigatorProps) {
    const [routes] = useState(() => initialRoutes);

    const records = useSyncExternalStore(subscribe, getSnapshot);
    const { parser } = useRouter();

    const children = useMemo(() => {
        // 将record转换到数组，相同路由并且是嵌套的结构会合并，比如三个record ['/','about/1','about/2']会合并为[{path:'/'},{path:'about',list:['/1','/2']}]
        const items: any[] = [];
        for (const record of records) {
            if (!record) continue;
            const matchRoutes = (currentRoutes: RouteConfig[], parent: any, list: any[]) => {
                for (const route of currentRoutes) {
                    if (!route.path) continue;
                    const path = parent.path ? (parent.path + route.path) : route.path;
                    // pathname 是嵌套路由所匹配的段，也是当前路由应该所在的段
                    let [matched, , pathname] = matchRoute(parser, path, record.pathname, !!route.children) as unknown as [boolean, any, string];
                    console.log(`Checking route: ${path} against ${record.pathname} -> matched: ${matched}`);
                    // 找到第一个匹配到的route
                    if (matched) {
                        let target = list.find((item) => item.key === path);
                        if (!target) {
                            target = { ...route, key: path, children: route.children ? [] : undefined, pathname };
                            list.push(target);
                        } else {
                            // 路由已存在时，将其移动到列表末尾，确保最后访问的页面始终在栈顶（最后）
                            const index = list.indexOf(target);
                            list.splice(index, 1);
                            list.push(target);
                        }
                        target.location = record.pathname;

                        if (route.children) {
                            matchRoutes(route.children, route, target.children);
                        }
                        break;
                    }
                }
            };
            // 每个 record 找到匹配的 route
            matchRoutes(routes, { path: "" }, items);
        }

        return items.map((item, index, arr) => {
            const Render = item.component;
            return (
                <Record key={item.path} path={item.location}>
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
