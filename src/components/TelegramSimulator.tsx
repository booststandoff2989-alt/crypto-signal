import React, { useState } from 'react';
import { Send, CheckCheck, Bot, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, ArrowRight, CornerDownLeft, Lock } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  time: string;
  text?: string;
  signalData?: {
    pair: string;
    type: 'LONG' | 'SHORT';
    leverage: string;
    entry: string;
    targets: string[];
    stopLoss: string;
    riskReward: string;
    confidence: string;
    mathMetrics: string;
  };
  analysisData?: {
    asset: string;
    trend: string;
    clusterAnalysis: string;
    deltaMetrics: string;
    summary: string;
  };
  whaleData?: {
    amount: string;
    asset: string;
    from: string;
    to: string;
    implication: string;
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'user',
    time: '14:20',
    text: '/start'
  },
  {
    id: 'm2',
    sender: 'bot',
    time: '14:20',
    text: '📊 PulseSignal Quantitative System v4.2 подключена.\n\nАлгоритм в реальном времени анализирует совокупный стакан котировок (Orderbook Depth), кумулятивную дельту объемов (CVD) и ончейн-транзакции институциональных кошельков по 140+ ликвидным парам.\n\n🎯 Главный регламент: математическое ожидание R:R от 1:3.2, жесткий стоп-лосс и автоматический расчет безопасного объема под ваш баланс.\n\nПротестируйте быстрые команды из меню ниже:'
  },
  {
    id: 'm3',
    sender: 'user',
    time: '14:22',
    text: '/signals'
  },
  {
    id: 'm4',
    sender: 'bot',
    time: '14:22',
    signalData: {
      pair: 'SOL / USDT',
      type: 'LONG',
      leverage: 'x3 изолированное плечо',
      entry: '$184.20 – $186.50 (лимитный набор)',
      targets: [
        'Цель 1: $192.00 (+4.2%) → фиксация 40% и перенос стопа в БУ',
        'Цель 2: $199.50 (+8.3%) → фиксация 40% объема',
        'Цель 3: $212.00 (+15.1%) → трейлинг-тейк остатка'
      ],
      stopLoss: '$179.80 (-2.4% от средней точки входа)',
      riskReward: '1 : 3.6',
      confidence: '92.4% · Кластерное поглощение продаж на уровне $184.00',
      mathMetrics: 'Риск на капитал: ровно 1.5% · CVD разворот на 4H'
    }
  }
];

interface TelegramSimulatorProps {
  onOpenCheckout: (planId?: string) => void;
}

export const TelegramSimulator: React.FC<TelegramSimulatorProps> = ({ onOpenCheckout }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const handleCommand = (cmd: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: cmd
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (cmd.includes('/signals')) {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            time: botTime,
            signalData: {
              pair: 'ETH / USDT',
              type: 'LONG',
              leverage: 'x3 – x5 изолированное',
              entry: '$3,480 – $3,510 (сетка лимитных ордеров)',
              targets: [
                'Цель 1: $3,620 (+3.8%) · фиксация 50% и стоп в Б/У',
                'Цель 2: $3,780 (+8.2%) · фиксация 30%',
                'Цель 3: $3,950 (+13.1%) · финальный импульсный тейк'
              ],
              stopLoss: '$3,410 (-2.1% строго)',
              riskReward: '1 : 3.9',
              confidence: '91.8% · Всплеск спотового накопления + открытый интерес',
              mathMetrics: 'Институциональный приток: +$42M за 2 часа'
            }
          }
        ]);
      } else if (cmd.includes('/analyze')) {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            time: botTime,
            analysisData: {
              asset: 'BTC / Bitcoin (Perpetual)',
              trend: 'Институциональная фаза накопления (4H / 1D)',
              clusterAnalysis: 'Плотность лимитных бидов $68,200 – $68,800 ($142M)',
              deltaMetrics: 'CVD: +2,140 BTC · Funding Rate: +0.0072% (нейтральный)',
              summary: 'Сформирован устойчивый треугольник сжатия волатильности. Крупные маркет-мейкеры удерживают нижнюю границу диапазона без допущения каскадных ликвидаций. Математическая вероятность пробоя сопротивления $72,400 составляет 86%.'
            }
          }
        ]);
      } else if (cmd.includes('/whales')) {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            time: botTime,
            whaleData: {
              amount: '48,250,000 USDT ($48.25M)',
              asset: 'USDT (Tether Institutional Inflow)',
              from: 'Coinbase Custody / OTC Desk',
              to: 'Cold Storage Vault (Адрес 0x82...b9)',
              implication: 'Снятие ликвидности с биржевых горячих кошельков в долгосрочный холд. Классический опережающий триггер бычьего продолжения движения на горизонте 12–36 часов.'
            }
          }
        ]);
      } else if (cmd.includes('/risk')) {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            time: botTime,
            text: '🛡 Регламент риск-менеджмента (депозит $2,000):\n\n1. Максимально допустимый риск: 1.5% ($30 на сделку)\n2. Рекомендуемый рабочий объем: $450 (плечо x3)\n3. Stop-Loss: жесткий расчет, потеря не более -$30\n4. Первая цель (TP1): закрытие 50% объема (+$42), стоп автоматически сдвигается в безубыток (+0)\n5. Итог: даже при серии из 3 неудачных сделок просадка депозита составляет менее 4.5%, а один профитный трейд полностью перекрывает потери.'
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            time: botTime,
            text: `Команда "${cmd}" обработана. В демо-версии доступны демонстрационные сценарии. Чтобы получить постоянный закрытый доступ к прямому потоку сигналов, нажмите кнопку «Подключить полный доступ».`
          }
        ]);
      }
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const text = customInput.trim();
    setCustomInput('');
    handleCommand(text);
  };

  return (
    <section id="demo" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Интерактивный терминал бота</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Проверьте логику работы бота прямо сейчас
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Нажимайте на команды внизу эмулятора Telegram. Оцените глубину математических расчетов, точность уровней и отсутствие субъективных прогнозов.
          </p>
        </div>

        {/* Telegram Chat Container Mockup */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-[#0d1522] shadow-2xl overflow-hidden flex flex-col h-[620px]">
          {/* Telegram App Bar */}
          <div className="px-4 py-3 bg-[#17212b] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#17212b]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">PulseSignal Quant Bot</h3>
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center text-[10px] font-black">✓</span>
                </div>
                <p className="text-xs text-cyan-400">институциональный алгоритм · онлайн 24/7 · 140 пар</p>
              </div>
            </div>

            <button
              onClick={() => onOpenCheckout('pro')}
              className="text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 px-3.5 py-1.5 rounded-lg hover:brightness-110 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Подключить полный доступ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0e1621] scroll-smooth">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                    m.sender === 'user'
                      ? 'bg-[#2b5278] text-white rounded-br-none'
                      : 'bg-[#182533] text-slate-200 border border-white/5 rounded-bl-none'
                  }`}
                >
                  {m.text && (
                    <div className="whitespace-pre-line leading-relaxed font-sans text-xs sm:text-sm">
                      {m.text}
                    </div>
                  )}

                  {/* Signal Card Output */}
                  {m.signalData && (
                    <div className="space-y-2.5 font-sans">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base text-white tracking-wide">
                            🎯 {m.signalData.pair}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {m.signalData.type}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-cyan-300">
                          {m.signalData.leverage}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5">
                          <div className="text-slate-400 text-[11px]">Точка входа (сетка):</div>
                          <div className="font-semibold text-white font-mono mt-0.5">{m.signalData.entry}</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-rose-500/20">
                          <div className="text-rose-400 text-[11px]">Фиксированный Stop-Loss:</div>
                          <div className="font-semibold text-rose-300 font-mono mt-0.5">{m.signalData.stopLoss}</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5 space-y-1">
                        <div className="text-slate-400 text-[11px] font-semibold">Уровни фиксации прибыли (Take-Profit):</div>
                        {m.signalData.targets.map((tgt, idx) => (
                          <div key={idx} className="text-xs text-slate-300 font-mono flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{tgt}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-200 space-y-0.5">
                        <div className="font-semibold">Квант-верификация: {m.signalData.confidence}</div>
                        <div className="text-slate-400">{m.signalData.mathMetrics}</div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                        <span>Мат. ожидание R:R = <strong className="text-white">{m.signalData.riskReward}</strong></span>
                        <span className="text-emerald-400 font-semibold">Авто-перевод в Б/У</span>
                      </div>
                    </div>
                  )}

                  {/* Analysis Data Card */}
                  {m.analysisData && (
                    <div className="space-y-2.5 font-sans">
                      <div className="font-bold text-white flex items-center gap-2 border-b border-white/10 pb-1.5 text-xs sm:text-sm">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span>Квантовый скринер: {m.analysisData.asset}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-900/60 rounded-lg">
                          <span className="text-slate-400 text-[10px]">Структура рынка:</span>
                          <p className="text-emerald-400 font-semibold mt-0.5">{m.analysisData.trend}</p>
                        </div>
                        <div className="p-2 bg-slate-900/60 rounded-lg">
                          <span className="text-slate-400 text-[10px]">Дельта и Funding:</span>
                          <p className="text-white font-mono mt-0.5">{m.analysisData.deltaMetrics}</p>
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900/60 rounded-lg text-xs">
                        <span className="text-slate-400 text-[10px]">Кластерные объемы:</span>
                        <p className="text-cyan-300 font-mono mt-0.5">{m.analysisData.clusterAnalysis}</p>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-white/5">
                        {m.analysisData.summary}
                      </p>
                    </div>
                  )}

                  {/* Whale Data Card */}
                  {m.whaleData && (
                    <div className="space-y-2 font-sans">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5 border-b border-white/10 pb-1.5 text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span>ON-CHAIN WHALE RADAR · Институциональный перевод</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div>Сумма: <span className="font-mono font-bold text-white">{m.whaleData.amount}</span></div>
                        <div className="text-slate-400 text-[11px]">Источник: {m.whaleData.from}</div>
                        <div className="text-slate-400 text-[11px]">Получатель: {m.whaleData.to}</div>
                        <div className="p-2 bg-slate-900/80 rounded border border-amber-500/20 text-slate-300 text-[11px] mt-1 leading-relaxed">
                          💡 <strong>Интерпретация модели:</strong> {m.whaleData.implication}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timestamp and Checkmarks */}
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                    <span>{m.time}</span>
                    {m.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-sky-400" />}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-[#182533] px-3.5 py-2 rounded-xl rounded-bl-none w-fit border border-white/5">
                <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>PulseSignal Quant вычисляет уровни</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}
          </div>

          {/* Quick Command Bar */}
          <div className="p-2.5 bg-[#17212b] border-t border-white/5 space-y-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-slate-400 text-[11px] whitespace-nowrap pl-1">Команды бота:</span>
              <button
                onClick={() => handleCommand('/signals')}
                className="px-3 py-1.5 rounded-lg bg-[#242f3d] hover:bg-[#2b3a4d] text-cyan-300 border border-cyan-500/30 whitespace-nowrap font-mono transition-colors"
              >
                /signals (Свежий сетап)
              </button>
              <button
                onClick={() => handleCommand('/analyze BTC')}
                className="px-3 py-1.5 rounded-lg bg-[#242f3d] hover:bg-[#2b3a4d] text-cyan-300 border border-cyan-500/30 whitespace-nowrap font-mono transition-colors"
              >
                /analyze BTC (Стакан и CVD)
              </button>
              <button
                onClick={() => handleCommand('/whales')}
                className="px-3 py-1.5 rounded-lg bg-[#242f3d] hover:bg-[#2b3a4d] text-cyan-300 border border-cyan-500/30 whitespace-nowrap font-mono transition-colors"
              >
                /whales (Радар китов)
              </button>
              <button
                onClick={() => handleCommand('/risk 2000$')}
                className="px-3 py-1.5 rounded-lg bg-[#242f3d] hover:bg-[#2b3a4d] text-cyan-300 border border-cyan-500/30 whitespace-nowrap font-mono transition-colors"
              >
                /risk 2000$ (Расчет лота)
              </button>
            </div>

            {/* Custom text input */}
            <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Введите команду /signals, /whales или вопрос..."
                className="flex-1 bg-[#242f3d] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                aria-label="Отправить запрос в терминал"
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
