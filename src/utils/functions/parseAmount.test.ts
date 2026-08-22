import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { MAX_AMOUNT, getAmountSeparators, parseAmount, sanitizeAmountInput, toAmountInput } from './parseAmount'

describe('amount input', () => {
  describe('separators by locale', () => {
    it('uses a dot for english', () => {
      assert.deepEqual(getAmountSeparators('en-US'), { group: ',', decimal: '.' })
    })

    it('uses a comma for spanish', () => {
      assert.deepEqual(getAmountSeparators('es-AR'), { group: '.', decimal: ',' })
    })
  })

  describe('typing in a comma locale', () => {
    const es = 'es-AR'

    it('keeps a comma as the decimal separator', () => {
      assert.equal(sanitizeAmountInput('150,5', es), '150,5')
      assert.equal(parseAmount('150,5', es), 150.5)
    })

    it('accepts a dot and turns it into the local separator', () => {
      assert.equal(sanitizeAmountInput('150.5', es), '150,5')
    })

    it('survives a half typed decimal', () => {
      assert.equal(sanitizeAmountInput('150,', es), '150,')
      assert.equal(parseAmount('150,', es), 150)
    })

    it('keeps only the first separator', () => {
      assert.equal(sanitizeAmountInput('1,5,5', es), '1,55')
    })
  })

  describe('typing in a dot locale', () => {
    const en = 'en-US'

    it('keeps a dot as the decimal separator', () => {
      assert.equal(sanitizeAmountInput('150.5', en), '150.5')
      assert.equal(parseAmount('150.5', en), 150.5)
    })

    it('accepts a comma and turns it into the local separator', () => {
      assert.equal(sanitizeAmountInput('150,5', en), '150.5')
    })
  })

  describe('limits', () => {
    it('drops anything that is not a number', () => {
      assert.equal(sanitizeAmountInput('12a3$ x', 'en-US'), '123')
    })

    it('allows at most two decimals', () => {
      assert.equal(sanitizeAmountInput('1.239', 'en-US'), '1.23')
    })

    it('strips leading zeros but keeps a lone zero', () => {
      assert.equal(sanitizeAmountInput('007', 'en-US'), '7')
      assert.equal(sanitizeAmountInput('0', 'en-US'), '0')
      assert.equal(sanitizeAmountInput('0.5', 'en-US'), '0.5')
    })

    it('caps at the maximum amount', () => {
      assert.equal(sanitizeAmountInput('99999999999', 'en-US'), String(MAX_AMOUNT))
    })

    it('handles an empty field', () => {
      assert.equal(sanitizeAmountInput('', 'en-US'), '')
      assert.equal(parseAmount('', 'en-US'), 0)
    })
  })

  describe('round trip', () => {
    it('shows nothing for zero', () => {
      assert.equal(toAmountInput(0, 'es-AR'), '')
    })

    it('returns to the same number it started from', () => {
      for (const [amount, locale] of [
        [150.5, 'es-AR'],
        [150.5, 'en-US'],
        [0.05, 'es-AR'],
        [1000000000, 'en-US'],
      ] as const) {
        assert.equal(parseAmount(toAmountInput(amount, locale), locale), amount)
      }
    })
  })
})
