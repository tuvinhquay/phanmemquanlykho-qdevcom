'use client';

import { useState } from 'react';

export default function AddItemForm() {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
    entryDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Firebase addDoc logic here
    setFormData({ name: '', quantity: '', category: '', entryDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-md">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Thêm Sản Phẩm</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Tên Sản Phẩm
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập tên sản phẩm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Số Lượng
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Danh Mục
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Chọn danh mục --</option>
          <option value="Điện Tử">Điện Tử</option>
          <option value="Quần Áo">Quần Áo</option>
          <option value="Thực Phẩm">Thực Phẩm</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Ngày Nhập
        </label>
        <input
          type="date"
          name="entryDate"
          value={formData.entryDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
      >
        Thêm Sản Phẩm
      </button>
    </form>
  );
}
