import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, ShoppingCart, ChefHat, ClipboardList, Coffee, Package, BarChart3 } from 'lucide-react';
import { UserRole } from '@/types';

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF] },
  { path: '/pos', label: 'POS', icon: ShoppingCart, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF] },
  { path: '/kitchen', label: 'Kitchen', icon: ChefHat, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF] },
  { path: '/orders', label: 'Orders', icon: ClipboardList, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF] },
  { path: '/menu', label: 'Menu', icon: Coffee, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { path: '/inventory', label: 'Inventory', icon: Package, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { path: '/reports', label: 'Reports', icon: BarChart3, roles: [UserRole.ADMIN, UserRole.MANAGER] },
];

export const SHELLLESS_ROUTES = ['/'];
