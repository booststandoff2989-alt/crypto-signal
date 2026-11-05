import React, { useState } from 'react';
import { ChevronDown, MessageCircle, ShieldCheck } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'f1',
    question: 'Нужен ли мне профессиональный опыт для торговли по сигналам?',
    answer: 'Нет. Алгоритм спроектирован так, чтобы сетапы мог исполнять даже начинающий участник рынка. В каждом алерте указана точная торговая пара, тип ордера (лимитный набор), допустимое кредитное плечо, диапазон входа, 3 цели фиксации прибыли (Take Profit) и жесткий уровень ограничения риска (Stop Loss). Также сразу после подключения вы получаете видео-инструкцию по выставлению сеток ордеров на Binance, Bybit и OKX.'
  },
  {
    id: 'f2',
    question: 'Как быстро активируется доступ к боту после подтверждения оплаты?',
    answer: 'Мгновенно в автоматическом режиме. Сразу после оплаты на экране отображается ваш уникальный персональный токен активации (например, PULSE-UV5F-2A2D) и прямая ссылка на Telegram-бота @PulseSignalBot. Вы нажимаете команду /start, отправляете сгенерированный токен, и система за 3 секунды привязывает ваш аккаунт к закрытому каналу сигналов и аналитики.'
  },
  {
    id: 'f3',
    question: 'С какими торговыми площадками и терминалами работает бот?',
    answer: 'Котировки и ликвидность синхронизируются с крупнейшими мировыми биржами: Binance Spot & Futures, Bybit Derivatives, OKX Unified, Bitget Perpetual и Gate.io. Вы можете открывать сделки вручную на абсолютно любой бирже или подключить автоматическое копирование ордеров через официальный защищенный API-шлюз.'
  },
  {
    id: 'f4',
    question: 'Насколько безопасно подключать API биржи к автоматизации?',
    answer: 'Безопасность ваших средств гарантирована на 100%. При генерации API-ключа на бирже вы активируете только два разрешения: "Чтение рыночных данных" (Read) и "Исполнение спотовых/фьючерсных ордеров" (Trade). Разрешение на "Вывод средств" (Withdrawal) аппаратно деактивировано и запрещено. Ни бот, ни разработчики физически не имеют технической возможности вывести ваши деньги.'
  },
  {
    id: 'f5',
    question: 'Какой минимальный депозит рекомендуется для старта?',
    answer: 'Рекомендуемый комфортный депозит для начала работы составляет от $200 до $500. Бот автоматически рассчитывает позицию так, чтобы потенциальный риск на одну сделку не превышал 1.5% от вашего фактического капитала. При таком подходе вероятность глубоких просадок математически сведена к минимуму.'
  },
  {
    id: 'f6',
    question: 'Как работает 100% гарантия возврата средств в течение 14 дней?',
    answer: 'Если в течение первых 14 дней после покупки вы решите, что формат или результаты работы бота вам не подходят — напишите в нашу службу поддержки в Telegram (@PulseSignalSupport). Мы вернем 100% стоимости подписки в течение 24 часов на ту же карту или криптокошелек без удержания комиссий и лишних вопросов.'
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 relative bg-slate-950/40 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
            Регламент и ответы на вопросы
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Все, что необходимо знать перед подключением к боту
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Подробные ответы на главные вопросы по безопасности, алгоритму и гарантиям.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg'
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-white">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-cyan-500 text-slate-950' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/5 font-sans">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 sm:p-7 rounded-2xl bg-slate-900/50 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-left">
            <h4 className="font-bold text-white text-base">Нужна персональная консультация по выбору тарифа?</h4>
            <p className="text-xs text-slate-300 mt-1">Дежурный квант-аналитик отвечает в Telegram в среднем за 5–10 минут</p>
          </div>
          <a
            href="https://t.me/PulseSignalSupport"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Написать в @PulseSignalSupport</span>
          </a>
        </div>
      </div>
    </section>
  );
};
