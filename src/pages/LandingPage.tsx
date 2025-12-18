import React from 'react';
import { Link } from 'react-router-dom';
import {
  Coffee,
  ArrowRight,
  ShoppingCart,
  ChefHat,
  Package,
  Sparkles,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  CheckCircle2,
  Waves,
  Activity,
} from 'lucide-react';
import FeatureCard from '@/components/landing/FeatureCard';

const journey = [
  { icon: ShoppingCart, title: 'Take the order', desc: 'Launch POS to add items, capture table numbers, and collect payment fast.', cta: 'Open POS', link: '/pos' },
  { icon: ChefHat, title: 'Sync with kitchen', desc: 'Tickets stream into the kitchen display with instructions highlighted.', cta: 'View Kitchen', link: '/kitchen' },
  { icon: LayoutDashboard, title: 'Steer the floor', desc: 'Monitor revenue, stock alerts, and AI insights from the dashboard.', cta: 'Go to Dashboard', link: '/dashboard' },
];

const reliability = [
  { label: 'Uptime', value: '99.98%', helper: 'Edge-cached UI and autosave fallbacks' },
  { label: 'Live sync', value: 'Sub 200ms', helper: 'Orders mirror to kitchen instantly' },
  { label: 'Recovery', value: 'Offline safe', helper: 'Drafts persist if the network blips' },
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-stone-900 rounded-xl shadow-lg">
              <Coffee className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-xl font-black tracking-tighter">ZAHA&apos;S KITCHEN</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#journey" className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
              Flow
            </a>
            <a href="#features" className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
              Features
            </a>
            <a href="#reliability" className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
              Reliability
            </a>
            <Link
              to="/dashboard"
              className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-stone-900/10"
            >
              Enter Workspace
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-36 pb-16 md:pt-48 md:pb-28 px-6 overflow-hidden">
        <div className="absolute top-14 right-[-10%] w-[50%] h-[50%] bg-orange-100/50 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[40%] h-[40%] bg-stone-200/50 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">Operations OS · v2.5</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tight leading-[0.95]">
                Command the cafe <br />from one operating system.
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-stone-500 font-medium leading-relaxed">
                Zaha&apos;s Kitchen keeps POS, kitchen, inventory, and AI reports in the same workspace so teams move faster and guests feel the difference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-10 py-5 bg-stone-900 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 group"
              >
                Launch Workspace
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/pos"
                className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-stone-200 text-stone-900 rounded-3xl font-black text-sm uppercase tracking-widest hover:border-stone-900 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Run a Test Order
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {reliability.map((item) => (
                <div key={item.label} className="p-4 bg-white/80 border border-stone-200 rounded-2xl shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">{item.label}</p>
                  <p className="text-2xl font-black text-stone-900 mt-1">{item.value}</p>
                  <p className="text-xs text-stone-500 font-semibold mt-1">{item.helper}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Ops Control</p>
                <h3 className="text-xl font-black text-stone-900">Live service status</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Waves className="w-3 h-3" />
                Stable
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Orders today</p>
                <p className="text-3xl font-black text-stone-900">124</p>
                <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
                  <ArrowRight className="w-3 h-3" /> +8% vs yesterday
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-700">Prep queue</p>
                <p className="text-3xl font-black text-stone-900">09</p>
                <p className="text-xs text-orange-700 font-semibold">Longest ticket: 7m</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Inventory</p>
                <p className="text-3xl font-black text-stone-900">4 alerts</p>
                <p className="text-xs text-stone-500 font-semibold">Auto reorder ready</p>
              </div>
            </div>
            <div className="p-6 border-t border-stone-100 bg-stone-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center font-black text-xs">1</div>
                  <div>
                    <p className="text-sm font-black text-stone-900">POS to Kitchen</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Synced instantly</p>
                  </div>
                </div>
                <Link to="/pos" className="text-xs font-bold text-orange-600 hover:text-orange-700">Open</Link>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-xs">2</div>
                  <div>
                    <p className="text-sm font-black text-stone-900">Kitchen to Ready</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Timers tracked</p>
                  </div>
                </div>
                <Link to="/kitchen" className="text-xs font-bold text-orange-600 hover:text-orange-700">View</Link>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-black text-xs">3</div>
                  <div>
                    <p className="text-sm font-black text-stone-900">Revenue + Stock</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Reports generated</p>
                  </div>
                </div>
                <Link to="/reports" className="text-xs font-bold text-orange-600 hover:text-orange-700">See</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="journey" className="py-16 md:py-24 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">The user journey</p>
              <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
                Guide guests from order to gratitude.
              </h2>
              <p className="text-stone-500 font-medium max-w-2xl">
                Every route is one tap away. Start a ticket, sync it to the kitchen, and watch reports update in real time without losing focus on the guest.
              </p>
            </div>
            <Link to="/dashboard" className="self-start px-6 py-3 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all">
              Start in Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {journey.map((item) => (
              <div key={item.title} className="bg-stone-50 rounded-2xl border border-stone-100 p-6 space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-stone-100 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-stone-900" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-stone-900">{item.title}</h3>
                  <p className="text-sm text-stone-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <Link to={item.link} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 hover:text-orange-700">
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Platform</p>
              <h2 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight">
                Precision tools for every shift.
              </h2>
              <p className="text-stone-500 font-medium">
                Built to withstand the rush: offline-safe POS, live prep timers, and inventory that never hides surprises.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-stone-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                  +12k
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={ShoppingCart} title="Fluid POS" desc="Touch-first menus, seat assignment, and payment shortcuts built for peak hours." />
            <FeatureCard
              icon={ChefHat}
              title="Smart Kitchen"
              desc="Prep timers, highlighted instructions, and color-coded queues that keep cooks calm."
              accentClassName="bg-orange-500 text-white"
            />
            <FeatureCard icon={Package} title="Precision Stock" desc="Inventory with low-stock alerts, unit awareness, and reorder cues baked in." />
            <FeatureCard
              icon={Sparkles}
              title="Gemini AI"
              desc="Ask for trends, anomalies, and actions; export insights into nightly recaps automatically."
              highlight
              badge="Insights"
            />
          </div>
        </div>
      </section>

      <section id="reliability" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/10 rounded-[3rem] -rotate-3 -z-10" />
            <div className="bg-white rounded-[3rem] shadow-2xl border border-stone-100 p-8 md:p-12 overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-stone-900 rounded-2xl">
                  <LayoutDashboard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Control center</p>
                  <h3 className="text-2xl font-black text-stone-900">Ops without guesswork</h3>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <p className="font-black text-stone-900 uppercase text-xs tracking-widest mb-1">Global menu control</p>
                    <p className="text-stone-500 text-sm font-medium">Update prices, images, and availability across all terminals instantly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <p className="font-black text-stone-900 uppercase text-xs tracking-widest mb-1">Role-based access</p>
                    <p className="text-stone-500 text-sm font-medium">Admin, Manager, and Staff permissions designed to protect revenue.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <p className="font-black text-stone-900 uppercase text-xs tracking-widest mb-1">Comprehensive reports</p>
                    <p className="text-stone-500 text-sm font-medium">Export weekly and monthly sales data for deep business analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Reliability</span>
            <h2 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight">Built to stay online.</h2>
            <p className="text-lg text-stone-500 font-medium leading-relaxed">
              The OS ships with guardrails: persistent local storage, instant sync to the kitchen, and recovery flows that keep service moving when the network falters.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <Zap className="w-10 h-10 text-stone-900 mb-4" />
                <h4 className="font-black text-stone-900 mb-2 uppercase text-xs tracking-widest">Ultra low latency</h4>
                <p className="text-stone-400 text-sm font-medium">Orders appear in the kitchen in less than 200ms.</p>
              </div>
              <div>
                <ShieldCheck className="w-10 h-10 text-stone-900 mb-4" />
                <h4 className="font-black text-stone-900 mb-2 uppercase text-xs tracking-widest">Bank-grade security</h4>
                <p className="text-stone-400 text-sm font-medium">Encrypted data paths protect payments and guests.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-stone-100 rounded-2xl border border-stone-200">
              <Activity className="w-6 h-6 text-stone-800" />
              <div>
                <p className="text-sm font-black text-stone-900">Persistent drafts</p>
                <p className="text-sm text-stone-500 font-medium">Orders, menus, and inventory autosave locally until sync is restored.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-white py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <Coffee className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-black tracking-tighter">ZAHA&apos;S OS</span>
              </div>
              <p className="text-stone-400 font-medium">The definitive operating system for modern coffee shops and restaurants worldwide.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 mb-6">Product</h5>
                <ul className="space-y-4 text-sm font-bold text-stone-300">
                  <li>
                    <Link to="/pos" className="hover:text-white transition-colors">
                      POS Studio
                    </Link>
                  </li>
                  <li>
                    <Link to="/kitchen" className="hover:text-white transition-colors">
                      Kitchen Display
                    </Link>
                  </li>
                  <li>
                    <Link to="/inventory" className="hover:text-white transition-colors">
                      Inventory
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 mb-6">Company</h5>
                <ul className="space-y-4 text-sm font-bold text-stone-300">
                  <li className="hover:text-white transition-colors cursor-pointer">Architecture</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Case Studies</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Support</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
            <p>© 2025 Zaha&apos;s Kitchen. All Rights Reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
