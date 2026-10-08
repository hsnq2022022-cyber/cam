import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, FileText, Users, Settings, Crown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/pos', icon: ShoppingCart, label: 'POS' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/invoices', icon: FileText, label: 'Invoices' },
  { path: '/customers', icon: Users, label: 'Customers' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 relative`}>
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/20">
          B
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-bold text-lg leading-tight">BillPro</h1>
            <p className="text-xs text-slate-400">POS System</p>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-emerald-400' : ''} />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Subscription Badge */}
      {!collapsed && (
        <div className="p-4">
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={16} className="text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">FREE PLAN</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Upgrade for unlimited access</p>
            <button
              onClick={() => navigate('/settings')}
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
