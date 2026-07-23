import { createContext } from "react";
import { RouteConfig } from "./types";

const RouteContext = createContext<RouteConfig | null>(null);

export default RouteContext;
