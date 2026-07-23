import { Link } from "wouter";
import { Outlet } from "../../src";

export default function About() {
    return (
        <div className="flex flex-col h-full bg-white">
            <header className="bg-white border-b px-6 py-4 flex-shrink-0 flex items-center">
                <button onClick={() => history.back()} className="mr-4 text-gray-500 hover:text-gray-700 bg-gray-100 px-3 py-1 rounded transition">
                    ← 返回
                </button>
                <h1 className="text-2xl font-bold text-gray-800">系统设置</h1>
            </header>
            
            <div className="flex border-b bg-gray-50 px-4">
                <Link to="/about/profile" className="px-6 py-3 text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition font-medium">
                    系统简介
                </Link>
                <Link to="/about/contact" className="px-6 py-3 text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition font-medium">
                    联系方式
                </Link>
            </div>
            
            <main className="flex-1 overflow-y-auto bg-white relative p-6">
                <Outlet />
            </main>
        </div>
    );
}

export function Profile() {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">系统简介</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
                这是嵌套在 About 页面内部的 Profile 组件。
            </p>
            <p className="text-gray-600 leading-relaxed">
                利用 `Outlet`，我们可以在父路由页面中展示子路由内容，并且它们在整个页面栈中也是受到管理和状态保留的。
            </p>
        </div>
    );
}

export function Contact() {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">联系我们</h2>
            <div className="bg-gray-50 p-6 rounded-lg border">
                <p className="text-gray-600 mb-2">📞 电话: 400-123-4567</p>
                <p className="text-gray-600 mb-2">📧 邮箱: contact@example.com</p>
                <p className="text-gray-600">🏢 地址: 某某市某某区某某街道123号</p>
            </div>
        </div>
    );
}
