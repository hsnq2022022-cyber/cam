import { useApp } from '../store';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const salesData = [
  { day: 'Mon', sales: 2400, invoices: 12 },
  { day: 'Tue', sales: 1800, invoices: 9 },
  { day: 'Wed', sales: 3200, invoices: 16 },
  { day: 'Thu', sales: 2800, invoices: 14 },
  { day: 'Fri', sales: 4100, invoices: 21 },
  { day: 'Sat', sales: 3600, invoices: 18 },
  { day: 'Sun', sales: 2100, invoices: 10 },
];

const categoryData = [
  { name: 'Beverages', value: 35, color: '#10b981' },
  { name: 'Food', value: 28, color: '#3b82f6' },
  { name: 'Bakery', value: 18, color: '#f59e0b' },
  { name: 'Grocery', value: 12, color: '#8b5cf6' },
  { name: 'Desserts', value: 7, color: '#ec4899' },
];

const monthlyData = [
  { month: 'Jul', revenue: 45000 },
  { month: 'Aug', revenue: 52000 },
  { month: 'Sep', revenue: 48000 },
  { month: 'Oct', revenue: 61000 },
  { month: 'Nov', revenue: 55000 },
  { month: 'Dec', revenue: 67000 },
];

export default function Dashboard() {
  const { state } = useApp();
  const { settings, products, invoices } = state;

  const todaySales = invoices.filter(inv => {
    const today = new Date().toISOString().split('T')[0];
    return inv.createdAt.startsWith(today) && inv.status === 'paid';
  });

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const totalInvoices = invoices.length;
  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);
  const avgOrderValue = totalInvoices > 0 ? totalRevenue / totalInvoices : 0;

  const stats = [
    { label: 'Total Revenue', value: `${settings.currencySymbol} ${totalRevenue.toLocaleString()}`, change: '+12.5%', positive: true, icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
    { label: 'Total Invoices', value: totalInvoices.toString(), change: '+8.2%', positive: true, icon: ShoppingCart, color: 'from-blue-500 to-indigo-500' },
    { label: 'Avg. Order Value', value: `${settings.currencySymbol} ${avgOrderValue.toFixed(2)}`, change: '+3.1%', positive: true, icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'Low Stock Items', value: lowStockProducts.length.toString(), change: lowStockProducts.length > 0 ? 'Action needed' : 'All good', positive: lowStockProducts.length === 0, icon: AlertTriangle, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
          <Package size={16} className="text-slate-400" />
          <span className="text-sm text-slate-600">{products.length} Products</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={18} className="text-white" />
              </div>
              <span className={`text-xs font-medium flex items-center gap-1 ${stat.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
                {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800">Weekly Sales</h3>
              <p className="text-sm text-slate-500">Revenue this week</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg">This Week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} fill="url(#salesGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-1">Sales by Category</h3>
          <p className="text-sm text-slate-500 mb-4">Product distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-slate-600">{cat.name}</span>
                </div>
                <span className="text-xs font-medium text-slate-800">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800">Monthly Revenue</h3>
              <p className="text-sm text-slate-500">Last 6 months trend</p>
            </div>
            <ArrowUpRight size={16} className="text-emerald-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Recent Invoices</h3>
            <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            {invoices.slice(0, 5).map(inv => (
              <div key={inv.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600' :
                    inv.status === 'partial' ? 'bg-amber-50 text-amber-600' :
                    inv.status === 'due' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'
                  }`}>
                    <ShoppingCart size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{inv.invoiceNumber}</p>
                    <p className="text-xs text-slate-500">{inv.customer?.name || 'Walk-in Customer'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">{settings.currencySymbol} {inv.total.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700' :
                    inv.status === 'partial' ? 'bg-amber-50 text-amber-700' :
                    inv.status === 'due' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={20} className="text-amber-600" />
            <h3 className="font-semibold text-amber-800">Low Stock Alert</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {lowStockProducts.slice(0, 6).map(product => (
              <div key={product.id} className="bg-white/80 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{product.name}</p>
                  <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                </div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                  {product.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
