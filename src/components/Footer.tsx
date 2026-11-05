import React, { useState } from 'react';
import { Send, Shield, X, HelpCircle, FileText } from 'lucide-react';

interface FooterProps {
  onOpenCheckout: (planId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCheckout }) => {
  const [showGuaranteeModal, setShowGuaranteeModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03060a] border-t border-white/5 py-14 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Wordmark & info */}
          <div className="space-y-3 md:col-span-1">
            <a href="/" className="flex items-center gap-2 text-white font-extrabold text-lg">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </div>
              <span>PulseSignal<span className="text-cyan-400 font-semibold">.AI</span></span>
            </a>
            <p className="text-slate-300 leading-relaxed text-xs">
              Институциональная система алгоритмического анализа рынков, кластерных объемов и генерации торговых сигналов в Telegram.
            </p>
            <div className="text-[11px] text-slate-400">
              Официальный бот: <a href="https://t.me/PulseSignalOfficialBot" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-mono hover:underline">@PulseSignalOfficialBot</a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <div className="text-white font-bold text-xs uppercase tracking-wider">Навигация по разделам</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('features')} className="hover:text-cyan-400 transition-colors">
                  Архитектура и возможности
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('demo')} className="hover:text-cyan-400 transition-colors">
                  Интерактивный терминал бота
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('stats')} className="hover:text-cyan-400 transition-colors">
                  Верифицированная статистика
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calculator')} className="hover:text-cyan-400 transition-colors">
                  Калькулятор окупаемости
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tariffs & Security */}
          <div className="space-y-2.5">
            <div className="text-white font-bold text-xs uppercase tracking-wider">Регламенты и безопасность</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('pricing')} className="hover:text-cyan-400 transition-colors">
                  Тарифные планы и окупаемость
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCheckout('lifetime')} className="hover:text-cyan-400 transition-colors">
                  Lifetime VIP Синдикат
                </button>
              </li>
              <li>
                <button onClick={() => setShowGuaranteeModal(true)} className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 text-emerald-400">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Регламент гарантии 14 дней</span>
                </button>
              </li>
              <li>
                <button onClick={() => setShowRiskModal(true)} className="hover:text-cyan-400 transition-colors text-left text-slate-400">
                  Политика допустимых рисков
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-2.5">
            <div className="text-white font-bold text-xs uppercase tracking-wider">Поддержка и связь</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Дежурная линия поддержки и квант-аналитики работает круглосуточно.
            </p>
            <a
              href="https://t.me/PulseSignalSupport"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-xs pt-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram: @PulseSignalSupport</span>
            </a>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="pt-8 border-t border-white/5 space-y-3 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">Официальное предупреждение о рисках:</strong> Торговля деривативами, криптовалютами и высоколиквидными финансовыми инструментами сопряжена с существенным риском рыночной волатильности. Прошлые результаты алгоритмов и исторический винрейт не гарантируют идентичных результатов в будущем. Все аналитические материалы, ончейн-алерты и сигналы носят исключительно информационно-математический характер и не являются индивидуальной финансовой рекомендацией.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 pt-2 gap-2">
            <div>
              © {new Date().getFullYear()} PulseSignal AI Quantitative Technologies. Все права защищены.
            </div>
            <div>
              Системный квант-трейдинг с жестким контролем рисков в Telegram
            </div>
          </div>
        </div>
      </div>

      {/* 14-day Guarantee Regulation Modal */}
      {showGuaranteeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0b121d] border border-cyan-500/30 p-6 text-slate-200 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Shield className="w-5 h-5" />
                <span>Официальный регламент 100% гарантии (14 дней)</span>
              </div>
              <button
                onClick={() => setShowGuaranteeModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs space-y-2.5 text-slate-300 leading-relaxed font-sans">
              <p>
                1. <strong>Период действия:</strong> Гарантия действует ровно 14 календарных дней с момента подтверждения оплаты любого тарифа (Базовый Квант, Pro Трейдер или Lifetime VIP).
              </p>
              <p>
                2. <strong>Условие возврата:</strong> Если участник соблюдал регламент риск-менеджмента (не превышал риск 1.5% на сделку и выставлял указанные стоп-лоссы) и считает, что полученный результат не соответствует математическому ожиданию, мы производим возврат 100% средств.
              </p>
              <p>
                3. <strong>Порядок выплаты:</strong> Возврат осуществляется в течение 24 часов после обращения в службу поддержки @PulseSignalSupport тем же способом, которым была совершена оплата.
              </p>
            </div>
            <button
              onClick={() => setShowGuaranteeModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
            >
              Понятно, закрыть
            </button>
          </div>
        </div>
      )}

      {/* Risk Policy Modal */}
      {showRiskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0b121d] border border-cyan-500/30 p-6 text-slate-200 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <FileText className="w-5 h-5" />
                <span>Политика допустимых рисков и мани-менеджмента</span>
              </div>
              <button
                onClick={() => setShowRiskModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs space-y-2.5 text-slate-300 leading-relaxed font-sans">
              <p>
                • <strong>Лимит риска:</strong> Ни одна сделка не должна превышать 1.5% от общего капитала.
              </p>
              <p>
                • <strong>Правило фиксации:</strong> При достижении Цели 1 (TP1) стоп-лосс немедленно переводится в точку безубытка.
              </p>
              <p>
                • <strong>Запрет мартингейла:</strong> Алгоритм категорически запрещает усреднение против тренда при нахождении позиции в просадке.
              </p>
            </div>
            <button
              onClick={() => setShowRiskModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
