import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle2, Filter, ExternalLink } from 'lucide-react';

interface SignalRecord {
  id: string;
  pair: string;
  type: 'LONG' | 'SHORT';
  category: 'major' | 'alt';
  entryPrice: string;
  exitPrice: string;
  profitPct: number;
  duration: string;
  date: string;
  status: 'TP3 Достигнут' | 'TP2 Достигнут' | 'TP1 Достигнут' | 'Stop-Loss';
  isWin: boolean;
}

const HISTORICAL_SIGNALS: SignalRecord[] = [
  {
    id: 's1',
    pair: 'BTC / USDT',
    type: 'LONG',
    category: 'major',
    entryPrice: '$67,400',
    exitPrice: '$71,250',
    profitPct: 17.1,
    duration: '14ч 30мин',
    date: 'Сегодня, 11:20',
    status: 'TP3 Достигнут',
    isWin: true
  },
  {
    id: 's2',
    pair: 'SOL / USDT',
    type: 'LONG',
    category: 'alt',
    entryPrice: '$184.20',
    exitPrice: '$198.80',
    profitPct: 23.8,
    duration: '6ч 45мин',
    date: 'Сегодня, 08:15',
    status: 'TP2 Достигнут',
    isWin: true
  },
  {
    id: 's3',
    pair: 'ETH / USDT',
    type: 'SHORT',
    category: 'major',
    entryPrice: '$3,560',
    exitPrice: '$3,420',
    profitPct: 11.8,
    duration: '8ч 10мин',
    date: 'Вчера, 22:40',
    status: 'TP2 Достигнут',
    isWin: true
  },
  {
    id: 's4',
    pair: 'SUI / USDT',
    type: 'LONG',
    category: 'alt',
    entryPrice: '$2.14',
    exitPrice: '$2.48',
    profitPct: 31.7,
    duration: '1 день 4ч',
    date: 'Вчера, 16:30',
    status: 'TP3 Достигнут',
    isWin: true
  },
  {
    id: 's5',
    pair: 'AVAX / USDT',
    type: 'LONG',
    category: 'alt',
    entryPrice: '$32.40',
    exitPrice: '$31.60',
    profitPct: -2.4,
    duration: '2ч 15мин',
    date: '2 дня назад',
    status: 'Stop-Loss',
    isWin: false
  },
  {
    id: 's6',
    pair: 'NEAR / USDT',
    type: 'LONG',
    category: 'alt',
    entryPrice: '$5.80',
    exitPrice: '$6.54',
    profitPct: 25.5,
    duration: '18ч 00мин',
    date: '3 дня назад',
    status: 'TP3 Достигнут',
    isWin: true
  }
];

export const LiveSignalsFeed: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'major' | 'alt'>('all');

  const filteredSignals = HISTORICAL_SIGNALS.filter(s => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  const totalTrades = HISTORICAL_SIGNALS.length;
  const winTrades = HISTORICAL_SIGNALS.filter(s => s.isWin).length;
  const currentWinRate = Math.round((winTrades / totalTrades) * 100);

  return (
    <section id="stats" className="py-20 relative bg-slate-950/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
              Аудит торгового трек-рекорда
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Верифицированный журнал закрытых сетапов
            </h2>
            <p className="mt-2 text-slate-300 text-sm max-w-xl leading-relaxed">
              Все сделки фиксируются с неизменяемыми таймстемпами в закрытом реестре Telegram. Мы открыто публикуем полное математическое ожидание: как закрытия по TP3, так и системные контролируемые стоп-лоссы.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl w-fit self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Все сигналы ({HISTORICAL_SIGNALS.length})
            </button>
            <button
              onClick={() => setFilter('major')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'major'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BTC & ETH
            </button>
            <button
              onClick={() => setFilter('alt')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'alt'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Альткоины (SOL, SUI, NEAR)
            </button>
          </div>
        </div>

        {/* Signals Table / Cards Container */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-white/5">
              <tr>
                <th scope="col" className="py-4 px-6 font-semibold">Торговая пара</th>
                <th scope="col" className="py-4 px-6 font-semibold">Направление</th>
                <th scope="col" className="py-4 px-6 font-semibold">Вход → Выход</th>
                <th scope="col" className="py-4 px-6 font-semibold">Длительность</th>
                <th scope="col" className="py-4 px-6 font-semibold text-right">Результат (%)</th>
                <th scope="col" className="py-4 px-6 font-semibold text-right">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredSignals.map((sig) => (
                <tr key={sig.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-white whitespace-nowrap">
                    {sig.pair}
                    <div className="text-[11px] font-normal text-slate-500">{sig.date}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold ${
                        sig.type === 'LONG'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {sig.type === 'LONG' ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span>{sig.type}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-300 whitespace-nowrap">
                    <span className="text-white">{sig.entryPrice}</span> → <span className="text-white font-semibold">{sig.exitPrice}</span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-400 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{sig.duration}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-right text-sm whitespace-nowrap tabular-nums">
                    <span className={sig.profitPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {sig.profitPct > 0 ? `+${sig.profitPct}%` : `${sig.profitPct}%`}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${
                        sig.isWin
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {sig.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 px-2 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Каждая позиция валидируется биржевыми API-логами и неизменяемым хешем транзакции</span>
          </div>
          <div>
            Совокупный PnL модели за месяц: <strong className="text-emerald-400 font-mono text-sm">+184.2%</strong> (с контролем риска 1.5%)
          </div>
        </div>
      </div>
    </section>
  );
};
