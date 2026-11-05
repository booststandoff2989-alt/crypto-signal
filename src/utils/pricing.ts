/**
 * Business logic and calculations for PulseSignal AI Telegram Bot Landing Page
 */

export interface PricingPlan {
  id: 'starter' | 'pro' | 'lifetime';
  name: string;
  badge?: string;
  popular?: boolean;
  baseMonthlyPrice: number;
  annualMonthlyPrice: number;
  annualTotalPrice: number;
  oneTimePrice?: number;
  paybackEstimate: string;
  features: string[];
  signalsPerDay: string;
  exchanges: string[];
  supportLevel: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Базовый Квант',
    baseMonthlyPrice: 29,
    annualMonthlyPrice: 22,
    annualTotalPrice: 264,
    paybackEstimate: 'Окупается за 1–2 сетапа при депозите от $500',
    features: [
      'До 5 подтвержденных сетапов в день (Spot & Futures)',
      'Анализ ликвидности топ-20 активов (BTC, ETH, SOL, SUI)',
      'Фиксированный расчет риска: строго до 1.5% на сделку',
      'Ограничение просадки с жестким Stop-Loss и 3 целями TP',
      'Мгновенный Telegram-канал сигналов с задержкой < 1.2 сек',
      'Регламентная техподдержка (до 1 часа)'
    ],
    signalsPerDay: '3–5 сигналов в день',
    exchanges: ['Binance', 'Bybit'],
    supportLevel: 'Стандартная (до 1 часа)'
  },
  {
    id: 'pro',
    name: 'Pro Трейдер',
    popular: true,
    badge: 'Выбор 78% участников клуба',
    baseMonthlyPrice: 69,
    annualMonthlyPrice: 49,
    annualTotalPrice: 588,
    paybackEstimate: 'Окупается за 2–3 сделки при депозите от $1,000',
    features: [
      'Полный поток алгоритмических сигналов по 140+ парам',
      'Ончейн-радар накоплений институциональных кошельков ("Китов")',
      'Детекция айсберг-ордеров и аномалий открытого интереса (OI)',
      'Индивидуальный риск-калькулятор под точный баланс депозита',
      'Автоматическая ретрансляция ордеров по API (Binance, Bybit, OKX)',
      'Доступ в закрытый аналитический чат с квант-разработчиками'
    ],
    signalsPerDay: '12–25 сигналов в день',
    exchanges: ['Binance', 'Bybit', 'OKX', 'Bitget'],
    supportLevel: 'Приоритетная линия (до 10 минут)'
  },
  {
    id: 'lifetime',
    name: 'Lifetime VIP Синдикат',
    badge: 'Бессрочный доступ без подписок',
    baseMonthlyPrice: 0,
    annualMonthlyPrice: 0,
    annualTotalPrice: 0,
    oneTimePrice: 299,
    paybackEstimate: 'Единоразовая инвестиция с окупаемостью от 4–5 сделок',
    features: [
      'Пожизненный вечный доступ ко всем будущим моделям алгоритма',
      'Все возможности тарифа Pro Трейдер без ограничений',
      'Инсайдерский радар пре-листингов и первичных пулов ликвидности',
      'Личная 1-on-1 сессия настройки риск-профиля и API-шлюза',
      'Членство в закрытом инвестиционном синдикате с прямым голосованием',
      'Официальная гарантия окупаемости или 100% возврат средств'
    ],
    signalsPerDay: 'Неограниченный поток',
    exchanges: ['Все биржи + DEX агрегаторы'],
    supportLevel: 'Персональный риск-менеджер 24/7'
  }
];

export interface StrategyTier {
  id: 'conservative' | 'balanced' | 'aggressive';
  name: string;
  minMonthlyReturnPct: number;
  maxMonthlyReturnPct: number;
  avgWinRatePct: number;
  riskDescription: string;
}

export const STRATEGY_TIERS: Record<string, StrategyTier> = {
  conservative: {
    id: 'conservative',
    name: 'Консервативная (Институциональная)',
    minMonthlyReturnPct: 8,
    maxMonthlyReturnPct: 14,
    avgWinRatePct: 91,
    riskDescription: 'Приоритет сохранения капитала: строгий спот, хеджирование и риск 0.8–1% на трейд'
  },
  balanced: {
    id: 'balanced',
    name: 'Сбалансированная (Свинг-трейдинг)',
    minMonthlyReturnPct: 16,
    maxMonthlyReturnPct: 24,
    avgWinRatePct: 87,
    riskDescription: 'Математический оптимум Risk/Reward от 1:3.2 с плечом x2–x5 и защитой безубытком'
  },
  aggressive: {
    id: 'aggressive',
    name: 'Импульсная (Внутридневной квант)',
    minMonthlyReturnPct: 28,
    maxMonthlyReturnPct: 42,
    avgWinRatePct: 82,
    riskDescription: 'Вход на резких всплесках объема и пробоях уровней ликвидности'
  }
};

/**
 * Validates and normalizes Telegram username
 */
export function normalizeTelegramHandle(input: string): { isValid: boolean; handle: string; error?: string } {
  if (!input || !input.trim()) {
    return { isValid: false, handle: '', error: 'Укажите ваш действующий Telegram username' };
  }

  let cleaned = input.trim();
  cleaned = cleaned.replace(/^https?:\/\/t\.me\//i, '');
  cleaned = cleaned.replace(/^t\.me\//i, '');
  if (cleaned.startsWith('@')) {
    cleaned = cleaned.slice(1);
  }

  if (cleaned.length < 4) {
    return { isValid: false, handle: '@' + cleaned, error: 'Telegram username должен содержать не менее 4 символов' };
  }

  if (cleaned.length > 32) {
    return { isValid: false, handle: '@' + cleaned, error: 'Telegram username не должен превышать 32 символов' };
  }

  const validRegex = /^[a-zA-Z0-9_]+$/;
  if (!validRegex.test(cleaned)) {
    return { isValid: false, handle: '@' + cleaned, error: 'Разрешены только латинские символы, цифры и знак подчеркивания' };
  }

  return { isValid: true, handle: '@' + cleaned };
}

/**
 * Calculates promo code discount
 */
export function applyPromoCode(code: string, currentTotal: number): { isValid: boolean; discountPct: number; newTotal: number; message: string } {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return { isValid: false, discountPct: 0, newTotal: currentTotal, message: '' };
  }

  if (normalized === 'TELEGRAM20' || normalized === 'PULSE20') {
    const discount = Math.round(currentTotal * 0.2);
    return { isValid: true, discountPct: 20, newTotal: Math.max(1, currentTotal - discount), message: 'Скидка 20% по закрытому промокоду сообщества применена' };
  }

  if (normalized === 'PRO30') {
    const discount = Math.round(currentTotal * 0.3);
    return { isValid: true, discountPct: 30, newTotal: Math.max(1, currentTotal - discount), message: 'Специальный промокод -30% активирован' };
  }

  return { isValid: false, discountPct: 0, newTotal: currentTotal, message: 'Промокод не найден или срок действия специального предложения завершен' };
}

/**
 * Calculates projected ROI based on deposit, months, tier, and compound interest
 */
export interface RoiProjection {
  initialDeposit: number;
  projectedProfit: number;
  finalBalance: number;
  monthlyAverage: number;
  winRate: number;
}

export function calculateRoi(
  deposit: number,
  months: number,
  tierKey: 'conservative' | 'balanced' | 'aggressive',
  compound: boolean = true
): RoiProjection {
  const tier = STRATEGY_TIERS[tierKey] || STRATEGY_TIERS.balanced;
  const avgMonthlyRate = (tier.minMonthlyReturnPct + tier.maxMonthlyReturnPct) / 2 / 100;

  let finalBalance: number;
  if (compound) {
    finalBalance = deposit * Math.pow(1 + avgMonthlyRate, months);
  } else {
    finalBalance = deposit + deposit * avgMonthlyRate * months;
  }

  finalBalance = Math.round(finalBalance);
  const projectedProfit = Math.round(finalBalance - deposit);
  const monthlyAverage = Math.round(projectedProfit / months);

  return {
    initialDeposit: deposit,
    projectedProfit,
    finalBalance,
    monthlyAverage,
    winRate: tier.avgWinRatePct
  };
}

/**
 * Generates deterministic order key for success receipt
 */
export function generateActivationKey(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const part1 = Math.abs(hash).toString(36).toUpperCase().padStart(4, 'X').slice(-4);
  const part2 = ((Math.abs(hash) * 31) >>> 0).toString(16).toUpperCase().padStart(4, 'Y').slice(-4);
  return `PULSE-${part1}-${part2}`;
}
