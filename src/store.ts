import { createHashHistory, createPath, Location, Action } from "history";
import { LocationState } from "./types";

export const history = createHashHistory();

export const navigate = (to: string, { state, replace = false }: { state?: any; replace?: boolean } = {}) => {
    const currentState = history.location.state as LocationState | null;
    const i = state?.i !== undefined ? state.i : (currentState?.i ?? 1);
    replace ? history.replace(to, { ...state, i: i }) : history.push(to, { ...state, i: i + 1 });
};

const listeners: { v: Array<() => void> } = { v: [] };
let unlisten: (() => void) | undefined;
let records: Location[] = [];

export function subscribe(callback: () => void) {
    // 多次订阅只监听一次history
    if (listeners.v.push(callback) === 1) {
        unlisten = history.listen(({ action, location }) => {
            const newRecords = [...records];
            const state = location.state as LocationState | null;
            
            // 直接在地址栏输入地址不存在state，通过replace设置state.i
            if (!state) {
                records = records.concat(location);
                return navigate(createPath(history.location), { replace: true, state: { i: records.length } });
            }
            if (action === Action.Replace) {
                newRecords.pop();
                newRecords.push(location);
            } else if (action === Action.Push) {
                newRecords.push(location);
            } else if (action === Action.Pop) {
                // 前进或后退时 records的数量应该等于state.i
                newRecords.length = state.i;
                // records最后一项填入page,前进或后退可能会跨多个record
                newRecords[newRecords.length - 1] = location;
            }
            records = newRecords;
            // 复制一份数组避免在遍历时发生 unmount 导致的原数组修改问题
            [...listeners.v].forEach((cb) => cb());
        });
        
        let currentState = { i: 1 };
        const historyState = history.location.state as LocationState | null;
        if (historyState?.i) {
            records.length = historyState.i;
            currentState = historyState;
        } else {
            // 如果初始进来没有state（如直接访问链接），先推入当前location
            records = [history.location];
        }
        navigate(createPath(history.location), { replace: true, state: currentState });
    }

    return () => {
        listeners.v = listeners.v.filter((i) => i !== callback);
        // 当没有订阅时移除监听
        if (!listeners.v.length && unlisten) {
            unlisten();
            unlisten = undefined;
            records = [];
        }
    };
}

export const getSnapshot = () => {
    (window as any).__records = records;
    return records;
};

// For testing purposes
export const resetStore = () => {
    records = [];
    if (unlisten) {
        unlisten();
        unlisten = undefined;
    }
    listeners.v = [];
    history.replace("/");
};
