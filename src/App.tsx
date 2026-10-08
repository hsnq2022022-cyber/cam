import { useState } from 'react';
import { ShoppingCart, Package, FileText, Users, Settings, LayoutDashboard, Plus, Minus, Trash2, Search, X, Edit2, Eye, Printer, Share2, Crown, Check, Building2, Shield, Receipt, Zap, Phone, Mail, MapPin, User, CreditCard, Banknote, Clock, AlertTriangle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

// Types
interface Product {
  id: string;
  name: string;
  nameAr?: string;
  category: string;
  sku: string;
  barcode: string;
  costPrice: number;
  sellingPrice: number;
  taxRate: number;
  stock: number;
  lowStockThreshold: number;
  isActive: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Customer {
  id: string;
  name: string;
  nameAr?: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;
  outstandingBalance: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer?: Customer;
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  status: 'paid' | 'partial' | 'due' | 'cancelled';
  createdAt: string;
}

// Mock Data
const initialProducts: Product[] = [
  { id: '1', name: 'Arabic Coffee', nameAr: 'قهوة عربية', category: 'Beverages', sku: 'BEV001', barcode: '6281001000012', costPrice: 5, sellingPrice: 12, taxRate: 15, stock: 150, lowStockThreshold: 20, isActive: true },
  { id: '2', name: 'Green Tea', nameAr: 'شاي أخضر', category: 'Beverages', sku: 'BEV002', barcode: '6281001000029', costPrice: 3, sellingPrice: 8, taxRate: 15, stock: 200, lowStockThreshold: 30, isActive: true },
  { id: '3', name: 'Fresh Orange Juice', nameAr: 'عصير برتقال', category: 'Beverages', sku: 'BEV003', barcode: '6281001000036', costPrice: 8, sellingPrice: 18, taxRate: 15, stock: 45, lowStockThreshold: 10, isActive: true },
  { id: '4', name: 'Croissant', nameAr: 'كرواسون', category: 'Bakery', sku: 'BAK001', barcode: '6281002000015', costPrice: 4, sellingPrice: 10, taxRate: 15, stock: 30, lowStockThreshold: 10, isActive: true },
  { id: '5', name: 'Arabic Bread', nameAr: 'خبز عربي', category: 'Bakery', sku: 'BAK002', barcode: '6281002000022', costPrice: 1, sellingPrice: 3, taxRate: 15, stock: 80, lowStockThreshold: 20, isActive: true },
  { id: '6', name: 'Chicken Shawarma', nameAr: 'شاورما دجاج', category: 'Food', sku: 'FOD001', barcode: '6281003000018', costPrice: 10, sellingPrice: 25, taxRate: 15, stock: 40, lowStockThreshold: 10, isActive: true },
  { id: '7', name: 'Falafel Wrap', nameAr: 'لفافة فلافل', category: 'Food', sku: 'FOD002', barcode: '6281003000025', costPrice: 5, sellingPrice: 14, taxRate: 15, stock: 35, lowStockThreshold: 10, isActive: true },
  { id: '8', name: 'Hummus', nameAr: 'حمص', category: 'Food', sku: 'FOD003', barcode: '6281003000032', costPrice: 4, sellingPrice: 12, taxRate: 15, stock: 50, lowStockThreshold: 15, isActive: true },
  { id: '9', name: 'Dates Premium', nameAr: 'تمر فاخر', category: 'Grocery', sku: 'GRC001', barcode: '6281004000011', costPrice: 15, sellingPrice: 35, taxRate: 15, stock: 60, lowStockThreshold: 10, isActive: true },
  { id: '10', name: 'Olive Oil 1L', nameAr: 'زيت زيتون', category: 'Grocery', sku: 'GRC002', barcode: '6281004000028', costPrice: 20, sellingPrice: 45, taxRate: 15, stock: 8, lowStockThreshold: 10, isActive: true },
];

const initialCustomers: Customer[] = [
  { id: '1', name: 'Ahmed Al-Rashid', nameAr: 'أحمد الراشد', phone: '+966501234567', email: 'ahmed@email.com', address: 'Riyadh, Saudi Arabia', totalPurchases: 15200, outstandingBalance: 0 },
  { id: '2', name: 'Fatima Hassan', nameAr: 'فاطمة حسن', phone: '+966502345678', email: 'fatima@email.com', address: 'Jeddah, Saudi Arabia', totalPurchases: 8750, outstandingBalance: 350 },
  { id: '3', name: 'Mohammed Ali', nameAr: 'محمد علي', phone: '+966503456789', email: 'mohammed@email.com', address: 'Dammam, Saudi Arabia', totalPurchases: 22100, outstandingBalance: 0 },
];

const initialInvoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', customer: initialCustomers[0], items: [{ product: initialProducts[0], quantity: 3 }], subtotal: 36, taxAmount: 5.4, total: 41.4, status: 'paid', createdAt: '2024-12-01' },
  { id: '2', invoiceNumber: 'INV-2024-002', customer: initialCustomers[1], items: [{ product: initialProducts[5], quantity: 2 }], subtotal: 50, taxAmount: 7.5, total: 57.5, status: 'partial', createdAt: '2024-12-02' },
  { id: '3', invoiceNumber: 'INV-2024-003', items: [{ product: initialProducts[8], quantity: 1 }], subtotal: 35, taxAmount: 5.25, total: 40.25, status: 'paid', createdAt: '2024-12-03' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'pos' | 'products' | 'invoices' | 'customers' | 'settings'>('dashboard');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Beverages', 'Bakery', 'Food', 'Grocery'];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);
  const cartTax = cartSubtotal * 0.15;
  const cartTotal = cartSubtotal + cartTax;

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.nameAr?.includes(searchTerm) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCategory && p.isActive;
  });

  const handleCheckout = () => {
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      items: [...cart],
      subtotal: cartSubtotal,
      taxAmount: cartTax,
      total: cartTotal,
      status: 'paid',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setInvoices([newInvoice, ...invoices]);
    clearCart();
    alert('Payment successful! Invoice created.');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center font-bold text-lg">
              B
            </div>
            <div>
              <h1 className="font-bold text-lg">BillPro</h1>
              <p className="text-xs text-slate-400">POS System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'pos', icon: ShoppingCart, label: 'POS' },
            { id: 'products', icon: Package, label: 'Products' },
            { id: 'invoices', icon: FileText, label: 'Invoices' },
            { id: 'customers', icon: Users, label: 'Customers' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentPage === item.id
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={16} className="text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">FREE PLAN</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Upgrade for unlimited access</p>
            <button
              onClick={() => setCurrentPage('settings')}
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-lg hover:opacity-90"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {currentPage === 'dashboard' && <DashboardPage invoices={invoices} products={products} customers={customers} />}
        {currentPage === 'pos' && (
          <POSPage
            products={filteredProducts}
            cart={cart}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            cartSubtotal={cartSubtotal}
            cartTax={cartTax}
            cartTotal={cartTotal}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            onCheckout={handleCheckout}
          />
        )}
        {currentPage === 'products' && <ProductsPage products={products} setProducts={setProducts} />}
        {currentPage === 'invoices' && <InvoicesPage invoices={invoices} />}
        {currentPage === 'customers' && <CustomersPage customers={customers} setCustomers={setCustomers} />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

// Dashboard Page
function DashboardPage({ invoices, products, customers }: { invoices: Invoice[], products: Product[], customers: Customer[] }) {
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);

  return (
    <div className="p-6 space-y-6 overflow-auto">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `SAR ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
          { label: 'Total Invoices', value: invoices.length.toString(), icon: FileText, color: 'from-blue-500 to-indigo-500' },
          { label: 'Products', value: products.length.toString(), icon: Package, color: 'from-purple-500 to-pink-500' },
          { label: 'Customers', value: customers.length.toString(), icon: Users, color: 'from-amber-500 to-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

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

// POS Page
function POSPage({ products, cart, addToCart, updateQuantity, removeFromCart, cartSubtotal, cartTax, cartTotal, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, onCheckout }: any) {
  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 bg-white border-b border-slate-100 space-y-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, scan barcode..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {products.map((product: Product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white rounded-xl p-3 border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all text-left"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg mb-2 flex items-center justify-center">
                  <Package size={24} className="text-slate-400" />
                </div>
                <p className="text-xs font-medium text-slate-800 truncate">{product.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">SAR {product.sellingPrice}</p>
                {product.stock <= product.lowStockThreshold && (
                  <span className="text-[10px] text-red-500 font-medium mt-1">Low: {product.stock}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-96 bg-white border-l border-slate-100 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Current Order</h2>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <ShoppingCart size={48} className="mb-3 opacity-50" />
              <p className="text-sm">Cart is empty</p>
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.product.id} className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{item.product.name}</p>
                    <p className="text-xs text-slate-500">SAR {item.product.sellingPrice} each</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-red-400 hover:text-red-600 p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, -1)} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, 1)} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    SAR {(item.product.sellingPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-slate-100 p-4 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-700">SAR {cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tax (15%)</span>
                <span className="text-slate-700">SAR {cartTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-100">
                <span className="text-slate-800">Total</span>
                <span className="text-emerald-600">SAR {cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
            >
              Charge SAR {cartTotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Products Page
function ProductsPage({ products, setProducts }: { products: Product[], setProducts: (fn: (prev: Product[]) => Product[]) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Products</h1>
        <button
          onClick={() => { setEditingProduct(null); setShowForm(true); }}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-medium hover:opacity-90 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Product</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">SKU</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Price</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Stock</th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-800">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.category}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-mono">{product.sku}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800 text-right">SAR {product.sellingPrice}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-sm font-medium ${product.stock <= product.lowStockThreshold ? 'text-red-600' : 'text-slate-700'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => { setEditingProduct(product); setShowForm(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Invoices Page
function InvoicesPage({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="p-6 space-y-6 overflow-auto">
      <h1 className="text-2xl font-bold text-slate-800">Invoices</h1>
      <div className="space-y-3">
        {invoices.map(invoice => (
          <div key={invoice.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  invoice.status === 'paid' ? 'bg-emerald-50 text-emerald-600' :
                  invoice.status === 'partial' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                }`}>
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{invoice.invoiceNumber}</p>
                  <p className="text-sm text-slate-500">{invoice.customer?.name || 'Walk-in'} • {invoice.createdAt}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-800">SAR {invoice.total.toFixed(2)}</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  invoice.status === 'paid' ? 'bg-emerald-50 text-emerald-700' :
                  invoice.status === 'partial' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Customers Page
function CustomersPage({ customers, setCustomers }: { customers: Customer[], setCustomers: (fn: (prev: Customer[]) => Customer[]) => void }) {
  return (
    <div className="p-6 space-y-6 overflow-auto">
      <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(customer => (
          <div key={customer.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">{customer.name}</p>
                <p className="text-xs text-slate-500">{customer.phone}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between">
              <div>
                <p className="text-xs text-slate-500">Total Purchases</p>
                <p className="text-sm font-semibold text-slate-800">SAR {customer.totalPurchases.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Balance</p>
                <p className={`text-sm font-semibold ${customer.outstandingBalance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  SAR {customer.outstandingBalance}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Page
function SettingsPage() {
  return (
    <div className="p-6 space-y-6 overflow-auto">
      <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
      
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Current Plan</p>
            <p className="text-2xl font-bold mt-1">Free</p>
            <p className="text-sm text-slate-400 mt-1">50 invoices/month limit</p>
          </div>
          <Crown size={28} className="text-amber-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'Free', price: 0, features: ['50 invoices/month', '100 products', 'Basic POS'] },
          { name: 'Pro', price: 29.99, features: ['Unlimited invoices', 'Unlimited products', 'Cloud sync', 'Advanced reports'], popular: true },
          { name: 'Enterprise', price: 79.99, features: ['Everything in Pro', 'Multi-store', 'API access', 'Priority support'] },
        ].map((plan, i) => (
          <div key={i} className={`rounded-2xl border-2 p-6 ${plan.popular ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}>
            {plan.popular && (
              <div className="flex items-center gap-1 mb-3">
                <Zap size={14} className="text-amber-500" />
                <span className="text-xs font-bold text-amber-600">Most Popular</span>
              </div>
            )}
            <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold">${plan.price}</span>
              {plan.price > 0 && <span className="text-sm text-slate-500">/month</span>}
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={14} className="text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-semibold text-sm ${
              plan.popular ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {plan.price === 0 ? 'Current' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
