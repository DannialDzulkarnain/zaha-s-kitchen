
import React, { useState } from 'react';
import { ClipboardList, Search, Filter, ArrowRight, CheckCircle2, XCircle, Clock, MoreVertical } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrdersListProps {
  orders: Order[];
  updateStatus: (id: string, status: OrderStatus) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, updateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (o.tableNumber && o.tableNumber.includes(searchTerm));
    const matchesFilter = filter === 'All' || o.status === filter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => b.timestamp - a.timestamp);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 'bg-stone-100 text-stone-600';
      case 'Preparing': return 'bg-orange-100 text-orange-700';
      case 'Ready': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-stone-100 text-stone-600';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Orders Registry</h1>
          <p className="text-stone-500 mt-1 font-medium">Track and manage every customer interaction.</p>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-6 md:p-8 bg-stone-50/30 border-b border-stone-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
              <input 
                type="text" 
                placeholder="Search by Order ID or Table..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-sm shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {['All', 'Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s as any)}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    filter === s 
                    ? 'bg-stone-900 text-white shadow-lg' 
                    : 'bg-white text-stone-400 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 text-stone-400 text-[9px] font-black uppercase tracking-[0.2em] border-b border-stone-50">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Type</th>
                <th className="px-8 py-5">Items</th>
                <th className="px-8 py-5">Total</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-stone-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-stone-900">#{order.id.slice(-6).toUpperCase()}</span>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                        {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-stone-600">{order.type}</span>
                      {order.tableNumber && (
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-0.5">Table {order.tableNumber}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className="w-7 h-7 bg-stone-100 rounded-lg flex items-center justify-center text-[10px] font-black text-stone-600">
                         {order.items.reduce((a, b) => a + b.quantity, 0)}
                       </span>
                       <span className="text-xs text-stone-500 font-medium truncate max-w-[150px]">
                         {order.items.map(i => i.name).join(', ')}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-stone-900">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {order.status === 'Ready' && (
                        <button 
                          onClick={() => updateStatus(order.id, 'Delivered')}
                          className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition-all"
                          title="Complete Order"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      )}
                      {(order.status === 'Pending' || order.status === 'Preparing') && (
                        <button 
                          onClick={() => updateStatus(order.id, 'Cancelled')}
                          className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Cancel Order"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                      <button className="p-2 text-stone-300 hover:text-stone-900 rounded-xl transition-all">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="py-20 text-center text-stone-400">
               <ClipboardList className="w-12 h-12 mx-auto mb-4 stroke-1 opacity-50" />
               <p className="font-bold">No orders match your current filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
