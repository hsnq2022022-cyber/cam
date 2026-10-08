export interface Product {
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
  image?: string;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount: number;
  discountType: 'percentage' | 'fixed';
}

export interface Customer {
  id: string;
  name: string;
  nameAr?: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;
  outstandingBalance: number;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer?: Customer;
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  discount: number;
  discountType: 'percentage' | 'fixed';
  total: number;
  paidAmount: number;
  paymentMethod: 'cash' | 'card' | 'split' | 'credit';
  status: 'paid' | 'partial' | 'cancelled' | 'due';
  createdAt: string;
  notes?: string;
}

export interface BusinessSettings {
  name: string;
  nameAr?: string;
  logo?: string;
  taxNumber: string;
  address: string;
  addressAr?: string;
  phone: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  taxType: 'inclusive' | 'exclusive';
  receiptHeader?: string;
  receiptFooter?: string;
  language: 'en' | 'ar';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  limits: {
    invoicesPerMonth: number;
    maxProducts: number;
    cloudSync: boolean;
    advancedReports: boolean;
    customBranding: boolean;
  };
}

export interface SalesSummary {
  date: string;
  totalSales: number;
  totalInvoices: number;
  totalTax: number;
  totalProfit: number;
}
