
import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, AlertCircle, Plus, Check } from 'lucide-react';
import { Order, MenuItem, InventoryItem } from '../types';

interface DashboardProps {
  orders: Order[];
  menuItems: MenuItem[];
  inventory: InventoryItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ orders, menuItems, inventory }) => {
  const today = new Date().setHours(0,0,0,0);
  const todayOrders = orders.filter(o => o.timestamp >= today);
  const totalRevenue = todayOrders.reduce((acc, o) => acc + o.total, 0);
  const lowStockItems = inventory.filter(i => i.quantity <= i.lowStockThreshold);

  const stats = [
    { label: 'Today Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Orders Today', value: todayOrders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Menu', value: menuItems.filter(m => m.isAvailable).length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const handleAddToPurchaseOrder = (itemName: string) => {
    alert(`Drafted purchase order for: ${itemName}`);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20 lg:pb-0">
      <header>
        <h1 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight">Dashboard</h1>
        <p className="text-stone-500 mt-1 font-medium text-sm md:text-base">Welcome back, here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-black uppercase text-stone-400 bg-stone-50 px-2 py-1 rounded">Update 1m ago</span>
            </div>
            <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl md:text-3xl font-black text-stone-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-stone-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-stone-900 tracking-tight">Recent Activity</h2>
            <button className="text-xs font-bold text-orange-500 hover:text-orange-600">View All Orders</button>
          </div>
          <div className="space-y-3">
            {todayOrders.slice(-5).reverse().map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-stone-50/50 rounded-2xl border border-stone-100 hover:bg-white transition-all group cursor-pointer">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center font-black text-xs text-stone-400 flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    #{order.id.slice(-3).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900 truncate">Customer Order</p>
                    <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{order.type} • {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-stone-900">${order.total.toFixed(2)}</p>
                  <span className={`inline-block px-2 py-0.5 text-[8px] font-black uppercase rounded-full tracking-widest ${
                    order.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {todayOrders.length === 0 && (
              <div className="text-center py-12 bg-stone-50/30 rounded-3xl border-2 border-dashed border-stone-100">
                <ShoppingBag className="w-12 h-12 text-stone-200 mx-auto mb-3" />
                <p className="text-stone-400 font-bold">No orders processed today.</p>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-stone-900 tracking-tight">Stock Alerts</h2>
            {lowStockItems.length > 0 && (
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </div>
          <div className="space-y-4 flex-1">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 p-4 border border-red-100 bg-red-50/30 rounded-2xl relative overflow-hidden group hover:border-red-200 transition-colors">
                <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="font-black text-stone-900">{item.name}</p>
                    <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Level: {item.quantity} {item.unit}</p>
                  </div>
                  <div className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                    Low
                  </div>
                </div>
                <div className="w-full bg-red-100 h-1.5 rounded-full relative z-10">
                  <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (item.quantity / item.lowStockThreshold) * 100)}%` }} />
                </div>
                
                {/* Individual Action Button */}
                <button 
                  onClick={() => handleAddToPurchaseOrder(item.name)}
                  className="relative z-10 mt-1 flex items-center justify-center gap-2 py-2 px-4 bg-white border border-red-200 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95"
                >
                  <Plus className="w-3 h-3" />
                  Add to Purchase Order
                </button>
              </div>
            ))}
            {lowStockItems.length === 0 && (
              <div className="text-center py-12 flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-100">
                  <Check className="w-8 h-8" />
                </div>
                <p className="text-stone-400 font-bold text-sm">Inventory looks good.</p>
              </div>
            )}
          </div>
          {lowStockItems.length > 0 && (
             <button className="w-full mt-6 py-4 bg-stone-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 active:scale-95">
                Restock All Now
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
