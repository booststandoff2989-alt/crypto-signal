import React from 'react';
import { ShieldCheck, Play, ArrowRight, Zap, CheckCircle2, TrendingUp, Clock, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onOpenCheckout: (planId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-10 pb-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top institutional update badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/95 border border-cyan-500/30 text-xs font-medium text-cyan-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Квант-модель v4.2 · Кластерный анализ объемов и ончейн-радар</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold">Окупаемость за 2–3 сетапа</span>
          </div>
        </div>

        {/* Hero 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Институциональная торговая система в вашем Telegram: <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">защита капитала</span> и вход в сделки без 8 часов перед монитором
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Алгоритмический бот <strong>PulseSignal AI</strong> непрерывно сканирует книгу ордеров и ончейн-потоки смарт-мани на 140+ парах. Вы получаете выверенные математические точки входа с расчетом лота под ваш баланс, строгим соотношением прибыли к риску от 1:3 и фиксацией в безубыток.
            </p>

            {/* Quick value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Экономия до 4–6 часов экранного времени в день</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Защита от ликвидаций: риск строго 1.5% на сделку</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Окупаемость подписки за 2–3 подтвержденных сетапа</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% гарантия возврата средств в течение 14 дней</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenCheckout('pro')}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-xl shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-slate-950" />
                <span>Подключить доступ к боту</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <button
                onClick={() => scrollTo('demo')}
                className="w-full sm:w-auto px-6 py-4 text-base font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Протестировать демо в Telegram</span>
              </button>
            </div>

            {/* Micro social proof under CTA */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-cyan-600 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">MK</div>
                <div className="w-7 h-7 rounded-full bg-emerald-600 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">DS</div>
                <div className="w-7 h-7 rounded-full bg-blue-600 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">IL</div>
                <div className="w-7 h-7 rounded-full bg-purple-600 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">+12k</div>
              </div>
              <div>
                <span className="text-white font-medium">12,840+ трейдеров и инвесторов</span> доверяют алгоритму в Telegram
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl shadow-cyan-950/40 group">
              <img
                src="/src/assets/images/hero_telegram_bot_crypto_1793899414048.jpg"
                alt="PulseSignal AI Institutional Quantitative Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Floating Live Signal Bubble */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">BTC / USDT · КВАНТ-СВИНГ</span>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        ФИНАЛЬНЫЙ ТЕЙК TP3
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Лимитный вход: $67,420 · Тейк: $71,200 (<span className="text-emerald-400 font-bold">+18.4% к марже</span>, R:R 1:3.6)
                    </div>
                  </div>
                </div>
                <div className="text-right text-[10px] text-slate-400 hidden sm:block">
                  <span className="font-mono text-cyan-400">Верифицировано</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Bar below Hero */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-sm text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text font-mono tabular-nums">
              87.4%
            </div>
            <div className="mt-1 text-xs sm:text-sm text-slate-200 font-semibold">
              Верифицированный винрейт
            </div>
            <div className="text-[11px] text-slate-400">380+ закрытых квант-сетапов</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-sm text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              12,840+
            </div>
            <div className="mt-1 text-xs sm:text-sm text-slate-200 font-semibold">
              Действующих трейдеров
            </div>
            <div className="text-[11px] text-slate-400">В основном канале бота</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-sm text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tabular-nums">
              1.2 сек
            </div>
            <div className="mt-1 text-xs sm:text-sm text-slate-200 font-semibold">
              Скорость доставки алерта
            </div>
            <div className="text-[11px] text-slate-400">Высокоскоростной Telegram API</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-sm text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums">
              0
            </div>
            <div className="mt-1 text-xs sm:text-sm text-slate-200 font-semibold">
              Ликвидаций депозита
            </div>
            <div className="text-[11px] text-slate-400">При соблюдении регламента риска</div>
          </div>
        </div>

        {/* Supported Exchanges & Ecosystem */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
            Официальная интеграция котировок и торговых шлюзов
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-sm font-semibold">
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>BINANCE SPOT & FUTURES</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span>BYBIT DERIVATIVES</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>OKX UNIFIED</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>BITGET PERPETUAL</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>TELEGRAM WEBAPP V2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
