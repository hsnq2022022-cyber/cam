import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, Customer, Invoice, BusinessSettings } from '../types';
import { mockProducts, mockCustomers, mockInvoices, defaultBusinessSettings } from '../data/mockData';

interface AppState {
  products: Product[];
  cart: CartItem[];
  customers: Customer[];
  invoices: Invoice[];
  settings: BusinessSettings;
  selectedCustomer: Customer | null;
  currentSubscription: string;
  invoicesThisMonth: number;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'UPDATE_CART_DISCOUNT'; payload: { productId: string; discount: number; discountType: 'percentage' | 'fixed' } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SELECTED_CUSTOMER'; payload: Customer | null }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'UPDATE_CUSTOMER'; payload: Customer }
  | { type: 'CREATE_INVOICE'; payload: Invoice }
  | { type: 'CANCEL_INVOICE'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<BusinessSettings> }
  | { type: 'SET_SUBSCRIPTION'; payload: string };

const initialState: AppState = {
  products: mockProducts,
  cart: [],
  customers: mockCustomers,
  invoices: mockInvoices,
  settings: defaultBusinessSettings,
  selectedCustomer: null,
  currentSubscription: 'free',
  invoicesThisMonth: mockInvoices.length,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.product.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1, discount: 0, discountType: 'fixed' }],
      };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload) };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case 'UPDATE_CART_DISCOUNT':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, discount: action.payload.discount, discountType: action.payload.discountType }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [], selectedCustomer: null };
    case 'SET_SELECTED_CUSTOMER':
      return { ...state, selectedCustomer: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(c => c.id === action.payload.id ? action.payload : c),
      };
    case 'CREATE_INVOICE':
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
        invoicesThisMonth: state.invoicesThisMonth + 1,
      };
    case 'CANCEL_INVOICE':
      return {
        ...state,
        invoices: state.invoices.map(inv =>
          inv.id === action.payload ? { ...inv, status: 'cancelled' as const } : inv
        ),
      };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'SET_SUBSCRIPTION':
      return { ...state, currentSubscription: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

// Helper functions
export function calculateCartTotals(cart: CartItem[], settings: BusinessSettings) {
  let subtotal = 0;
  let totalDiscount = 0;

  cart.forEach(item => {
    const itemTotal = item.product.sellingPrice * item.quantity;
    let itemDiscount = 0;
    if (item.discountType === 'percentage') {
      itemDiscount = itemTotal * (item.discount / 100);
    } else {
      itemDiscount = item.discount;
    }
    subtotal += itemTotal;
    totalDiscount += itemDiscount;
  });

  const afterDiscount = subtotal - totalDiscount;
  let taxAmount = 0;
  if (settings.taxType === 'exclusive') {
    taxAmount = afterDiscount * (settings.taxRate / 100);
  } else {
    taxAmount = afterDiscount - (afterDiscount / (1 + settings.taxRate / 100));
  }

  const total = afterDiscount + taxAmount;
  return { subtotal, totalDiscount, taxAmount, total };
}
