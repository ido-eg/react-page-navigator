import { Link, Router } from "wouter";
import { Navigator, useHashLocation } from "../src";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import About, { Profile, Contact } from "./pages/About";
import DetailPage from "./pages/DetailPage";

const routes = [
    { path: "/", component: Home },
    { path: "/form", component: FormPage },
    { path: "/detail/:id", component: DetailPage },
    { 
        path: "/about", 
        component: About,
        children: [
            { path: "/profile", component: Profile },
            { path: "/contact", component: Contact }
        ]
    },
];

function App() {
    return (
        <Router hook={useHashLocation}>
            <div className="w-full h-screen bg-gray-100 flex font-sans overflow-hidden">
                {/* 桌面端左侧导航栏 */}
                <aside className="w-64 bg-slate-800 text-white flex flex-col flex-shrink-0 shadow-lg z-10">
                <div className="p-6 bg-slate-900">
                    <h1 className="text-2xl font-bold tracking-wider">Page Navigator</h1>
                    <p className="text-slate-400 text-sm mt-2">PC 演示项目</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/" className="block p-3 rounded hover:bg-slate-700 transition">
                        🏠 首页大盘
                    </Link>
                    <Link to="/form" className="block p-3 rounded hover:bg-slate-700 transition">
                        📝 数据录入
                    </Link>
                    <Link to="/about" className="block p-3 rounded hover:bg-slate-700 transition">
                        ℹ️ 系统设置 (嵌套)
                    </Link>
                </nav>
                <div className="p-4 bg-slate-900 text-slate-400 text-xs text-center">
                    基于 wouter & history
                </div>
            </aside>

            {/* 右侧主内容区（受路由栈管理） */}
            <main className="flex-1 relative bg-white overflow-hidden shadow-inner">
                <Navigator routes={routes} />
            </main>
        </div>
        </Router>
    );
}

export default App;
