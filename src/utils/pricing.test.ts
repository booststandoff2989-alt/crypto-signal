import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeTelegramHandle,
  applyPromoCode,
  calculateRoi,
  generateActivationKey,
  PRICING_PLANS
} from './pricing';

test('normalizeTelegramHandle correctly handles valid handles and prefixes', () => {
  assert.deepEqual(normalizeTelegramHandle('@alex_trade'), { isValid: true, handle: '@alex_trade' });
  assert.deepEqual(normalizeTelegramHandle('alex_trade'), { isValid: true, handle: '@alex_trade' });
  assert.deepEqual(normalizeTelegramHandle('https://t.me/alex_trade'), { isValid: true, handle: '@alex_trade' });
  assert.deepEqual(normalizeTelegramHandle('t.me/alex_trade'), { isValid: true, handle: '@alex_trade' });
});

test('normalizeTelegramHandle catches invalid formats', () => {
  assert.equal(normalizeTelegramHandle('').isValid, false);
  assert.equal(normalizeTelegramHandle('   ').isValid, false);
  assert.equal(normalizeTelegramHandle('abc').isValid, false); // < 4 chars
  assert.equal(normalizeTelegramHandle('user!name').isValid, false); // invalid char
});

test('applyPromoCode applies valid discounts', () => {
  const result = applyPromoCode('TELEGRAM20', 100);
  assert.equal(result.isValid, true);
  assert.equal(result.discountPct, 20);
  assert.equal(result.newTotal, 80);

  const result30 = applyPromoCode('PRO30', 200);
  assert.equal(result30.isValid, true);
  assert.equal(result30.newTotal, 140);

  const invalid = applyPromoCode('UNKNOWN', 100);
  assert.equal(invalid.isValid, false);
  assert.equal(invalid.newTotal, 100);
});

test('calculateRoi projects sensible profits', () => {
  const roi = calculateRoi(1000, 3, 'balanced', true);
  assert.equal(roi.initialDeposit, 1000);
  assert.ok(roi.finalBalance > 1000);
  assert.ok(roi.projectedProfit > 0);
  assert.equal(roi.winRate, 87);
});

test('generateActivationKey creates formatted key', () => {
  const key = generateActivationKey('test_user@example.com');
  assert.match(key, /^PULSE-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
});

test('PRICING_PLANS contains required tiers', () => {
  assert.equal(PRICING_PLANS.length, 3);
  const pro = PRICING_PLANS.find(p => p.id === 'pro');
  assert.ok(pro);
  assert.equal(pro?.popular, true);
});
