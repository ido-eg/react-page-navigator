import history from "history/hash";
import { createPath } from "history";

export const navigate = (to, { state, replace = false } = {}) => {
    const i = state?.i !== undefined ? state.i : history.location.state.i;
    replace ? history.replace(to, { ...state, i: i }) : history.push(to, { ...state, i: i + 1 });
};

const listeners = { v: [] };
let unlisten;
let records = [];
export function subscribe(callback) {
    // 多次订阅只监听一次history
    if (listeners.v.push(callback) === 1) {
        unlisten = history.listen(({ action, location }) => {
            const newRecords = [...records];
            // 直接在地址栏输入地址不存在state，通过replace设置state.i
            if (!location.state) {
                records = records.concat(location);
                return navigate(createPath(history.location), { replace: true, state: { i: records.length } });
            }
            if (action === "REPLACE") {
                newRecords.pop();
                newRecords.push(location);
            } else if (action === "PUSH") {
                newRecords.push(location);
            } else if (action === "POP") {
                // 前进或后退时 records的数量应该等于state.index
                newRecords.length = location.state.i;
                // records最后一项填入page,前进或后退可能会跨多个record
                newRecords[newRecords.length - 1] = location;
            }
            records = newRecords;
            listeners.v.forEach((cb) => cb());
        });
        let state = { i: 1 };
        if (history.location.state?.i) {
            records.length = history.location.state.i;
            state = history.location.state;
        }
        navigate(createPath(history.location), { replace: true, state });
    }

    return () => {
        listeners.v = listeners.v.filter((i) => i !== callback);
        // 当没有订阅时移除监听
        if (!listeners.v.length && unlisten) {
            unlisten = unlisten();
            records = [];
        }
    };
}
export const getSnapshot = () => records;
