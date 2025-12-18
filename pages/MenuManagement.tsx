
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Filter, Clock, ShieldAlert } from 'lucide-react';
import { MenuItem, Category } from '../types';

interface MenuManagementProps {
  items: MenuItem[];
  setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const MenuManagement: React.FC<MenuManagementProps> = ({ items, setItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({
    ingredients: [],
    allergens: [],
    prepTime: 5
  });

  const handleToggleAvailability = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const handleStartEdit = (item: MenuItem) => {
    setIsEditing(item.id);
    setEditForm({ ...item });
  };

  const handleStartAdd = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setIsEditing(newId);
    setEditForm({
      id: newId,
      name: '',
      price: 0,
      category: 'Coffee',
      description: '',
      isAvailable: true,
      image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=400',
      ingredients: [],
      allergens: [],
      prepTime: 5
    });
  };

  const handleSaveEdit = () => {
    if (isEditing) {
      const isNew = !items.find(i => i.id === isEditing);
      if (isNew) {
        setItems(prev => [...prev, editForm as MenuItem]);
      } else {
        setItems(prev => prev.map(item => 
          item.id === isEditing ? { ...item, ...editForm } as MenuItem : item
        ));
      }
      setIsEditing(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleListChange = (field: 'ingredients' | 'allergens', value: string) => {
    const list = value.split(',').map(s => s.trim()).filter(Boolean);
    setEditForm(prev => ({ ...prev, [field]: list }));
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 lg:pb-0">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Menu Studio</h1>
          <p className="text-stone-500 mt-1 font-medium">Design your offerings and define culinary details.</p>
        </div>
        <button 
          onClick={handleStartAdd}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-[1.5rem] font-black hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Craft New Item
        </button>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-stone-50 bg-stone-50/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
              <input 
                type="text" 
                placeholder="Search catalog..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border border-stone-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-sm"
              />
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/30 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Product Details</th>
                <th className="px-8 py-5 text-center">Preparation</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Inventory Status</th>
                <th className="px-8 py-5 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-stone-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-stone-100 overflow-hidden border border-stone-100 shadow-sm flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-stone-900 text-base">{item.name}</p>
                        <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-[9px] font-black uppercase tracking-widest rounded-md inline-block mt-1">{item.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center gap-1">
                       <div className="flex items-center gap-1.5 text-stone-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold text-stone-900">{item.prepTime}m</span>
                       </div>
                       {item.allergens.length > 0 && (
                          <div className="flex items-center gap-1.5 text-red-400">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{item.allergens.length} Alerts</span>
                          </div>
                       )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-stone-900 text-lg">${item.price.toFixed(2)}</p>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => handleToggleAvailability(item.id)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
                        item.isAvailable 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {item.isAvailable ? 'Available' : 'Sold Out'}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleStartEdit(item)} className="p-3 text-stone-300 hover:text-stone-900 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-3 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-stone-50">
          {filteredItems.map(item => (
            <div key={item.id} className="p-6 space-y-4">
               <div className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h4 className="font-black text-stone-900 text-lg leading-tight truncate">{item.name}</h4>
                      <p className="font-black text-stone-900">${item.price.toFixed(2)}</p>
                    </div>
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest bg-stone-50 px-2 py-1 rounded inline-block mt-2">{item.category}</span>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-stone-400">
                           <Clock className="w-3.5 h-3.5" />
                           <span className="text-xs font-bold">{item.prepTime}m</span>
                        </div>
                        {item.allergens.length > 0 && (
                          <div className="flex items-center gap-1 text-red-400">
                             <ShieldAlert className="w-3.5 h-3.5" />
                             <span className="text-[9px] font-black uppercase tracking-widest">{item.allergens.length} allergens</span>
                          </div>
                        )}
                    </div>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button 
                    onClick={() => handleToggleAvailability(item.id)}
                    className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.isAvailable ? 'In Stock' : 'Sold Out'}
                  </button>
                  <button onClick={() => handleStartEdit(item)} className="p-3 bg-stone-100 text-stone-600 rounded-2xl active:scale-90">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-3 bg-stone-100 text-red-500 rounded-2xl active:scale-90">
                    <Trash2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-stone-900/40 backdrop-blur-sm p-0 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-t-[3rem] sm:rounded-[3rem] w-full max-w-4xl shadow-2xl flex flex-col md:flex-row animate-in slide-in-from-bottom-20 duration-500 min-h-[60vh]">
            <div className="w-full md:w-2/5 relative bg-stone-100">
               <img src={editForm.image} alt="Preview" className="w-full h-full object-cover min-h-[200px]" />
               <div className="absolute top-6 left-6 right-6">
                  <div className="p-4 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white">
                     <label className="text-[9px] font-black uppercase text-stone-400 mb-2 block tracking-widest">Image URL</label>
                     <input 
                       value={editForm.image}
                       onChange={e => setEditForm(p => ({...p, image: e.target.value}))}
                       className="w-full bg-transparent text-xs font-medium outline-none border-b border-stone-100 pb-1"
                       placeholder="https://..."
                     />
                  </div>
               </div>
            </div>
            <div className="flex-1 p-8 sm:p-12 space-y-8 overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-stone-900 tracking-tight">Product Config</h3>
                <button onClick={() => setIsEditing(null)} className="p-3 hover:bg-stone-50 rounded-[1.25rem] transition-all">
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Product Name</label>
                  <input 
                    value={editForm.name || ''} 
                    onChange={e => setEditForm(p => ({...p, name: e.target.value}))}
                    className="w-full px-6 py-4 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl font-bold transition-all outline-none"
                    placeholder="e.g., Avocado Toast"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Category</label>
                  <select 
                    value={editForm.category}
                    onChange={e => setEditForm(p => ({...p, category: e.target.value as Category}))}
                    className="w-full px-6 py-4 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl font-bold transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option>Coffee</option>
                    <option>Tea</option>
                    <option>Pastries</option>
                    <option>Sandwiches</option>
                    <option>Desserts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Price ($)</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={editForm.price || 0} 
                    onChange={e => setEditForm(p => ({...p, price: parseFloat(e.target.value)}))}
                    className="w-full px-6 py-4 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl font-bold transition-all outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Prep Time (mins)</label>
                  <input 
                    type="number"
                    value={editForm.prepTime || 0} 
                    onChange={e => setEditForm(p => ({...p, prepTime: parseInt(e.target.value)}))}
                    className="w-full px-6 py-4 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl font-bold transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Brief Description</label>
                <textarea 
                  value={editForm.description || ''} 
                  onChange={e => setEditForm(p => ({...p, description: e.target.value}))}
                  className="w-full px-6 py-4 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl font-bold transition-all outline-none h-24 resize-none"
                  placeholder="Tell the story of this dish..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Ingredients (comma separated)</label>
                    <input 
                      value={editForm.ingredients?.join(', ') || ''} 
                      onChange={e => handleListChange('ingredients', e.target.value)}
                      className="w-full px-6 py-4 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl font-medium text-sm transition-all outline-none"
                      placeholder="e.g. Flour, Sugar, Milk"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Allergens (comma separated)</label>
                    <input 
                      value={editForm.allergens?.join(', ') || ''} 
                      onChange={e => handleListChange('allergens', e.target.value)}
                      className="w-full px-6 py-4 bg-stone-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl font-medium text-sm transition-all outline-none"
                      placeholder="e.g. Dairy, Gluten, Nuts"
                    />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button onClick={() => setIsEditing(null)} className="flex-1 py-5 font-bold text-stone-400 hover:text-stone-900 transition-all">Discard Changes</button>
                <button 
                  onClick={handleSaveEdit}
                  className="flex-1 py-5 bg-stone-900 text-white rounded-[1.5rem] font-black shadow-2xl shadow-stone-900/20 hover:bg-orange-600 hover:shadow-orange-600/20 transition-all active:scale-95"
                >
                  Save to Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
