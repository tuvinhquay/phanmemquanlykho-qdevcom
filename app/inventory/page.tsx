'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import InventoryTable from '@/components/inventory/InventoryTable';
import AddItemForm from '@/components/inventory/AddItemForm';

export default function InventoryPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Quản lý Kho Hàng</h1>
            <p className="text-slate-600">Quản lý toàn bộ sản phẩm trong kho</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <AddItemForm />
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Danh Sách Sản Phẩm</h2>
              <InventoryTable items={[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
