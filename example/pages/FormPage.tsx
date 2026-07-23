import { useState } from "react";
import { useNavigate } from "../../src"; // 使用导出的 useNavigate

export default function FormPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", remark: "" });

    return (
        <div className="flex flex-col h-full bg-white">
            <header className="bg-white border-b px-6 py-4 flex-shrink-0 flex items-center">
                <button onClick={() => history.back()} className="mr-4 text-gray-500 hover:text-gray-700 bg-gray-100 px-3 py-1 rounded transition">
                    ← 返回
                </button>
                <h1 className="text-2xl font-bold text-gray-800">数据录入</h1>
            </header>
            
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <p className="text-gray-600 mb-4 text-sm">
                        填写以下表单，然后点击下方按钮跳转到其他页面。返回时表单内容不会丢失，因为页面并没有被销毁。
                    </p>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                                placeholder="输入姓名"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                                placeholder="输入邮箱"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                            <textarea 
                                value={formData.remark}
                                onChange={e => setFormData({ ...formData, remark: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                                rows={4}
                                placeholder="随便写点什么..."
                            />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => navigate("/about")}
                    className="w-full py-3 bg-green-100 text-green-700 rounded shadow font-semibold active:bg-green-200"
                >
                    去关于页面看看 (跳转)
                </button>
            </main>
        </div>
    );
}
