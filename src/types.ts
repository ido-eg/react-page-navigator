import React from "react";

export interface RouteConfig {
    path: string;
    component: React.ComponentType<any>;
    children?: RouteConfig[];
    key?: string;
    location?: string;
    pathname?: string;
}

export interface LocationState {
    i: number;
    [key: string]: any;
}
