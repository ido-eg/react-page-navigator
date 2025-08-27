import { useCallback } from "react";
import { Router } from "wouter";
import { navigate } from "./store";

const stripQm = (str) => (str[0] === "?" ? str.slice(1) : str);
const unescape = (str) => {
    try {
        return decodeURI(str);
    } catch (_e) {
        return str;
    }
};

// 固定路由地址显示
export default function Record(props) {
    const hook = useCallback((router) => [router.base + props.path, navigate], [props.path]);
    const searchHook = useCallback(() => {
        const [, search = ""] = location.hash.replace(/^#?\/?/, "").split("?");
        return [unescape(stripQm(search))];
    }, []);
    return (
        <Router hook={hook} searchHook={searchHook}>
            {props.children}
        </Router>
    );
}
