import { useState } from 'react';
import { useApp } from '../store';
import { subscriptionPlans } from '../data/mockData';
import { Save, Check, Crown, Zap, Building2, Globe, Receipt, Shield } from 'lucide-react';

export default function Settings() {
  const { state, dispatch } = useApp();
  const { settings, currentSubscription } = state;
  const [activeTab, setActiveTab] = useState<'business' | 'tax' | 'receipt' | 'subscription'>('business');
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: localSettings });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'business' as const, label: 'Business', icon: Building2 },
    { id: 'tax' as const, label: 'Tax & VAT', icon: Shield },
    { id: 'receipt' as const, label: 'Receipt', icon: Receipt },
    { id: 'subscription' as const, label: 'Subscription', icon: Crown },
  ];

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 text-sm">Manage your business and app settings</p>
        </div>
        {activeTab !== 'subscription' && (
          <button
            onClick={handleSave}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 shadow-sm'
            }`}
          >
            {saved ? <Check size={16} /> : <Save size={16} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Business Settings */}
      {activeTab === 'business' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-slate-800">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Name (English)</label>
              <input
                type="text"
                value={localSettings.name}
                onChange={e => setLocalSettings({ ...localSettings, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Name (Arabic)</label>
              <input
                type="text"
                value={localSettings.nameAr || ''}
                onChange={e => setLocalSettings({ ...localSettings, nameAr: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tax/VAT Registration Number</label>
              <input
                type="text"
                value={localSettings.taxNumber}
                onChange={e => setLocalSettings({ ...localSettings, taxNumber: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input
                type="tel"
                value={localSettings.phone}
                onChange={e => setLocalSettings({ ...localSettings, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address (English)</label>
              <input
                type="text"
                value={localSettings.address}
                onChange={e => setLocalSettings({ ...localSettings, address: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address (Arabic)</label>
              <input
                type="text"
                value={localSettings.addressAr || ''}
                onChange={e => setLocalSettings({ ...localSettings, addressAr: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
              <select
                value={localSettings.currency}
                onChange={e => {
                  const currencies: Record<string, string> = { SAR: 'ر.س', EGP: 'ج.م', USD: '$', EUR: '€', GBP: '£', AED: 'د.إ' };
                  setLocalSettings({ ...localSettings, currency: e.target.value, currencySymbol: currencies[e.target.value] || e.target.value });
                }}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="SAR">SAR - Saudi Riyal</option>
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Default Language</label>
              <select
                value={localSettings.language}
                onChange={e => setLocalSettings({ ...localSettings, language: e.target.value as 'en' | 'ar' })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="en">English</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tax Settings */}
      {activeTab === 'tax' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-slate-800">Tax & VAT Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Default Tax Rate (%)</label>
              <input
                type="number"
                value={localSettings.taxRate}
                onChange={e => setLocalSettings({ ...localSettings, taxRate: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">Standard VAT rate (e.g., 15% for Saudi Arabia)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tax Calculation Type</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    checked={localSettings.taxType === 'exclusive'}
                    onChange={() => setLocalSettings({ ...localSettings, taxType: 'exclusive' })}
                    className="w-4 h-4 text-emerald-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Exclusive Tax</p>
                    <p className="text-xs text-slate-500">Tax added on top of price</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    checked={localSettings.taxType === 'inclusive'}
                    onChange={() => setLocalSettings({ ...localSettings, taxType: 'inclusive' })}
                    className="w-4 h-4 text-emerald-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Inclusive Tax</p>
                    <p className="text-xs text-slate-500">Tax included in the price</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800 font-medium">💡 ZATCA E-Invoicing Support</p>
            <p className="text-xs text-blue-600 mt-1">
              Your tax registration number will be included in all receipts for ZATCA compliance. QR codes are automatically generated for electronic invoicing.
            </p>
          </div>
        </div>
      )}

      {/* Receipt Settings */}
      {activeTab === 'receipt' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-slate-800">Receipt Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Receipt Header Message</label>
              <input
                type="text"
                value={localSettings.receiptHeader || ''}
                onChange={e => setLocalSettings({ ...localSettings, receiptHeader: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Thank you for your purchase!"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Receipt Footer Message</label>
              <input
                type="text"
                value={localSettings.receiptFooter || ''}
                onChange={e => setLocalSettings({ ...localSettings, receiptFooter: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Visit us again!"
              />
            </div>
          </div>

          {/* Receipt Preview */}
          <div className="border border-dashed border-slate-300 rounded-xl p-6 bg-slate-50">
            <p className="text-xs text-slate-500 mb-4 text-center">Receipt Preview (58mm)</p>
            <div className="max-w-[200px] mx-auto bg-white p-4 rounded-lg shadow-sm text-center font-mono text-xs">
              <p className="font-bold text-sm">{localSettings.name}</p>
              <p className="text-slate-500">{localSettings.address}</p>
              <p className="text-slate-500">{localSettings.phone}</p>
              <p className="text-slate-500 mb-2">VAT: {localSettings.taxNumber}</p>
              <div className="border-t border-dashed border-slate-300 my-2"></div>
              <p className="text-left">Item x1 ......... 10.00</p>
              <p className="text-left">Item x2 ......... 20.00</p>
              <div className="border-t border-dashed border-slate-300 my-2"></div>
              <p className="text-left flex justify-between"><span>Subtotal:</span><span>30.00</span></p>
              <p className="text-left flex justify-between"><span>VAT ({localSettings.taxRate}%):</span><span>4.50</span></p>
              <p className="text-left flex justify-between font-bold"><span>TOTAL:</span><span>34.50</span></p>
              <div className="border-t border-dashed border-slate-300 my-2"></div>
              <p className="text-slate-500">{localSettings.receiptHeader}</p>
              <p className="text-slate-500 mt-1">{localSettings.receiptFooter}</p>
            </div>
          </div>
        </div>
      )}

      {/* Subscription */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Current Plan</p>
                <p className="text-2xl font-bold capitalize mt-1">{currentSubscription}</p>
                <p className="text-sm text-slate-400 mt-1">
                  {state.invoicesThisMonth} / {currentSubscription === 'free' ? '50' : '∞'} invoices this month
                </p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <Crown size={28} className="text-amber-400" />
              </div>
            </div>
            <div className="mt-4 bg-white/10 rounded-xl p-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Usage</span>
                <span className="text-white">{currentSubscription === 'free' ? `${(state.invoicesThisMonth / 50 * 100).toFixed(0)}%` : 'Unlimited'}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, state.invoicesThisMonth / 50 * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPlans.map(plan => (
              <div
                key={plan.id}
                className={`rounded-2xl border-2 p-6 transition-all ${
                  currentSubscription === plan.id
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10'
                    : plan.id === 'pro'
                    ? 'border-amber-300 bg-gradient-to-b from-amber-50 to-white'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {plan.id === 'pro' && (
                  <div className="flex items-center gap-1 mb-3">
                    <Zap size={14} className="text-amber-500" />
                    <span className="text-xs font-bold text-amber-600 uppercase">Most Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-slate-800">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-sm text-slate-500">/{plan.period}</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => dispatch({ type: 'SET_SUBSCRIPTION', payload: plan.id })}
                  disabled={currentSubscription === plan.id}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    currentSubscription === plan.id
                      ? 'bg-emerald-100 text-emerald-700 cursor-default'
                      : plan.id === 'pro'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {currentSubscription === plan.id ? 'Current Plan' : plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>

          {/* RevenueCat Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Globe size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-800">Powered by RevenueCat</p>
                <p className="text-xs text-blue-600 mt-1">
                  Subscriptions are managed through RevenueCat for seamless In-App Purchase handling on both iOS and Android. 
                  Your subscription syncs across all devices automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
