import { useParams } from "wouter";

export default function DetailPage() {
    const params = useParams();

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="bg-white border-b px-6 py-4 flex-shrink-0 flex items-center">
                <button onClick={() => history.back()} className="mr-4 text-gray-500 hover:text-gray-700 bg-gray-100 px-3 py-1 rounded transition">
                    ← 返回
                </button>
                <h1 className="text-2xl font-bold text-gray-800">详情页</h1>
            </header>
            
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl text-orange-500">📄</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    项目 {params ? params.id : "未知"}
                </h2>
                <p className="text-gray-500 text-center">
                    这里是详情页面内容。<br/>
                    点击左上角返回，你会发现首页的滚动条位置纹丝不动。
                </p>
            </main>
        </div>
    );
}
