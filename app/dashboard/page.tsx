'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import InventoryTable from '@/components/inventory/InventoryTable';

export default function DashboardPage() {
  const totalItems = 0;
  const lowStockItems = 0;
  const categories = 0;

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-600">Chào mừng đến với Q-Devcom</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Tổng Sản Phẩm</h3>
              <p className="text-3xl font-bold text-blue-600">{totalItems}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Hàng Sắp Hết</h3>
              <p className="text-3xl font-bold text-yellow-600">{lowStockItems}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Danh Mục</h3>
              <p className="text-3xl font-bold text-green-600">{categories}</p>
            </div>
          </div>

          {/* Recent Inventory */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Sản Phẩm Gần Đây</h2>
            <InventoryTable items={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
