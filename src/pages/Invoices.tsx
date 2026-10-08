import { useState } from 'react';
import { useApp } from '../store';
import { Search, Filter, Eye, X, Printer, Share2, Ban, FileText } from 'lucide-react';

export default function Invoices() {
  const { state, dispatch } = useApp();
  const { invoices, settings } = state;
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer?.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const selected = invoices.find(i => i.id === selectedInvoice);

  const statusCounts = {
    all: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    partial: invoices.filter(i => i.status === 'partial').length,
    due: invoices.filter(i => i.status === 'due').length,
    cancelled: invoices.filter(i => i.status === 'cancelled').length,
  };

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this invoice?')) {
      dispatch({ type: 'CANCEL_INVOICE', payload: id });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'partial': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'due': return 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Invoices</h1>
          <p className="text-slate-500 text-sm">{invoices.length} total invoices</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              statusFilter === status
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="capitalize">{status}</span>
            <span className={`px-1.5 py-0.5 rounded-md text-xs ${
              statusFilter === status ? 'bg-white/20' : 'bg-slate-100'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search invoices..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        {filteredInvoices.map(invoice => (
          <div
            key={invoice.id}
            className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedInvoice(invoice.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  invoice.status === 'paid' ? 'bg-emerald-50 text-emerald-600' :
                  invoice.status === 'partial' ? 'bg-amber-50 text-amber-600' :
                  invoice.status === 'due' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{invoice.invoiceNumber}</p>
                  <p className="text-sm text-slate-500">
                    {invoice.customer?.name || 'Walk-in Customer'} • {new Date(invoice.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-800">{settings.currencySymbol} {invoice.total.toFixed(2)}</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedInvoice(invoice.id); }}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  {invoice.status !== 'cancelled' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCancel(invoice.id); }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Ban size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Items preview */}
            <div className="mt-3 pt-3 border-t border-slate-50">
              <p className="text-xs text-slate-500">
                {invoice.items.map(i => `${i.product.name} x${i.quantity}`).join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{selected.invoiceNumber}</h3>
                <p className="text-sm text-slate-500">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Customer Info */}
            {selected.customer && (
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-slate-500 mb-1">Customer</p>
                <p className="font-medium text-slate-800">{selected.customer.name}</p>
                <p className="text-sm text-slate-500">{selected.customer.phone}</p>
              </div>
            )}

            {/* Items */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Items</p>
              <div className="space-y-2">
                {selected.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{item.product.name}</p>
                      <p className="text-xs text-slate-500">{item.quantity} x {settings.currencySymbol} {item.product.sellingPrice.toFixed(2)}</p>
                    </div>
                    <p className="text-sm font-medium text-slate-800">
                      {settings.currencySymbol} {(item.product.sellingPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-700">{settings.currencySymbol} {selected.subtotal.toFixed(2)}</span>
              </div>
              {selected.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Discount</span>
                  <span className="text-red-500">-{settings.currencySymbol} {selected.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tax ({settings.taxRate}%)</span>
                <span className="text-slate-700">{settings.currencySymbol} {selected.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200">
                <span className="text-slate-800">Total</span>
                <span className="text-emerald-600">{settings.currencySymbol} {selected.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm pt-1">
                <span className="text-slate-500">Paid</span>
                <span className="text-slate-700">{settings.currencySymbol} {selected.paidAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                <Printer size={16} />
                Print
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
