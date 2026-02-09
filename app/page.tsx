'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        poster="/assets/videos/luxury-bg.png"
      >
        <source src="/assets/videos/luxury-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Logo */}
        <img
          src="/assets/images/logo-vuot.png"
          alt="Q-Devcom Logo"
          className="w-64 h-auto mb-8 drop-shadow-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '';
            (e.target as HTMLImageElement).className = 'hidden';
          }}
        />

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Chào mừng đến với Q-Devcom
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl mb-10 drop-shadow-lg">
          Quản lý kho hàng thông minh với AI
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition shadow-lg"
          >
            Vào Dashboard
          </Link>
          <Link
            href="/inventory"
            className="px-8 py-3 bg-slate-600 hover:bg-slate-700 rounded-lg font-bold transition shadow-lg"
          >
            Quản lý Kho
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl">
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-2xl mb-2">📊</p>
            <h3 className="font-bold mb-2">Dashboard</h3>
            <p className="text-sm">Quản lý thông tin kho hàng tập trung</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-2xl mb-2">📦</p>
            <h3 className="font-bold mb-2">Kho Hàng</h3>
            <p className="text-sm">Theo dõi sản phẩm và tồn kho chi tiết</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-2xl mb-2">🤖</p>
            <h3 className="font-bold mb-2">Chat AI</h3>
            <p className="text-sm">Hỗ trợ bằng Gemini AI thông minh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
