import { useSyncExternalStore } from "react";
import history from "history/hash";

const listeners = { v: [] };
let unlisten;
function subscribeToHashUpdates(callback) {
    // 多次订阅只监听一次history
    if (listeners.v.push(callback) === 1) unlisten = history.listen(() => listeners.v.forEach((cb) => cb()));
    return () => {
        listeners.v = listeners.v.filter((i) => i !== callback);
        // 当没有订阅时移除监听
        if (!listeners.v.length && unlisten) unlisten = unlisten();
    };
}
const currentHashLocationPathname = () => history.location.pathname;
const navigate = (to, { state = null, replace = false } = {}) => (replace ? history.replace(to, state) : history.push(to, state));

export const useHashLocation = () => [useSyncExternalStore(subscribeToHashUpdates, currentHashLocationPathname), navigate];
