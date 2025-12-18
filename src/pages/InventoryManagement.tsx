import React from 'react';
import { Package, AlertTriangle, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { InventoryItem } from '@/types';

interface InventoryManagementProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({ inventory, setInventory }) => {
  const updateStock = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-stone-900">Inventory</h1>
        <p className="text-stone-500 mt-1">Track supplies and manage stock levels.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map(item => {
          const isLow = item.quantity <= item.lowStockThreshold;
          const progress = Math.min(100, (item.quantity / (item.lowStockThreshold * 3)) * 100);
          
          return (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 relative overflow-hidden group">
              {isLow && (
                <div className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-xl">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl ${isLow ? 'bg-red-100 text-red-600' : 'bg-stone-100 text-stone-600'}`}>
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-900">{item.name}</h3>
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">{item.unit}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-bold text-stone-900">{item.quantity}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateStock(item.id, -1)}
                      className="p-2 hover:bg-stone-100 rounded-lg transition-colors border border-stone-100"
                    >
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    </button>
                    <button 
                      onClick={() => updateStock(item.id, 1)}
                      className="p-2 hover:bg-stone-100 rounded-lg transition-colors border border-stone-100"
                    >
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${isLow ? 'bg-red-500' : 'bg-orange-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase">
                    <span>Low: {item.lowStockThreshold}</span>
                    <span>Safe Level</span>
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-stone-50 border border-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-100 transition-all text-sm">
                <RefreshCw className="w-4 h-4" />
                Restock Item
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-stone-900 p-8 rounded-3xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Automatic Reordering</h2>
            <p className="text-stone-400 max-w-md">Enable smart reordering to automatically place purchase orders when stock reaches critical thresholds.</p>
          </div>
          <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
            Configure Smart Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
