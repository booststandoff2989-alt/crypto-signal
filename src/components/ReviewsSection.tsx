import React from 'react';
import { Star, Quote, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  handle: string;
  role: string;
  profitBadge: string;
  period: string;
  text: string;
  depositGrowth: string;
}

const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Михаил Ковалев',
    handle: '@mikhail_k_trade',
    role: 'Свинг-трейдер (опыт на крипторынке 3 года)',
    profitBadge: '+146.5% к депозиту',
    period: 'За 60 дней по сигналам Pro',
    depositGrowth: '$1,200 → $2,958',
    text: 'Раньше я тратил по 6–7 часов в день на перелистывание графиков и регулярно ловил ликвидации из-за желания отыграться. PulseSignal AI полностью убрал эмоциональную составляющую: бот выдает не хаотичный спам, а 2–3 математически выверенных сетапа со строгим риск-менеджментом. Подписка окупилась уже на первой неделе.'
  },
  {
    id: 'r2',
    author: 'Денис Сергиенко',
    handle: '@den_serg_crypto',
    role: 'Внутридневной трейдер',
    profitBadge: '+89.2% чистой прибыли',
    period: 'За 45 дней использования',
    depositGrowth: '$3,500 → $6,622',
    text: 'Годовой тариф Pro Трейдер окупился ровно на третьей сделке по SOL/USDT (+24% к марже с x3 плечом). Огромный плюс — в сообщении уже указан безопасный размер входа под риск 1.5%. Не нужно вручную считать калькулятором размер позиции при высокой волатильности.'
  },
  {
    id: 'r3',
    author: 'Илья Логинов',
    handle: '@ilya_log_inv',
    role: 'Senior Software Engineer / Частный инвестор',
    profitBadge: '+62.8% стабильного прироста',
    period: 'За 3 месяца (консервативный режим)',
    depositGrowth: '$5,000 → $8,140',
    text: 'У меня full-time работа в IT, и сидеть у стакана днем просто некогда. Бот присылает пуш в Telegram с готовой лимитной сеткой. Я трачу ровно 30 секунд, чтобы выставить лимитные ордера на бирже. За 3 месяца ни одной глубокой просадки, все сделки закрываются либо по тейкам, либо в безубыток.'
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
            Верифицированные результаты участников
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Опыт трейдеров, торгующих по регламенту алгоритма
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Подлинные отзывы участников закрытого клуба с открытой статистикой доходности и защитой от рисков.
          </p>
        </div>

        {/* 3 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl p-7 bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all shadow-xl"
            >
              <div>
                {/* Header with Star Rating and Profit Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                    {rev.profitBadge}
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-400">Прирост депозита:</span>
                  <span className="font-mono font-bold text-white text-sm">{rev.depositGrowth}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    {rev.author.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      <span className="text-[11px] text-cyan-400 font-mono">{rev.handle}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{rev.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Founder Spotlight Card */}
        <div className="mt-16 rounded-3xl bg-slate-900/80 border border-white/10 p-8 sm:p-10 flex flex-col lg:flex-row items-center gap-8 shadow-2xl">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
            <img
              src="/src/assets/images/trader_profile_founder_1793899416769.jpg"
              alt="Артем Соколов, Lead Quant Developer & Архитектор PulseSignal AI"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Quote className="w-3.5 h-3.5" />
              <span>Философия команды разработчиков</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              «Прибыльный трейдинг — это не магия графиков, а хладнокровная математика вероятностей и жесткий риск-менеджмент»
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              «Большинство розничных участников теряют капитал по одной причине: они торгуют на эмоциях, поддаются панике и завышают риски. Алгоритм PulseSignal AI разрабатывался именно для того, чтобы убрать человеческий фактор. Бот не знает страха, жадности или усталости. Он входит в позицию только тогда, когда совокупный стакан, ончейн-потоки и математическое ожидание сходятся в точке выше 85%. Мы лично сопровождаем каждую сделку по этой же системе.»
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <strong className="text-white font-semibold">Артем Соколов</strong> · Lead Quant Developer & Архитектор торговой системы PulseSignal AI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
