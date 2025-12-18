
import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ArrowLeft, 
  Info, 
  Plus, 
  Clock, 
  ShieldAlert, 
  Search, 
  X, 
  MessageSquare,
  Minus,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Send
} from 'lucide-react';
import { MenuItem, Category, Order, OrderItem, OrderType, PaymentMethod, InventoryItem } from '../types';
import { TAX_RATE } from '../constants';

interface POSProps {
  menuItems: MenuItem[];
  onCompleteOrder: (order: Order) => void;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const POS: React.FC<POSProps> = ({ menuItems, onCompleteOrder, inventory, setInventory }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('Dine-in');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [tableNumber, setTableNumber] = useState('');
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [viewingItem, setViewingItem] = useState<MenuItem | null>(null);
  const [currentInstructions, setCurrentInstructions] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const categories: (Category | 'All')[] = ['All', 'Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Desserts'];

  // Toast auto-hide
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const addToCart = (item: MenuItem, instructions: string = '') => {
    setCart(prev => {
      const instr = instructions.trim() || undefined;
      const existingIndex = prev.findIndex(i => i.menuItemId === item.id && i.instructions === instr);
      
      if (existingIndex !== -1) {
        const newCart = [...prev];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1
        };
        showToast(`Updated ${item.name} quantity`);
        return newCart;
      }

      showToast(`Added ${item.name} to order`);
      return [...prev, { 
        cartItemId: Math.random().toString(36).substr(2, 9),
        menuItemId: item.id, 
        name: item.name, 
        price: item.price, 
        quantity: 1,
        instructions: instr
      }];
    });
    
    setViewingItem(null);
    setCurrentInstructions('');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
    showToast("Item removed", 'error');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.cartItemId === cartItemId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => {
    if (cart.length > 0 && confirm('Clear current order?')) {
      setCart([]);
      showToast("Order cleared", 'error');
    }
  };

  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleFinalSubmit = () => {
    if (cart.length === 0) {
      showToast("Add items to your cart first", 'error');
      return;
    }
    if (orderType === 'Dine-in' && !tableNumber) {
      showToast("Please assign a table number", 'error');
      return;
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      subtotal,
      tax,
      discount: 0,
      total,
      status: 'Pending',
      type: orderType,
      paymentMethod,
      timestamp: Date.now(),
      tableNumber: orderType === 'Dine-in' ? tableNumber : undefined
    };

    onCompleteOrder(newOrder);
    setCart([]);
    setTableNumber('');
    setShowMobileCart(false);
    showToast("Order submitted to kitchen!");
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative flex flex-col lg:flex-row gap-6 h-full lg:h-[calc(100vh-140px)] animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Notifications */}
      {toast && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border transition-all animate-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-stone-900 border-stone-800 text-white' : 'bg-red-50 border-red-100 text-red-600'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-bold text-sm tracking-tight">{toast.message}</span>
        </div>
      )}

      {/* Menu Explorer */}
      <div className={`flex-1 flex flex-col min-h-0 ${showMobileCart ? 'hidden lg:flex' : 'flex'}`}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input 
              type="text"
              placeholder="Search dishes, drinks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl whitespace-nowrap transition-all font-bold text-xs ${
                  selectedCategory === cat 
                  ? 'bg-stone-900 text-white shadow-lg shadow-stone-900/10' 
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-20 lg:pb-4 flex-1 scrollbar-thin">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-3xl border border-stone-100 p-2 transition-all hover:shadow-xl hover:-translate-y-1 ${!item.isAvailable && 'opacity-60 grayscale'}`}
            >
              <div className="aspect-square rounded-2xl bg-stone-50 overflow-hidden relative cursor-pointer" onClick={() => setViewingItem(item)}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="px-3 py-1 bg-white text-stone-900 rounded-full text-[10px] font-black uppercase tracking-widest">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-stone-900 truncate text-sm flex-1">{item.name}</h4>
                  <p className="text-orange-600 font-black text-sm ml-2">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                   <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{item.category}</p>
                   <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                    disabled={!item.isAvailable}
                    className="p-2.5 bg-stone-900 text-white rounded-xl shadow-lg shadow-stone-200 active:scale-90 transition-all disabled:bg-stone-200"
                   >
                    <Plus className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Finalization */}
      <div className={`
        fixed inset-0 z-40 bg-white flex flex-col lg:static lg:z-0 lg:w-[420px] lg:rounded-[2.5rem] lg:shadow-2xl lg:border lg:border-stone-100 lg:flex
        ${showMobileCart ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50 sticky top-0 lg:hidden">
          <button onClick={() => setShowMobileCart(false)} className="flex items-center gap-2 text-stone-600 font-bold px-3 py-1 bg-white border border-stone-200 rounded-xl">
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </button>
          <h3 className="font-black text-stone-900 uppercase tracking-widest text-sm">Review Cart</h3>
          <div className="w-10" />
        </div>

        <div className="p-8 border-b border-stone-50 bg-white flex-shrink-0">
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-orange-500" />
              Order Summary
            </h3>
            {cart.length > 0 && (
              <button 
                onClick={clearCart}
                className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
          
          <div className="flex gap-2 p-1 bg-stone-100 rounded-[1.25rem] mb-6">
            {(['Dine-in', 'Takeaway', 'Delivery'] as OrderType[]).map(type => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  orderType === type ? 'bg-white text-stone-900 shadow-sm shadow-stone-200' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          {orderType === 'Dine-in' && (
            <div className="relative group">
              <input
                type="text"
                placeholder="Assign Table (e.g. 12)"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-5 py-4 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl text-sm font-bold transition-all outline-none"
              />
            </div>
          )}
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 scrollbar-thin">
          {cart.map(item => (
            <div key={item.cartItemId} className="flex flex-col gap-2 p-4 bg-stone-50/50 rounded-2xl border border-stone-50 group hover:bg-white hover:border-stone-100 transition-all">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-stone-900 truncate">{item.name}</p>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-100">
                  <button onClick={() => updateQuantity(item.cartItemId, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-stone-50 rounded-lg transition-all">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black w-6 text-center text-stone-900">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartItemId, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-stone-50 rounded-lg transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.cartItemId)} className="p-2 text-stone-200 hover:text-red-500 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {item.instructions && (
                <div className="flex items-start gap-2 pt-2 border-t border-stone-100 mt-1">
                  <MessageSquare className="w-3 h-3 text-orange-400" />
                  <p className="text-[10px] font-bold text-stone-500 italic flex-1">
                    {item.instructions}
                  </p>
                </div>
              )}
            </div>
          ))}
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-stone-300 py-12 text-center">
              <ShoppingCart className="w-12 h-12 stroke-1 mb-4 opacity-50" />
              <p className="font-bold uppercase text-[10px] tracking-widest">Cart is empty</p>
            </div>
          )}
        </div>

        {/* Action Section */}
        <div className="p-8 bg-stone-50 border-t border-stone-100 rounded-b-[2.5rem] flex-shrink-0">
          <div className="space-y-4 mb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Select Payment</p>
              <div className="grid grid-cols-3 gap-2">
                {(['Cash', 'Card', 'Digital'] as PaymentMethod[]).map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === method 
                      ? 'bg-stone-900 border-stone-900 text-white shadow-lg' 
                      : 'bg-white border-stone-200 text-stone-400'
                    }`}
                  >
                    {method === 'Cash' && <Banknote className="w-4 h-4" />}
                    {method === 'Card' && <CreditCard className="w-4 h-4" />}
                    {method === 'Digital' && <Smartphone className="w-4 h-4" />}
                    <span className="text-[9px] font-black uppercase tracking-tighter">{method}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200/50">
              <div className="flex justify-between items-center mb-1 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-stone-900 font-black text-2xl pt-2">
                <span>Total</span>
                <span className="text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleFinalSubmit}
            className="w-full py-5 bg-stone-900 text-white rounded-[1.5rem] font-black shadow-2xl shadow-stone-900/20 hover:bg-orange-600 hover:shadow-orange-600/30 transition-all active:scale-95 flex items-center justify-center gap-3 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            <span className="relative">SUBMIT ORDER TO KITCHEN</span>
          </button>
        </div>
      </div>

      {/* Item Detail Modal */}
      {viewingItem && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-stone-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">
              <div className="w-full md:w-5/12 aspect-video md:h-full relative overflow-hidden bg-stone-100">
                 <img src={viewingItem.image} alt={viewingItem.name} className="w-full h-full object-cover" />
                 <button onClick={() => {setViewingItem(null); setCurrentInstructions('');}} className="md:hidden absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-stone-900 shadow-xl">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              
              <div className="flex-1 flex flex-col min-h-0">
                 <div className="hidden md:flex justify-end p-6">
                    <button onClick={() => {setViewingItem(null); setCurrentInstructions('');}} className="p-2 hover:bg-stone-50 rounded-full transition-all">
                       <X className="w-6 h-6" />
                    </button>
                 </div>
                 
                 <div className="p-8 md:pt-0 overflow-y-auto flex-1 scrollbar-thin">
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                           {viewingItem.category}
                        </span>
                        <div className="flex items-center gap-2 text-stone-400">
                           <Clock className="w-3 h-3" />
                           <span className="text-[10px] font-bold">{viewingItem.prepTime}m</span>
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-2">{viewingItem.name}</h2>
                      <p className="text-stone-500 text-sm md:text-base leading-relaxed">{viewingItem.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                       <div className="space-y-3">
                          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                            <Info className="w-3 h-3" /> Key Ingredients
                          </p>
                          <div className="flex flex-wrap gap-2">
                             {viewingItem.ingredients.map((ing, i) => (
                                <span key={i} className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-[10px] font-bold text-stone-600">
                                   {ing}
                                </span>
                             ))}
                          </div>
                       </div>
                       <div className="space-y-3">
                          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
                            <ShieldAlert className="w-3 h-3" /> Allergens
                          </p>
                          <div className="flex flex-wrap gap-2">
                             {viewingItem.allergens.length > 0 ? viewingItem.allergens.map((alg, i) => (
                                <span key={i} className="px-3 py-1.5 bg-red-50 border border-red-100 rounded-xl text-[10px] font-bold text-red-600">
                                   {alg}
                                </span>
                             )) : <span className="text-xs text-stone-400 font-medium italic">None</span>}
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-orange-500" /> 
                        Custom Instructions
                      </label>
                      <textarea 
                        placeholder="e.g. Extra hot, no sugar, soy milk..."
                        value={currentInstructions}
                        onChange={(e) => setCurrentInstructions(e.target.value)}
                        className="w-full h-28 p-5 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-[2rem] text-sm font-medium transition-all outline-none resize-none placeholder:text-stone-300 shadow-inner"
                      />
                    </div>
                 </div>

                 <div className="p-8 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-8 flex-shrink-0">
                    <div>
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Price</p>
                      <p className="text-3xl font-black text-stone-900">${viewingItem.price.toFixed(2)}</p>
                    </div>
                    <button 
                       onClick={() => addToCart(viewingItem, currentInstructions)}
                       className="flex-1 py-5 bg-stone-900 text-white rounded-3xl font-black shadow-2xl shadow-stone-900/20 hover:bg-orange-600 hover:shadow-orange-600/30 transition-all active:scale-95 flex items-center justify-center gap-3 group"
                    >
                       <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                       Add to Order
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Mobile Floating Button */}
      {!showMobileCart && cart.length > 0 && (
        <button 
          onClick={() => setShowMobileCart(true)}
          className="lg:hidden fixed bottom-6 left-6 right-6 bg-stone-900 text-white p-5 rounded-[2.5rem] shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-12 z-50 ring-4 ring-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500 rounded-3xl flex items-center justify-center font-black text-xl">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-black text-stone-400 tracking-[0.2em] mb-1">Draft Cart</p>
              <p className="font-black text-xl leading-none">${total.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest bg-stone-800 px-4 py-2 rounded-2xl">
            Review <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      )}
    </div>
  );
};

export default POS;
