import { navigate } from "./store";

// navigate方法和useLocation的navigate方法区别：useLocation会关注router中的base
export function useNavigate() {
    return navigate;
}
