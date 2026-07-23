import { Link } from "wouter";
import { useState } from "react";

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="bg-white border-b px-6 py-4 flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-800">首页大盘</h1>
            </header>
            
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h2 className="text-lg font-semibold mb-2">状态保留测试</h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        增加下方的计数器，然后跳转到其他页面再返回，你会发现计数器的状态依然保留！
                    </p>
                    <div className="flex items-center space-x-4">
                        <button 
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded shadow-sm active:bg-blue-200"
                            onClick={() => setCount(c => c + 1)}
                        >
                            点击次数: {count}
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4">导航</h2>
                    <div className="flex flex-col space-y-3">
                        <Link to="/form" className="p-3 border rounded text-blue-600 active:bg-gray-50">
                            📝 去填写表单 (Form)
                        </Link>
                        <Link to="/about" className="p-3 border rounded text-blue-600 active:bg-gray-50">
                            ℹ️ 关于我们 (About - 嵌套路由)
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">滚动位置保留测试</h2>
                    <p className="text-gray-600 mb-4 text-sm">向下滚动，然后点击任意列表项，再返回观察滚动条位置。</p>
                    <ul className="space-y-2">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <li key={i} className="p-3 border-b text-gray-700">
                                <Link to={`/detail/${i + 1}`}>列表项目 {i + 1}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
