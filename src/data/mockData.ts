import { MenuItem, InventoryItem, User, UserRole } from '@/types';

export const MOCK_MENU: MenuItem[] = [
  { 
    id: '1', 
    name: 'Espresso', 
    price: 3.5, 
    category: 'Coffee', 
    description: 'A concentrated form of coffee served in small, strong shots.', 
    isAvailable: true, 
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Arabica Coffee Beans', 'Filtered Water'],
    allergens: [],
    prepTime: 2
  },
  { 
    id: '2', 
    name: 'Cappuccino', 
    price: 4.5, 
    category: 'Coffee', 
    description: 'Espresso-based coffee drink that originated in Italy, prepared with double espresso and steamed milk foam.', 
    isAvailable: true, 
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Espresso', 'Whole Milk', 'Cocoa Powder'],
    allergens: ['Dairy'],
    prepTime: 4
  },
  { 
    id: '3', 
    name: 'Green Tea', 
    price: 3.0, 
    category: 'Tea', 
    description: 'Fresh organic green tea leaves steeped to perfection.', 
    isAvailable: true, 
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Premium Green Tea Leaves', 'Hot Water'],
    allergens: [],
    prepTime: 3
  },
  { 
    id: '4', 
    name: 'Butter Croissant', 
    price: 2.5, 
    category: 'Pastries', 
    description: 'Flaky, golden-brown pastry made with layers of butter-laminated dough.', 
    isAvailable: true, 
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Flour', 'Butter', 'Yeast', 'Sugar', 'Milk'],
    allergens: ['Wheat', 'Dairy', 'Eggs'],
    prepTime: 1
  },
  { 
    id: '5', 
    name: 'Club Sandwich', 
    price: 12.0, 
    category: 'Sandwiches', 
    description: 'A sandwich with toasted bread, poultry, ham or fried bacon, lettuce, tomato, and mayonnaise.', 
    isAvailable: true, 
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Toasted Sourdough', 'Grilled Chicken', 'Bacon', 'Lettuce', 'Tomato', 'Mayo'],
    allergens: ['Wheat', 'Eggs', 'Mustard'],
    prepTime: 8
  },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Coffee Beans', quantity: 15, unit: 'kg', lowStockThreshold: 5 },
  { id: 'i2', name: 'Milk', quantity: 20, unit: 'L', lowStockThreshold: 10 },
  { id: 'i3', name: 'Sugar', quantity: 2, unit: 'kg', lowStockThreshold: 5 },
  { id: 'i4', name: 'Flour', quantity: 25, unit: 'kg', lowStockThreshold: 10 },
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Zaha Manager',
  role: UserRole.ADMIN
};

export const TAX_RATE = 0.08;
