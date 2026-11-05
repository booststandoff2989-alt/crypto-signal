import React from 'react';
import { Cpu, Radar, ShieldAlert, BellRing, Webhook, CheckCircle2, BarChart3, Lock } from 'lucide-react';

export const FeaturesBento: React.FC = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
            Математическая архитектура
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Почему алгоритм защищает депозит там, где другие его сливают
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Мы исключили эмоции, интуитивные прогнозы и бессистемные входы. Каждый сигнал формируется на стыке глубокого стаканного анализа, ончейн-следов институционалов и жесткого расчета мат. ожидания.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Marquee 2-col span with radar image */}
          <div className="md:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-cyan-500/30 transition-all">
            <div className="relative z-10 max-w-xl">
              <div className="text-xs font-mono text-cyan-400 mb-2">
                01. Институциональный радар ликвидности
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                Детекция скрытых наборов позиций маркет-мейкеров
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Бот отслеживает прямые транзакции в сетях Bitcoin, Ethereum, Solana и Arbitrum. Когда смарт-мани аккумулируют монеты через внебиржевые (OTC) шлюзы или выводят стейблкоины с бирж в холодные хранилища, алгоритм идентифицирует дисбаланс предложения за 20–40 минут до импульса в графике.
              </p>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Непрерывный мониторинг 4,500+ маркированных институциональных кошельков</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Алгоритмическая фильтрация фиктивных внутрибиржевых объемов (Wash-Trading)</span>
                </div>
              </div>
            </div>

            {/* Radar visual embed */}
            <div className="mt-6 rounded-xl overflow-hidden border border-white/10 bg-slate-950">
              <img
                src="/src/assets/images/bot_analytics_radar_1793899414555.jpg"
                alt="On-chain radar analysis"
                referrerPolicy="no-referrer"
                className="w-full h-48 sm:h-64 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2: AI Pattern Filter */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-cyan-400 mb-2">
                02. Фильтрация рыночного шума
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                Отсечение ложных пробоев и сквизов
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Большинство трейдеров отдают депозит на искусственных манипуляциях и охоте за стопами. Нейросетевая модель сопоставляет кумулятивную дельту (CVD) с динамикой открытого интереса (OI), исключая входы в фальшивые импульсы.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Точность отсечения шума:</span>
              <span className="font-mono font-bold text-emerald-400">92.6% эффективность</span>
            </div>
          </div>

          {/* Card 3: Risk Management Engine */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-emerald-400 mb-2">
                03. Бескомпромиссный риск-контроль
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                Математический R:R от 1:3.2 и нулевой риск ликвидации
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Никакого мартингейла или эмоциональных усреднений в просадке. Сигнал строго регламентирует объем входа не более 1.5% от депозита. При взятии TP1 стоп-лосс немедленно переносится в безубыток, защищая полученный результат.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Мин. мат. ожидание R:R:</span>
              <span className="font-mono font-bold text-white">1 : 3.2</span>
            </div>
          </div>

          {/* Card 4: Lightning Notifications */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5">
                <BellRing className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-sky-400 mb-2">
                04. Telegram WebApp & Пуш
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                Мгновенное исполнение в 2 клика без задержек
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Вам не нужно сидеть часами перед терминалом. Сообщение в Telegram содержит интерактивные кнопки с готовым расчетом сетки ордеров для Binance, Bybit и OKX. Вход в позицию занимает 30 секунд.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Задержка доставки сигнала:</span>
              <span className="font-mono font-bold text-cyan-400">&lt; 1,200 мс</span>
            </div>
          </div>

          {/* Card 5: Webhook & Auto-Trade */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5">
                <Lock className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-purple-400 mb-2">
                05. Безопасность средств
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                Автоматизация без передачи ваших средств
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ваши активы всегда остаются на вашем биржевом счете. Подключение авто-копирования происходит через официальные API-ключи исключительно с правами "Read / Trade". Право на вывод средств аппаратно заблокировано биржей.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Стандарт безопасности:</span>
              <span className="font-mono font-bold text-emerald-400">Вывод заблокирован на уровне API</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
