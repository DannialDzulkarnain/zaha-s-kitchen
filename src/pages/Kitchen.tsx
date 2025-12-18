import React from 'react';
import { ChefHat, Clock, CheckCircle, Play, MessageSquare, Timer } from 'lucide-react';
import { Order, OrderStatus } from '@/types';

interface KitchenProps {
  orders: Order[];
  updateStatus: (id: string, status: OrderStatus) => void;
}

const Kitchen: React.FC<KitchenProps> = ({ orders, updateStatus }) => {
  // Only show active orders that aren't yet ready or delivered
  const activeOrders = orders.filter(o => 
    o.status === 'Pending' || o.status === 'Preparing'
  ).sort((a, b) => a.timestamp - b.timestamp);

  const getTimeElapsed = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    return minutes;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-orange-500" />
            Kitchen Display
          </h1>
          <p className="text-stone-500 mt-1 font-medium">Active preparation queue ({activeOrders.length})</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-stone-600">Live Sync</span>
          </div>
        </div>
      </header>

      {activeOrders.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center text-stone-300">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6">
            <ChefHat className="w-12 h-12 stroke-1" />
          </div>
          <p className="text-lg font-black text-stone-900 uppercase tracking-widest">No Active Orders</p>
          <p className="text-sm font-medium">The kitchen is currently caught up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {activeOrders.map(order => {
            const elapsed = getTimeElapsed(order.timestamp);
            const isLate = elapsed > 15;

            return (
              <div 
                key={order.id} 
                className={`flex flex-col bg-white rounded-[2rem] border-2 transition-all shadow-sm ${
                  order.status === 'Preparing' ? 'border-orange-500 ring-4 ring-orange-500/5' : 'border-stone-100'
                }`}
              >
                <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-stone-900">#{order.id.slice(-3).toUpperCase()}</span>
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        order.type === 'Dine-in' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {order.type} {order.tableNumber ? `• T${order.tableNumber}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Timer className={`w-3 h-3 ${isLate ? 'text-red-500' : 'text-stone-400'}`} />
                      <span className={`text-[10px] font-black ${isLate ? 'text-red-500' : 'text-stone-400'}`}>
                        {elapsed} MINS AGO
                      </span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${order.status === 'Preparing' ? 'bg-orange-500' : 'bg-stone-300'}`} />
                </div>

                <div className="flex-1 p-6 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-black text-stone-600">
                            {item.quantity}
                          </div>
                          <span className="font-bold text-stone-900">{item.name}</span>
                        </div>
                      </div>
                      {item.instructions && (
                        <div className="ml-9 p-2 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-2">
                          <MessageSquare className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                          <p className="text-[10px] font-bold text-orange-700 italic leading-tight">
                            {item.instructions}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-stone-50 rounded-b-[2rem] mt-auto">
                  {order.status === 'Pending' ? (
                    <button 
                      onClick={() => updateStatus(order.id, 'Preparing')}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-stone-900/10"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Start Preparing
                    </button>
                  ) : (
                    <button 
                      onClick={() => updateStatus(order.id, 'Ready')}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all active:scale-95 shadow-xl shadow-green-600/10"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Ready
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Kitchen;
