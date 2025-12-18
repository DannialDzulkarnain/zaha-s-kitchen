import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './AppShell';
import { NAV_ITEMS } from './navigation';
import { usePersistentState } from '@/hooks/usePersistentState';
import { MOCK_USER, MOCK_MENU, MOCK_INVENTORY } from '@/data/mockData';
import Dashboard from '@/pages/Dashboard';
import InventoryManagement from '@/pages/InventoryManagement';
import Kitchen from '@/pages/Kitchen';
import LandingPage from '@/pages/LandingPage';
import MenuManagement from '@/pages/MenuManagement';
import OrdersList from '@/pages/OrdersList';
import POS from '@/pages/POS';
import Reports from '@/pages/Reports';
import { InventoryItem, MenuItem, Order, OrderStatus, User } from '@/types';

const App: React.FC = () => {
  const [currentUser] = React.useState<User>(MOCK_USER);
  const [menuItems, setMenuItems] = usePersistentState<MenuItem[]>('cafe_menu', MOCK_MENU);
  const [orders, setOrders] = usePersistentState<Order[]>('cafe_orders', []);
  const [inventory, setInventory] = usePersistentState<InventoryItem[]>('cafe_inventory', MOCK_INVENTORY);

  const updateOrderStatus = React.useCallback(
    (orderId: string, newStatus: OrderStatus) => {
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
    },
    [setOrders]
  );

  const handleOrderComplete = React.useCallback(
    (order: Order) => {
      setOrders((prev) => [...prev, order]);
    },
    [setOrders]
  );

  return (
    <HashRouter>
      <AppShell user={currentUser} navItems={NAV_ITEMS}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard orders={orders} menuItems={menuItems} inventory={inventory} />} />
          <Route
            path="/pos"
            element={<POS menuItems={menuItems} onCompleteOrder={handleOrderComplete} inventory={inventory} setInventory={setInventory} />}
          />
          <Route path="/kitchen" element={<Kitchen orders={orders} updateStatus={updateOrderStatus} />} />
          <Route path="/orders" element={<OrdersList orders={orders} updateStatus={updateOrderStatus} />} />
          <Route path="/menu" element={<MenuManagement items={menuItems} setItems={setMenuItems} />} />
          <Route path="/inventory" element={<InventoryManagement inventory={inventory} setInventory={setInventory} />} />
          <Route path="/reports" element={<Reports orders={orders} inventory={inventory} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
};

export default App;
