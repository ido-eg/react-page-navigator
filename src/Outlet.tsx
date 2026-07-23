import { useContext } from "react";
import { Route } from "wouter";
import RouteProvider from "./RouteProvider";
import RouteContext from "./RouteContext";

export default function Outlet() {
    const route = useContext(RouteContext);
    if (!route) return null;
    const list = route.children;
    
    return (
        list &&
        list.length !== 0 &&
        list.map((item: any, index: number, arr: any[]) => {
            const Render = item.component;
            return (
                <Route key={item.key} path={item.path}>
                    {(params) => {
                        console.log("wouter matched child!", item.path, params);
                        return (
                            <RouteProvider inactive={index !== arr.length - 1} route={item}>
                                <Render />
                            </RouteProvider>
                        );
                    }}
                </Route>
            );
        })
    );
}
