
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Calendar, Download, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { Order, InventoryItem } from '../types';
import { getBusinessInsights } from '../geminiService';

interface ReportsProps {
  orders: Order[];
  inventory: InventoryItem[];
}

const Reports: React.FC<ReportsProps> = ({ orders, inventory }) => {
  const [aiInsights, setAiInsights] = useState<{
    salesTrend: string;
    stockWarnings: string[];
    recommendations: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Prep data for charts
  const salesByDay = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayTotal = orders
      .filter(o => new Date(o.timestamp).toDateString() === d.toDateString())
      .reduce((acc, o) => acc + o.total, 0);
    return { name: dayStr, total: dayTotal };
  });

  const categoryMix = [
    { name: 'Coffee', value: 45, color: '#f97316' },
    { name: 'Pastries', value: 25, color: '#fbbf24' },
    { name: 'Sandwiches', value: 20, color: '#22c55e' },
    { name: 'Others', value: 10, color: '#94a3b8' },
  ];

  const handleGetAiInsights = async () => {
    setLoading(true);
    const insights = await getBusinessInsights(orders, inventory);
    if (insights) setAiInsights(insights);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Analytics & Reports</h1>
          <p className="text-stone-500 mt-1">Deep dive into your cafe performance data.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-600 rounded-xl font-bold hover:bg-stone-50 transition-all">
            <Calendar className="w-5 h-5" />
            This Week
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-600 rounded-xl font-bold hover:bg-stone-50 transition-all">
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold">Revenue Trend</h3>
              <p className="text-stone-500 text-sm">Gross sales over the last 7 days</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-stone-900">${salesByDay.reduce((acc, d) => acc + d.total, 0).toFixed(2)}</p>
              <p className="text-xs text-green-500 font-bold">+14.2% from last week</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesByDay}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  cursor={{stroke: '#f97316', strokeWidth: 2}}
                />
                <Area type="monotone" dataKey="total" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Mix */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <h3 className="text-xl font-bold mb-8">Sales Mix</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryMix}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis hide />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {categoryMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-3">
            {categoryMix.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: cat.color}} />
                  <span className="text-sm text-stone-600">{cat.name}</span>
                </div>
                <span className="text-sm font-bold text-stone-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-stone-900 rounded-[2rem] p-8 lg:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sparkles className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                Powered by Gemini AI
              </div>
              <h2 className="text-4xl font-bold">Smart Business Insights</h2>
              <p className="text-stone-400 max-w-xl text-lg">Our AI analyzes your sales patterns, inventory levels, and customer behavior to provide custom recommendations for your cafe.</p>
            </div>
            {!aiInsights ? (
              <button 
                onClick={handleGetAiInsights}
                disabled={loading}
                className="px-10 py-5 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 disabled:opacity-50 flex items-center gap-3"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <TrendingUp className="w-6 h-6" />}
                {loading ? 'Analyzing Data...' : 'Generate Insights'}
              </button>
            ) : (
              <button 
                onClick={() => setAiInsights(null)}
                className="px-8 py-4 bg-stone-800 text-stone-400 font-bold rounded-2xl hover:text-white transition-all"
              >
                Reset Analysis
              </button>
            )}
          </div>

          {aiInsights && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="p-8 bg-stone-800/50 rounded-3xl border border-stone-700">
                <h4 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-4">Sales Trend</h4>
                <p className="text-lg leading-relaxed">{aiInsights.salesTrend}</p>
              </div>
              
              <div className="p-8 bg-stone-800/50 rounded-3xl border border-stone-700">
                <h4 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Stock Warnings
                </h4>
                <ul className="space-y-4">
                  {aiInsights.stockWarnings.map((warn, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <span className="text-stone-300">{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-stone-800/50 rounded-3xl border border-stone-700">
                <h4 className="text-green-400 font-bold text-sm uppercase tracking-wider mb-4">Strategic Recommendations</h4>
                <ul className="space-y-4">
                  {aiInsights.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-stone-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
