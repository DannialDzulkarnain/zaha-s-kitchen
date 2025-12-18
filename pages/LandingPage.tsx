
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
  CheckCircle2
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-stone-900 rounded-xl shadow-lg">
              <Coffee className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-xl font-black tracking-tighter">ZAHA'S KITCHEN</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">Features</a>
            <a href="#about" className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">System</a>
            <Link to="/dashboard" className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-stone-900/10">
              Enter Workspace
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-40 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 right-[-10%] w-[50%] h-[50%] bg-orange-100/50 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-stone-200/50 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">Next Gen Cafe OS v2.5</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-stone-900 tracking-tight leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            The Operating System for <br />
            <span className="text-stone-400 italic font-medium">Exceptional</span> Cafes.
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-500 font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-700">
            Zaha's Kitchen is a unified command center designed to synchronize your front-of-house, kitchen, and inventory with architectural precision and AI-driven intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-700">
            <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-stone-900 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 group">
              Launch Workspace
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/pos" className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-stone-200 text-stone-900 rounded-3xl font-black text-sm uppercase tracking-widest hover:border-stone-900 transition-all active:scale-95 flex items-center justify-center gap-3">
              Explore POS Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 md:py-40 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight mb-4">Master every <br />detail of your business.</h2>
              <p className="text-stone-500 font-medium">Built from the ground up to solve the specific complexities of high-volume cafe environments.</p>
            </div>
            <div className="hidden md:block">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
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
            <FeatureCard 
              icon={ShoppingCart}
              title="Fluid POS"
              desc="Intuitive touch-first interface designed for rapid service during peak hours."
            />
            <FeatureCard 
              icon={ChefHat}
              title="Smart Kitchen"
              desc="Real-time preparation tracking with detailed custom instructions for chefs."
              color="bg-orange-500"
            />
            <FeatureCard 
              icon={Package}
              title="Precision Stock"
              desc="Intelligent inventory tracking with automated low-stock alerts and history."
            />
            <FeatureCard 
              icon={Sparkles}
              title="Gemini AI"
              desc="Data analysis that provides actionable growth recommendations and trends."
              highlight
            />
          </div>
        </div>
      </section>

      {/* Role Showcase */}
      <section id="about" className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/10 rounded-[3rem] -rotate-3 -z-10" />
              <div className="bg-white rounded-[3rem] shadow-2xl border border-stone-100 p-8 md:p-12 overflow-hidden">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-stone-900 rounded-2xl">
                    <LayoutDashboard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-stone-900">Admin Control</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <p className="font-black text-stone-900 uppercase text-xs tracking-widest mb-1">Global Menu Control</p>
                      <p className="text-stone-500 text-sm font-medium">Update prices, images, and availability across all terminals instantly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <p className="font-black text-stone-900 uppercase text-xs tracking-widest mb-1">Role-Based Access</p>
                      <p className="text-stone-500 text-sm font-medium">Define granular permissions for Admin, Manager, and Staff roles.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <p className="font-black text-stone-900 uppercase text-xs tracking-widest mb-1">Comprehensive Reports</p>
                      <p className="text-stone-500 text-sm font-medium">Export weekly and monthly sales data for deep business analysis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Architecture</span>
              <h2 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight">Built for scale. <br />Driven by speed.</h2>
              <p className="text-lg text-stone-500 font-medium leading-relaxed">
                Zaha's Kitchen uses a decentralized state architecture that ensures your POS never slows down, even when generating heavy AI reports in the background.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <Zap className="w-10 h-10 text-stone-900 mb-4" />
                  <h4 className="font-black text-stone-900 mb-2 uppercase text-xs tracking-widest">Ultra Low Latency</h4>
                  <p className="text-stone-400 text-sm font-medium">Orders appear in the kitchen in less than 200ms.</p>
                </div>
                <div>
                  <ShieldCheck className="w-10 h-10 text-stone-900 mb-4" />
                  <h4 className="font-black text-stone-900 mb-2 uppercase text-xs tracking-widest">Bank-Grade Security</h4>
                  <p className="text-stone-400 text-sm font-medium">All financial and customer data is encrypted end-to-end.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <Coffee className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-black tracking-tighter">ZAHA'S OS</span>
              </div>
              <p className="text-stone-400 font-medium">The definitive operating system for modern coffee shops and restaurants worldwide.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 mb-6">Product</h5>
                <ul className="space-y-4 text-sm font-bold text-stone-300">
                   <li><Link to="/pos" className="hover:text-white transition-colors">POS Studio</Link></li>
                   <li><Link to="/kitchen" className="hover:text-white transition-colors">Kitchen Display</Link></li>
                   <li><Link to="/inventory" className="hover:text-white transition-colors">Inventory</Link></li>
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
            <p>© 2025 Zaha's Kitchen. All Rights Reserved.</p>
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

const FeatureCard = ({ icon: Icon, title, desc, highlight, color }: any) => {
  return (
    <div className={`p-8 rounded-[2.5rem] border transition-all hover:shadow-2xl hover:-translate-y-2 ${
      highlight ? 'bg-stone-900 border-stone-800 text-white' : 'bg-stone-50 border-stone-100 text-stone-900'
    }`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 shadow-lg ${color || 'bg-white text-stone-900'}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-black mb-3 tracking-tight">{title}</h3>
      <p className={`text-sm font-medium leading-relaxed ${highlight ? 'text-stone-400' : 'text-stone-500'}`}>{desc}</p>
    </div>
  );
};

export default LandingPage;
