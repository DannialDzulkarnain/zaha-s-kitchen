
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export type Category = 'Coffee' | 'Tea' | 'Pastries' | 'Sandwiches' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  isAvailable: boolean;
  image: string;
  ingredients: string[];
  allergens: string[];
  prepTime: number; // in minutes
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';
export type OrderType = 'Dine-in' | 'Takeaway' | 'Delivery';
export type PaymentMethod = 'Cash' | 'Card' | 'Digital';

export interface OrderItem {
  cartItemId: string; // Unique ID for this specific line item in the cart
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  instructions?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  type: OrderType;
  paymentMethod: PaymentMethod;
  timestamp: number;
  tableNumber?: string;
}
