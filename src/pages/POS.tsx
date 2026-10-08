import { useState } from 'react';
import { useApp, calculateCartTotals } from '../store';
import { Search, ScanBarcode, Plus, Minus, Trash2, User, CreditCard, Banknote, Split, Clock, Check, X, Printer, Share2, ShoppingCart } from 'lucide-react';
import { categories } from '../data/mockData';
import { Invoice } from '../types';

export default function POS() {
  const { state, dispatch } = useApp();
  const { products, cart, customers, selectedCustomer, settings } = state;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'split' | 'credit'>('cash');
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastInvoice, setLastInvoice] = useState<Invoice | null>(null);

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCategory && p.isActive;
  });

  const { subtotal, totalDiscount, taxAmount, total } = calculateCartTotals(cart, settings);

  const handleCheckout = () => {
    const invoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber: `INV-2024-${String(state.invoices.length + 1).padStart(3, '0')}`,
      customer: selectedCustomer || undefined,
      items: [...cart],
      subtotal,
      taxAmount,
      discount: totalDiscount,
      discountType: 'fixed',
      total,
      paidAmount: paymentMethod === 'credit' ? 0 : total,
      paymentMethod,
      status: paymentMethod === 'credit' ? 'due' : 'paid',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'CREATE_INVOICE', payload: invoice });
    setLastInvoice(invoice);
    setShowPayment(false);
    setShowSuccess(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  const paymentMethods = [
    { id: 'cash' as const, label: 'Cash', icon: Banknote, color: 'from-emerald-500 to-green-500' },
    { id: 'card' as const, label: 'Card', icon: CreditCard, color: 'from-blue-500 to-indigo-500' },
    { id: 'split' as const, label: 'Split', icon: Split, color: 'from-purple-500 to-pink-500' },
    { id: 'credit' as const, label: 'Credit', icon: Clock, color: 'from-amber-500 to-orange-500' },
  ];

  if (showSuccess && lastInvoice) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
            <Check size={36} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Payment Successful!</h2>
          <p className="text-slate-500 mb-6">Invoice {lastInvoice.invoiceNumber} has been created</p>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Total Amount</span>
              <span className="font-semibold text-slate-800">{settings.currencySymbol} {lastInvoice.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Payment Method</span>
              <span className="font-medium text-slate-700 capitalize">{lastInvoice.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Status</span>
              <span className="font-medium text-emerald-600 capitalize">{lastInvoice.status}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
              <Printer size={16} />
              Print
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
              <Share2 size={16} />
              Share
            </button>
          </div>
          <button
            onClick={() => { setShowSuccess(false); setLastInvoice(null); }}
            className="mt-4 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            New Sale
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Products Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search & Category Bar */}
        <div className="p-4 bg-white border-b border-slate-100 space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, scan barcode..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <button className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
              <ScanBarcode size={18} />
              <span className="text-sm font-medium hidden lg:inline">Scan</span>
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                className="bg-white rounded-xl p-3 border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all text-left group"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg mb-2 flex items-center justify-center group-hover:from-emerald-50 group-hover:to-teal-50 transition-colors">
                  <span className="text-2xl">
                    {product.category === 'Beverages' ? '☕' : product.category === 'Bakery' ? '🥐' : product.category === 'Food' ? '🍽️' : product.category === 'Grocery' ? '🛒' : product.category === 'Dairy' ? '🥛' : '🍰'}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-800 truncate">{product.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{settings.currencySymbol} {product.sellingPrice.toFixed(2)}</p>
                {product.stock <= product.lowStockThreshold && (
                  <span className="text-[10px] text-red-500 font-medium mt-1">Low stock: {product.stock}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-white border-l border-slate-100 flex flex-col">
        {/* Cart Header */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Current Order</h2>
            {cart.length > 0 && (
              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
          {/* Customer Selection */}
          <button
            onClick={() => {/* Show customer picker */}}
            className="mt-3 w-full flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <User size={14} />
            <span>{selectedCustomer?.name || 'Walk-in Customer'}</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <ShoppingCart size={48} className="mb-3 opacity-50" />
              <p className="text-sm">Cart is empty</p>
              <p className="text-xs">Add products to start</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{item.product.name}</p>
                    <p className="text-xs text-slate-500">{settings.currencySymbol} {item.product.sellingPrice.toFixed(2)} each</p>
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: item.product.id, quantity: item.quantity - 1 } })}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: item.product.id, quantity: item.quantity + 1 } })}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {settings.currencySymbol} {(item.product.sellingPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="border-t border-slate-100 p-4 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-700">{settings.currencySymbol} {subtotal.toFixed(2)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Discount</span>
                  <span className="text-red-500">-{settings.currencySymbol} {totalDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tax ({settings.taxRate}%)</span>
                <span className="text-slate-700">{settings.currencySymbol} {taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-100">
                <span className="text-slate-800">Total</span>
                <span className="text-emerald-600">{settings.currencySymbol} {total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setShowPayment(true)}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
            >
              Charge {settings.currencySymbol} {total.toFixed(2)}
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Payment</h3>
              <button onClick={() => setShowPayment(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-slate-500">Total Amount</p>
              <p className="text-3xl font-bold text-slate-800">{settings.currencySymbol} {total.toFixed(2)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-2`}>
                    <method.icon size={18} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{method.label}</p>
                </button>
              ))}
            </div>

            {selectedCustomer && (
              <div className="bg-slate-50 rounded-xl p-3 mb-4 flex items-center gap-3">
                <User size={16} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">{selectedCustomer.name}</p>
                  <p className="text-xs text-slate-500">{selectedCustomer.phone}</p>
                </div>
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Check size={18} />
              Complete Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


