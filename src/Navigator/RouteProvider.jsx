import { useMemo } from "react";
import RouteContext from "./RouteContext";

export default function RouteProvider({ inactive, route, children }) {
    const style = useMemo(() => ({ width: "100%", height: "100%", ...(inactive ? { display: "none" } : undefined) }), [inactive]);
    return (
        <RouteContext.Provider value={route}>
            <div style={style}>{children}</div>
        </RouteContext.Provider>
    );
}
