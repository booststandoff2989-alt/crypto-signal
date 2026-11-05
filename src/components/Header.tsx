import React, { useState } from 'react';
import { Send, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenCheckout: (planId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCheckout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#06090e]/85 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element, clean display) */}
        <a 
          href="/" 
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Send className="w-4 h-4 ml-0.5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            PulseSignal<span className="text-cyan-400 font-semibold">.AI</span>
          </span>
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => scrollTo('features')} 
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Возможности
          </button>
          <button 
            onClick={() => scrollTo('demo')} 
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Демо бота
          </button>
          <button 
            onClick={() => scrollTo('stats')} 
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Статистика
          </button>
          <button 
            onClick={() => scrollTo('calculator')} 
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Калькулятор
          </button>
          <button 
            onClick={() => scrollTo('pricing')} 
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Тарифы
          </button>
          <button 
            onClick={() => scrollTo('faq')} 
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenCheckout('pro')}
            className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-md shadow-cyan-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Подключить доступ</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#06090e]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('features')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Возможности
          </button>
          <button
            onClick={() => scrollTo('demo')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Демо бота
          </button>
          <button
            onClick={() => scrollTo('stats')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Статистика
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Калькулятор прибыли
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Тарифы и цены
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-slate-200 hover:bg-slate-800/60 font-medium"
          >
            Частые вопросы
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout('pro');
              }}
              className="w-full py-3 text-center text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl"
            >
              Подключить доступ к боту
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
