import React, { useCallback, useSyncExternalStore } from "react";
import { Router } from "wouter";
import { navigate } from "./store";
import { createHashHistory } from "history";

const history = createHashHistory();

const listeners: { v: Array<() => void> } = { v: [] };
let unlisten: (() => void) | undefined;

function subscribeToSearch(callback: () => void) {
    if (listeners.v.push(callback) === 1) {
        unlisten = history.listen(() => {
            [...listeners.v].forEach((cb) => cb());
        });
    }
    return () => {
        listeners.v = listeners.v.filter((i) => i !== callback);
        if (!listeners.v.length && unlisten) {
            unlisten();
            unlisten = undefined;
        }
    };
}

const getSearch = () => history.location.search;

const stripQm = (str: string) => (str[0] === "?" ? str.slice(1) : str);
const unescape = (str: string) => {
    try {
        return decodeURI(str);
    } catch (_e) {
        return str;
    }
};

// 固定路由地址显示
export default function Record(props: { path: string; children: React.ReactNode }) {
    const hook = useCallback((_router: any) => {
        return [props.path, navigate] as [string, typeof navigate];
    }, [props.path]);
    
    // 从 history 同步获取 search 参数，这样组件在 search 变化时会重新渲染
    const currentSearch = useSyncExternalStore(subscribeToSearch, getSearch);
    
    const searchHook = useCallback(() => {
        return unescape(stripQm(currentSearch));
    }, [currentSearch]);
    
    return (
        <Router hook={hook} searchHook={searchHook}>
            {props.children}
        </Router>
    );
}
