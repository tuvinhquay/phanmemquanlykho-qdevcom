'use client';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white shadow px-8 py-4">
      <div className="flex items-center gap-4">
        <img
          src="/assets/images/logo.png"
          alt="Logo"
          className="h-10 w-auto"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '';
            (e.target as HTMLImageElement).className = 'hidden';
          }}
        />
        <h2 className="text-xl font-bold text-slate-800">Q-Devcom Inventory</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold">
            U
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">User</p>
            <p className="text-xs text-slate-500">user@example.com</p>
          </div>
        </div>
        <button className="text-sm px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 transition">
          ⊙
        </button>
      </div>
    </header>
  );
}
