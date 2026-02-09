'use client';

import { InventoryItem } from '@/types/index';
import { useState } from 'react';

interface InventoryTableProps {
  items?: InventoryItem[];
}

export default function InventoryTable({ items = [] }: InventoryTableProps) {
  const [data] = useState<InventoryItem[]>(items);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-slate-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Tên Sản Phẩm</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Số Lượng</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Ngày Nhập</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Danh Mục</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-sm text-slate-700">{item.id}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{item.name}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{item.quantity}</td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  {item.entryDate?.toDate?.().toLocaleDateString?.('vi-VN') || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{item.category}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
