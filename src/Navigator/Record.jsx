import { useCallback } from "react";
import { Router } from "wouter";
import { navigate } from "./store";

// 固定路由地址显示
export default function Record(props) {
    const hook = useCallback((router) => [router.base + props.path, navigate], [props.path]);
    return <Router hook={hook}>{props.children}</Router>;
}
