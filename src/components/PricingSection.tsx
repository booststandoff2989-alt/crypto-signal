import React, { useState } from 'react';
import { Check, Zap, ShieldCheck, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { PRICING_PLANS, PricingPlan } from '../utils/pricing';

interface PricingSectionProps {
  onOpenCheckout: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenCheckout }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="pricing" className="py-24 relative bg-slate-950/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
            Инвестиция в системную прибыль
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Прозрачные тарифы со строгой гарантией окупаемости
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Стоимость доступа полностью окупается в среднем за 2–3 успешных сетапа при стандартном депозите от $500–$1,000.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Помесячная оплата
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Годовая подписка</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                СКИДКА -28%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;
            const price = plan.oneTimePrice 
              ? plan.oneTimePrice 
              : billingCycle === 'annual' 
                ? plan.annualMonthlyPrice 
                : plan.baseMonthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-slate-900/95 border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20 lg:-translate-y-2'
                    : 'bg-slate-900/60 border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular or Lifetime Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-md ${
                        isPopular
                          ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <span className="text-xs font-mono text-cyan-400">{plan.signalsPerDay}</span>
                  </div>

                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
                      ${price}
                    </span>
                    <span className="text-slate-400 text-sm">
                      {plan.oneTimePrice ? 'навсегда' : '/ месяц'}
                    </span>
                  </div>

                  {/* Payback badge */}
                  <div className="mb-5 inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    <span>⚡</span>
                    <span>{plan.paybackEstimate}</span>
                  </div>

                  {billingCycle === 'annual' && !plan.oneTimePrice && (
                    <div className="text-xs text-slate-400 mb-5 font-mono">
                      Счет ${plan.annualTotalPrice} выставляется ежегодно (чистая экономия ${(plan.baseMonthlyPrice * 12) - plan.annualTotalPrice})
                    </div>
                  )}

                  {plan.oneTimePrice && (
                    <div className="text-xs text-purple-300 mb-5">
                      Единоразовый платеж · Никаких автоматических списаний
                    </div>
                  )}

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Что входит в регламент тарифа:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                  <button
                    onClick={() => onOpenCheckout(plan.id)}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 shadow-cyan-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
                    }`}
                  >
                    <Zap className={`w-4 h-4 ${isPopular ? 'fill-slate-950' : 'text-cyan-400'}`} />
                    <span>Подключить {plan.name}</span>
                  </button>

                  <div className="text-center text-[11px] text-slate-400">
                    Мгновенная выдача ключа активации в Telegram
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 14-day Rigorous Guarantee Box */}
        <div className="mt-16 max-w-3xl mx-auto rounded-2xl bg-slate-900/60 border border-emerald-500/30 p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Безоговорочная 14-дневная гарантия возврата 100% средств</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Мы уверены в математическом ожидании нашей системы. Если в течение первых 14 дней следование сетапам бота с соблюдением регламента риска не принесет вам запланированного результата — напишите в службу поддержки (@PulseSignalSupport), и мы вернем 100% стоимости подписки в течение 24 часов без скрытых комиссий и лишних вопросов.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
