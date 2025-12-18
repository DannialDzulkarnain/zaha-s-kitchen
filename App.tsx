
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Coffee, 
  ShoppingCart, 
  LayoutDashboard, 
  Package, 
  Settings, 
  BarChart3, 
  LogOut,
  Menu as MenuIcon,
  X,
  ChefHat,
  ClipboardList
} from 'lucide-react';
import { User, UserRole, MenuItem, Order, InventoryItem, OrderStatus } from './types';
import { MOCK_USER, MOCK_MENU, MOCK_INVENTORY } from './constants';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import MenuManagement from './pages/MenuManagement';
import InventoryManagement from './pages/InventoryManagement';
import Reports from './pages/Reports';
import Kitchen from './pages/Kitchen';
import OrdersList from './pages/OrdersList';

const App: React.FC = () => {
  const [currentUser] = useState<User>(MOCK_USER);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem('cafe_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    
    const savedMenu = localStorage.getItem('cafe_menu');
    if (savedMenu) setMenuItems(JSON.parse(savedMenu));

    const savedInventory = localStorage.getItem('cafe_inventory');
    if (savedInventory) setInventory(JSON.parse(savedInventory));
  }, []);

  useEffect(() => {
    localStorage.setItem('cafe_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cafe_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('cafe_inventory', JSON.stringify(inventory));
  }, [inventory]);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const Sidebar = () => {
    const location = useLocation();
    
    const navItems = [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF] },
      { path: '/pos', label: 'POS', icon: ShoppingCart, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF] },
      { path: '/kitchen', label: 'Kitchen', icon: ChefHat, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF] },
      { path: '/orders', label: 'Orders', icon: ClipboardList, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF] },
      { path: '/menu', label: 'Menu', icon: Coffee, roles: [UserRole.ADMIN, UserRole.MANAGER] },
      { path: '/inventory', label: 'Inventory', icon: Package, roles: [UserRole.ADMIN, UserRole.MANAGER] },
      { path: '/reports', label: 'Reports', icon: BarChart3, roles: [UserRole.ADMIN, UserRole.MANAGER] },
    ];

    const filteredNavItems = navItems.filter(item => item.roles.includes(currentUser.role));

    return (
      <>
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between h-20 px-6 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Zaha's Kitchen</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-stone-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-hide">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === item.path ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-stone-800 bg-stone-900">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center text-lg font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">{currentUser.role}</p>
              </div>
            </div>
            <button className="flex items-center gap-3 w-full px-4 py-3 mt-2 text-stone-400 hover:text-red-400 transition-colors group">
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-stone-50">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden">
          {/* Mobile Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-stone-200 lg:hidden">
            <button onClick={() => setSidebarOpen(true)} className="p-2 bg-white rounded-lg shadow-sm border border-stone-200">
              <MenuIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-orange-500" />
              <span className="text-lg font-bold">Zaha's Kitchen</span>
            </div>
            <div className="w-10" /> {/* Spacer for centering title */}
          </div>

          <div className="p-4 md:p-6 lg:p-8 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard orders={orders} menuItems={menuItems} inventory={inventory} />} />
              <Route path="/pos" element={<POS menuItems={menuItems} onCompleteOrder={(order) => setOrders(prev => [...prev, order])} inventory={inventory} setInventory={setInventory} />} />
              <Route path="/kitchen" element={<Kitchen orders={orders} updateStatus={updateOrderStatus} />} />
              <Route path="/orders" element={<OrdersList orders={orders} updateStatus={updateOrderStatus} />} />
              <Route path="/menu" element={<MenuManagement items={menuItems} setItems={setMenuItems} />} />
              <Route path="/inventory" element={<InventoryManagement inventory={inventory} setInventory={setInventory} />} />
              <Route path="/reports" element={<Reports orders={orders} inventory={inventory} />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
