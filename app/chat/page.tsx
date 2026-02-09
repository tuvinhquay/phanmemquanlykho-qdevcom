'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ChatBox from '@/components/chat/ChatBox';

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Chat Hỗ Trợ AI</h1>
            <p className="text-slate-600">
              Giao tiếp với Gemini AI để được hỗ trợ quản lý kho hàng
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-96">
            <p className="text-center text-slate-600 mt-40">
              Mở chat box ở góc dưới bên phải để bắt đầu cuộc trò chuyện
            </p>
          </div>
        </div>
      </div>
      <ChatBox />
    </div>
  );
}
