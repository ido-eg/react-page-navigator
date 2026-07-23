# react-page-navigator

通过 css 的 `display` 控制路由页面是否显示（保活栈），基于 `history`、`wouter`。

## 用法

```tsx
import { Router, Navigator, useHashLocation, useNavigate, useParams } from "react-page-navigator";

const routes = [
  { path: "/", component: Home },
  { path: "/detail/:id", component: DetailPage },
];

<Router hook={useHashLocation}>
  <Navigator routes={routes} />
</Router>
```

- 返回：`history.back()`（`useNavigate` 仅支持字符串 path）
- 动态参数：`useParams()`（与 example 一致，一 path 一组件更稳妥）
- 嵌套：父路由 `children` + 页面内 `<Outlet />`

## 实现要点

- 栈按路由 path **模板**合并；React `key` 使用 `path@location`，具体 URL 变化会重新挂载
- 匹配时按 path 长度降序，更具体的路由优先
- `Record` 与 `store` 共用同一 `history` 实例

