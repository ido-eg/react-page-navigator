import React, { useMemo } from "react";
import RouteContext from "./RouteContext";
import { RouteConfig } from "./types";

interface RouteProviderProps {
    inactive: boolean;
    route: RouteConfig;
    children: React.ReactNode;
}

export default function RouteProvider({ inactive, route, children }: RouteProviderProps) {
    const style = useMemo(
        () => ({ width: "100%", height: "100%", ...(inactive ? { display: "none" } : undefined) }),
        [inactive]
    );
    return (
        <RouteContext.Provider value={route}>
            <div style={style} data-testid="route-provider" data-inactive={inactive}>{children}</div>
        </RouteContext.Provider>
    );
}
