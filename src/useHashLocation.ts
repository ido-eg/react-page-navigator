import { useSyncExternalStore } from "react";
import { history, navigate } from "./store";

const listeners: { v: Array<() => void> } = { v: [] };
let unlisten: (() => void) | undefined;

function subscribeToHashUpdates(callback: () => void) {
    // 多次订阅只监听一次history
    if (listeners.v.push(callback) === 1) {
        unlisten = history.listen(() => {
            [...listeners.v].forEach((cb) => cb());
        });
    }
    return () => {
        listeners.v = listeners.v.filter((i) => i !== callback);
        // 当没有订阅时移除监听
        if (!listeners.v.length && unlisten) {
            unlisten();
            unlisten = undefined;
        }
    };
}

const currentHashLocationPathname = () => history.location.pathname;

export const useHashLocation = (): [string, typeof navigate] => [
    useSyncExternalStore(subscribeToHashUpdates, currentHashLocationPathname), 
    navigate
];
