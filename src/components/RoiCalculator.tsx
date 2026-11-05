import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { calculateRoi, STRATEGY_TIERS } from '../utils/pricing';

interface RoiCalculatorProps {
  onOpenCheckout: (planId?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenCheckout }) => {
  const [deposit, setDeposit] = useState<number>(1000);
  const [strategy, setStrategy] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [months, setMonths] = useState<number>(3);
  const [compound, setCompound] = useState<boolean>(true);

  const roi = calculateRoi(deposit, months, strategy, compound);
  const activeStrategy = STRATEGY_TIERS[strategy];

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/5 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Математическое моделирование доходности</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Рассчитайте потенциальный прирост капитала по стратегии
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Моделирование строится на базе статистического мат. ожидания закрытых сетапов за предыдущие 380+ сделок с учетом жесткого риск-контроля.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* Deposit Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="deposit-slider" className="text-sm font-semibold text-slate-200">
                    Рабочий торговый депозит:
                  </label>
                  <div className="flex items-center gap-1 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-white/10 font-mono font-bold text-lg text-cyan-400">
                    <span>${deposit.toLocaleString()}</span>
                  </div>
                </div>

                <input
                  id="deposit-slider"
                  type="range"
                  min="200"
                  max="15000"
                  step="100"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  aria-label="Сумма стартового депозита в долларах"
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>$200</span>
                  <span>$5,000</span>
                  <span>$10,000</span>
                  <span>$15,000</span>
                </div>
              </div>

              {/* Strategy selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2.5">
                  Режим риск-менеджмента:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setStrategy('conservative')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      strategy === 'conservative'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">Консервативная</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-1">8–14% / мес</div>
                  </button>

                  <button
                    onClick={() => setStrategy('balanced')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      strategy === 'balanced'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">Сбалансированная</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-1">16–24% / мес</div>
                  </button>

                  <button
                    onClick={() => setStrategy('aggressive')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      strategy === 'aggressive'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">Импульсная</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-1">28–42% / мес</div>
                  </button>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  {activeStrategy.riskDescription}
                </p>
              </div>

              {/* Horizon / Months selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2.5">
                  Горизонт следования сигналам:
                </label>
                <div className="flex gap-2">
                  {[1, 3, 6, 12].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        months === m
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-950/60 border-white/5 text-slate-300 hover:text-white'
                      }`}
                    >
                      {m} {m === 1 ? 'месяц' : m <= 4 ? 'месяца' : 'месяцев'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reinvestment Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
                <div>
                  <div className="text-xs font-semibold text-white">Реинвестирование прибыли (сложный процент)</div>
                  <div className="text-[11px] text-slate-400">Прибыль автоматически учитывается в расчете объема следующих сетапов</div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={compound}
                  aria-label="Включить реинвестирование прибыли"
                  onClick={() => setCompound(!compound)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    compound ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      compound ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right Column: Output Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950 to-[#0b1320] border border-cyan-500/20 text-center space-y-6 shadow-xl">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Прогнозируемый баланс через {months} мес.
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
                  ${roi.finalBalance.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Расчетная чистая прибыль:</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">
                    +${roi.projectedProfit.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Средний месячный прирост:</span>
                  <span className="text-cyan-400 font-mono font-semibold">
                    ~${roi.monthlyAverage.toLocaleString()} / мес
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Математический винрейт:</span>
                  <span className="text-white font-mono font-semibold">
                    {roi.winRate}% подтвержденных
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenCheckout('pro')}
                className="w-full py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Запустить системный трейдинг с этим депозитом</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Официальная 14-дневная гарантия возврата стоимости</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
