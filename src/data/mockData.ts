import { Product, Customer, Invoice, BusinessSettings, SubscriptionPlan } from '../types';

export const mockProducts: Product[] = [
  { id: '1', name: 'Arabic Coffee', nameAr: 'قهوة عربية', category: 'Beverages', sku: 'BEV001', barcode: '6281001000012', costPrice: 5, sellingPrice: 12, taxRate: 15, stock: 150, lowStockThreshold: 20, isActive: true },
  { id: '2', name: 'Green Tea', nameAr: 'شاي أخضر', category: 'Beverages', sku: 'BEV002', barcode: '6281001000029', costPrice: 3, sellingPrice: 8, taxRate: 15, stock: 200, lowStockThreshold: 30, isActive: true },
  { id: '3', name: 'Fresh Orange Juice', nameAr: 'عصير برتقال طازج', category: 'Beverages', sku: 'BEV003', barcode: '6281001000036', costPrice: 8, sellingPrice: 18, taxRate: 15, stock: 45, lowStockThreshold: 10, isActive: true },
  { id: '4', name: 'Mineral Water 500ml', nameAr: 'ماء معدني ٥٠٠مل', category: 'Beverages', sku: 'BEV004', barcode: '6281001000043', costPrice: 0.5, sellingPrice: 2, taxRate: 15, stock: 500, lowStockThreshold: 100, isActive: true },
  { id: '5', name: 'Croissant', nameAr: 'كرواسون', category: 'Bakery', sku: 'BAK001', barcode: '6281002000015', costPrice: 4, sellingPrice: 10, taxRate: 15, stock: 30, lowStockThreshold: 10, isActive: true },
  { id: '6', name: 'Arabic Bread', nameAr: 'خبز عربي', category: 'Bakery', sku: 'BAK002', barcode: '6281002000022', costPrice: 1, sellingPrice: 3, taxRate: 15, stock: 80, lowStockThreshold: 20, isActive: true },
  { id: '7', name: 'Cheese Manakeesh', nameAr: 'مناقيش جبنة', category: 'Bakery', sku: 'BAK003', barcode: '6281002000039', costPrice: 6, sellingPrice: 15, taxRate: 15, stock: 25, lowStockThreshold: 8, isActive: true },
  { id: '8', name: 'Chicken Shawarma', nameAr: 'شاورما دجاج', category: 'Food', sku: 'FOD001', barcode: '6281003000018', costPrice: 10, sellingPrice: 25, taxRate: 15, stock: 40, lowStockThreshold: 10, isActive: true },
  { id: '9', name: 'Falafel Wrap', nameAr: 'لفافة فلافل', category: 'Food', sku: 'FOD002', barcode: '6281003000025', costPrice: 5, sellingPrice: 14, taxRate: 15, stock: 35, lowStockThreshold: 10, isActive: true },
  { id: '10', name: 'Hummus', nameAr: 'حمص', category: 'Food', sku: 'FOD003', barcode: '6281003000032', costPrice: 4, sellingPrice: 12, taxRate: 15, stock: 50, lowStockThreshold: 15, isActive: true },
  { id: '11', name: 'Dates (Premium)', nameAr: 'تمر فاخر', category: 'Grocery', sku: 'GRC001', barcode: '6281004000011', costPrice: 15, sellingPrice: 35, taxRate: 15, stock: 60, lowStockThreshold: 10, isActive: true },
  { id: '12', name: 'Olive Oil 1L', nameAr: 'زيت زيتون ١ لتر', category: 'Grocery', sku: 'GRC002', barcode: '6281004000028', costPrice: 20, sellingPrice: 45, taxRate: 15, stock: 8, lowStockThreshold: 10, isActive: true },
  { id: '13', name: 'Basmati Rice 5kg', nameAr: 'أرز بسمتي ٥ كجم', category: 'Grocery', sku: 'GRC003', barcode: '6281004000035', costPrice: 18, sellingPrice: 38, taxRate: 15, stock: 25, lowStockThreshold: 5, isActive: true },
  { id: '14', name: 'Laban Ayran', nameAr: 'لبن عيران', category: 'Dairy', sku: 'DRY001', barcode: '6281005000014', costPrice: 2, sellingPrice: 6, taxRate: 15, stock: 100, lowStockThreshold: 20, isActive: true },
  { id: '15', name: 'Kunafa', nameAr: 'كنافة', category: 'Desserts', sku: 'DES001', barcode: '6281006000017', costPrice: 12, sellingPrice: 28, taxRate: 15, stock: 15, lowStockThreshold: 5, isActive: true },
  { id: '16', name: 'Baklava', nameAr: 'بقلاوة', category: 'Desserts', sku: 'DES002', barcode: '6281006000024', costPrice: 8, sellingPrice: 22, taxRate: 15, stock: 20, lowStockThreshold: 5, isActive: true },
];

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Ahmed Al-Rashid', nameAr: 'أحمد الراشد', phone: '+966501234567', email: 'ahmed@email.com', address: 'Riyadh, Saudi Arabia', totalPurchases: 15200, outstandingBalance: 0, createdAt: '2024-01-15' },
  { id: '2', name: 'Fatima Hassan', nameAr: 'فاطمة حسن', phone: '+966502345678', email: 'fatima@email.com', address: 'Jeddah, Saudi Arabia', totalPurchases: 8750, outstandingBalance: 350, createdAt: '2024-02-20' },
  { id: '3', name: 'Mohammed Ali', nameAr: 'محمد علي', phone: '+966503456789', email: 'mohammed@email.com', address: 'Dammam, Saudi Arabia', totalPurchases: 22100, outstandingBalance: 0, createdAt: '2024-01-05' },
  { id: '4', name: 'Sara Ibrahim', nameAr: 'سارة إبراهيم', phone: '+966504567890', email: 'sara@email.com', address: 'Riyadh, Saudi Arabia', totalPurchases: 5600, outstandingBalance: 180, createdAt: '2024-03-10' },
  { id: '5', name: 'Khalid Omar', nameAr: 'خالد عمر', phone: '+966505678901', address: 'Mecca, Saudi Arabia', totalPurchases: 31400, outstandingBalance: 0, createdAt: '2023-11-25' },
];

export const mockInvoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', customer: mockCustomers[0], items: [{ product: mockProducts[0], quantity: 3, discount: 0, discountType: 'fixed' }, { product: mockProducts[4], quantity: 2, discount: 0, discountType: 'fixed' }], subtotal: 56, taxAmount: 8.4, discount: 0, discountType: 'fixed', total: 64.4, paidAmount: 64.4, paymentMethod: 'cash', status: 'paid', createdAt: '2024-12-01T10:30:00' },
  { id: '2', invoiceNumber: 'INV-2024-002', customer: mockCustomers[1], items: [{ product: mockProducts[7], quantity: 2, discount: 5, discountType: 'percentage' }, { product: mockProducts[2], quantity: 1, discount: 0, discountType: 'fixed' }], subtotal: 68, taxAmount: 9.5, discount: 3.4, discountType: 'percentage', total: 74.1, paidAmount: 50, paymentMethod: 'split', status: 'partial', createdAt: '2024-12-02T14:15:00' },
  { id: '3', invoiceNumber: 'INV-2024-003', items: [{ product: mockProducts[10], quantity: 1, discount: 0, discountType: 'fixed' }, { product: mockProducts[11], quantity: 2, discount: 0, discountType: 'fixed' }], subtotal: 125, taxAmount: 18.75, discount: 0, discountType: 'fixed', total: 143.75, paidAmount: 143.75, paymentMethod: 'card', status: 'paid', createdAt: '2024-12-03T09:45:00' },
  { id: '4', invoiceNumber: 'INV-2024-004', customer: mockCustomers[3], items: [{ product: mockProducts[14], quantity: 1, discount: 0, discountType: 'fixed' }], subtotal: 28, taxAmount: 4.2, discount: 0, discountType: 'fixed', total: 32.2, paidAmount: 0, paymentMethod: 'credit', status: 'due', createdAt: '2024-12-04T16:20:00' },
  { id: '5', invoiceNumber: 'INV-2024-005', customer: mockCustomers[2], items: [{ product: mockProducts[8], quantity: 4, discount: 10, discountType: 'fixed' }, { product: mockProducts[9], quantity: 2, discount: 0, discountType: 'fixed' }, { product: mockProducts[3], quantity: 5, discount: 0, discountType: 'fixed' }], subtotal: 96, taxAmount: 12.9, discount: 10, discountType: 'fixed', total: 98.9, paidAmount: 98.9, paymentMethod: 'cash', status: 'paid', createdAt: '2024-12-05T11:00:00' },
  { id: '6', invoiceNumber: 'INV-2024-006', items: [{ product: mockProducts[15], quantity: 3, discount: 0, discountType: 'fixed' }], subtotal: 66, taxAmount: 9.9, discount: 0, discountType: 'fixed', total: 75.9, paidAmount: 75.9, paymentMethod: 'card', status: 'paid', createdAt: '2024-12-06T13:30:00' },
  { id: '7', invoiceNumber: 'INV-2024-007', customer: mockCustomers[4], items: [{ product: mockProducts[12], quantity: 2, discount: 0, discountType: 'fixed' }, { product: mockProducts[13], quantity: 4, discount: 0, discountType: 'fixed' }], subtotal: 100, taxAmount: 15, discount: 5, discountType: 'percentage', total: 109.25, paidAmount: 109.25, paymentMethod: 'cash', status: 'paid', createdAt: '2024-12-07T15:45:00' },
];

export const defaultBusinessSettings: BusinessSettings = {
  name: 'BillPro Store',
  nameAr: 'متجر بيل برو',
  taxNumber: '300123456789003',
  address: 'King Fahd Road, Riyadh, Saudi Arabia',
  addressAr: 'طريق الملك فهد، الرياض، المملكة العربية السعودية',
  phone: '+966 11 234 5678',
  currency: 'SAR',
  currencySymbol: 'ر.س',
  taxRate: 15,
  taxType: 'exclusive',
  receiptHeader: 'Thank you for your purchase!',
  receiptFooter: 'Visit us again! | www.billpro.com',
  language: 'en',
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'monthly',
    features: ['Basic POS', 'Up to 50 invoices/month', 'Up to 100 products', 'Cash payments', 'Basic reports'],
    limits: { invoicesPerMonth: 50, maxProducts: 100, cloudSync: false, advancedReports: false, customBranding: false }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29.99,
    period: 'monthly',
    features: ['Everything in Free', 'Unlimited invoices', 'Unlimited products', 'Cloud sync & backup', 'Advanced analytics', 'Custom receipt branding', 'Multi-device support', 'Priority support'],
    limits: { invoicesPerMonth: -1, maxProducts: -1, cloudSync: true, advancedReports: true, customBranding: true }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 79.99,
    period: 'monthly',
    features: ['Everything in Pro', 'Multi-store management', 'API access', 'Dedicated account manager', 'Custom integrations', 'White-label option', 'SLA guarantee', 'Team management'],
    limits: { invoicesPerMonth: -1, maxProducts: -1, cloudSync: true, advancedReports: true, customBranding: true }
  }
];

export const categories = ['All', 'Beverages', 'Bakery', 'Food', 'Grocery', 'Dairy', 'Desserts'];
