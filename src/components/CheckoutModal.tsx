import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, Copy, CheckCheck, Send, Sparkles, CreditCard, QrCode, Coins, Globe, Lock } from 'lucide-react';
import { PRICING_PLANS, normalizeTelegramHandle, applyPromoCode, generateActivationKey } from '../utils/pricing';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId
}) => {
  const [currentPlanId, setCurrentPlanId] = useState<string>(selectedPlanId || 'pro');
  const [telegramInput, setTelegramInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ discountPct: number; message: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card_ru' | 'crypto' | 'card_intl'>('sbp');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const plan = PRICING_PLANS.find(p => p.id === currentPlanId) || PRICING_PLANS[1];
  const basePrice = plan.oneTimePrice ? plan.oneTimePrice : plan.annualMonthlyPrice;
  const discountAmount = appliedPromo ? Math.round(basePrice * (appliedPromo.discountPct / 100)) : 0;
  const finalPrice = Math.max(1, basePrice - discountAmount);

  const handleApplyPromo = () => {
    if (!promoCodeInput.trim()) return;
    const res = applyPromoCode(promoCodeInput, basePrice);
    if (res.isValid) {
      setAppliedPromo({ discountPct: res.discountPct, message: res.message });
      setErrorMsg('');
    } else {
      setAppliedPromo(null);
      setErrorMsg(res.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const validation = normalizeTelegramHandle(telegramInput);
    if (!validation.isValid) {
      setErrorMsg(validation.error || 'Укажите корректный Telegram username');
      return;
    }

    if (!emailInput || !emailInput.includes('@')) {
      setErrorMsg('Пожалуйста, укажите действительный e-mail для отправки электронного чека и резервного токена');
      return;
    }

    setIsProcessing(true);
    // Simulate secure payment processing flow
    setTimeout(() => {
      setIsProcessing(false);
      const code = generateActivationKey(telegramInput + emailInput);
      setActivationCode(code);
      setIsSuccess(true);
    }, 1200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0b121d] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть окно оформления подписки"
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Официальное подключение
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                Активация доступа к PulseSignal AI Bot
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Мгновенная выдача ключа авторизации после подтверждения платежа
              </p>
            </div>

            {/* Plan selection pills */}
            <div className="grid grid-cols-3 gap-2 mb-6 p-1.5 rounded-2xl bg-slate-950 border border-white/5">
              {PRICING_PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setCurrentPlanId(p.id);
                    setAppliedPromo(null);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    currentPlanId === p.id
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <div>{p.name}</div>
                  <div className="text-[11px] font-mono mt-0.5">
                    ${p.oneTimePrice || p.annualMonthlyPrice}
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Telegram Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Ваш действующий Telegram Username:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
                    @
                  </div>
                  <input
                    type="text"
                    required
                    value={telegramInput.startsWith('@') ? telegramInput.slice(1) : telegramInput}
                    onChange={(e) => setTelegramInput(e.target.value)}
                    placeholder="ваш_telegram_username"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  К этому аккаунту будет привязан персональный шлюз бота
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  E-mail для чека и резервной копии ключа:
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Promo Code Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Промокод специального предложения (если есть):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    placeholder="Например: TELEGRAM20"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
                  >
                    Применить
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-xs text-emerald-400 mt-1 font-medium">
                    ✓ {appliedPromo.message}
                  </p>
                )}
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  Выберите защищенный платежный метод:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sbp')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'sbp'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-bold text-white">СБП (QR-код)</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">0% комиссии · Мгновенно</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card_ru')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'card_ru'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">Карты МИР / РФ</div>
                      <div className="text-[10px] text-slate-400">Сбер, Т-Банк, ВТБ</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'crypto'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Coins className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-bold text-white">Криптовалюта</div>
                      <div className="text-[10px] text-slate-400">USDT TRC20, TON, BTC</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card_intl')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'card_intl'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="font-bold text-white">Зарубежные карты</div>
                      <div className="text-[10px] text-slate-400">Stripe / Visa / Apple Pay</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Выбранный регламент тарифа:</span>
                  <span className="text-white font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Ожидаемая окупаемость:</span>
                  <span className="text-emerald-400 font-semibold">{plan.paybackEstimate}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Скидка по промокоду ({appliedPromo.discountPct}%):</span>
                    <span className="font-mono">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Итого к оплате:</span>
                  <span className="text-xl font-mono text-cyan-400">${finalPrice}</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Шлюз формирует ордер и выпускает ключ...</span>
                  </span>
                ) : (
                  <>
                    <span>Оплатить ${finalPrice} и получить ключ доступа</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Защищенный TLS-протокол · Безусловная гарантия возврата 14 дней</span>
              </div>
            </form>
          </div>
        ) : (
          /* SUCCESS CONFIRMATION STATE */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Платеж успешно подтвержден
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Доступ к PulseSignal AI активирован
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                Электронная квитанция направлена на <strong className="text-white">{emailInput}</strong>. Скопируйте ваш персональный ключ:
              </p>
            </div>

            {/* Activation Key Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 flex items-center justify-between gap-4 max-w-sm mx-auto">
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">
                  Токен активации ({plan.name}):
                </div>
                <div className="font-mono text-lg font-black text-cyan-400 tracking-wider">
                  {activationCode}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{copied ? 'Скопировано' : 'Копия'}</span>
              </button>
            </div>

            {/* Direct Telegram Open Button */}
            <div className="space-y-3 pt-2">
              <a
                href="https://t.me/PulseSignalOfficialBot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Открыть @PulseSignalOfficialBot в Telegram</span>
              </a>

              {/* 3 Step Instruction */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 text-left text-xs space-y-2">
                <div className="font-bold text-white text-xs">Пошаговый регламент запуска (30 секунд):</div>
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>1. Нажмите кнопку выше и перейдите в официального бота <strong>@PulseSignalOfficialBot</strong></div>
                  <div>2. Отправьте команду <strong>/start</strong> и передайте ваш ключ <strong>{activationCode}</strong></div>
                  <div>3. Готово! Система моментально откроет поток закрытых сетапов и подключит вас к каналу.</div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Закрыть окно оформления
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
