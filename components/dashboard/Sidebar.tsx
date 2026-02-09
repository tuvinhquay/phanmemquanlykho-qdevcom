'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    console.log('Logout clicked');
    // Firebase logout logic here
  };

  return (
    <div className={`flex flex-col bg-slate-900 text-white h-screen transition-all ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center justify-between border-b border-slate-700">
        {isOpen && <h1 className="text-2xl font-bold">Q-Devcom</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl hover:bg-slate-800 p-2 rounded"
        >
          ☰
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className="block p-3 rounded hover:bg-slate-700 transition"
        >
          {isOpen ? '📊 Dashboard' : '📊'}
        </Link>
        <Link
          href="/inventory"
          className="block p-3 rounded hover:bg-slate-700 transition"
        >
          {isOpen ? '📦 Quản lý Kho' : '📦'}
        </Link>
        <Link
          href="/chat"
          className="block p-3 rounded hover:bg-slate-700 transition"
        >
          {isOpen ? '💬 Chat AI' : '💬'}
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 p-3 rounded bg-red-600 hover:bg-red-700 transition w-full"
      >
        {isOpen ? '🚪 Đăng xuất' : '🚪'}
      </button>
    </div>
  );
}
