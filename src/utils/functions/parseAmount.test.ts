import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatAmount } from './formatAmount'
import { MAX_AMOUNT, getAmountSeparators, parseAmount, sanitizeAmountInput, toAmountInput } from './parseAmount'

const APP_LOCALES = ['en', 'es', 'pt-BR', 'pt-PT', 'zh-CN', 'zh-TW', 'ar', 'fr', 'ja', 'ru', 'de', 'id']

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

  describe('every shipped locale', () => {
    APP_LOCALES.forEach((locale) => {
      const { decimal } = getAmountSeparators(locale)

      it(`${locale}: what is displayed can be typed back in`, () => {
        const displayed = formatAmount(1234.5, { language: locale })
        const typedBack = parseAmount(sanitizeAmountInput(displayed, locale), locale)

        assert.equal(typedBack, 1234.5, `displayed "${displayed}" parsed back as ${typedBack}`)
      })

      it(`${locale}: the input and the display agree on the decimal separator`, () => {
        assert.ok(
          formatAmount(0.5, { language: locale }).includes(decimal),
          `formatAmount used a different separator than the input accepts`,
        )
      })

      it(`${locale}: typing the locale separator keeps the decimals`, () => {
        assert.equal(parseAmount(sanitizeAmountInput(`12${decimal}34`, locale), locale), 12.34)
      })
    })
  })

  describe('currency display', () => {
    it('puts the symbol where the locale wants it', () => {
      assert.ok(formatAmount(1234.5, { language: 'en', currency: 'USD' }).startsWith('$'))
      assert.ok(formatAmount(1234.5, { language: 'de', currency: 'EUR' }).trim().endsWith('\u20ac'))
    })

    it('shows the same currency to every locale', () => {
      const locales = ['en', 'es', 'de', 'ja']
      const rendered = locales.map((language) => formatAmount(1000, { language, currency: 'ARS' }))

      rendered.forEach((value) => assert.ok(value.includes('$'), `${value} lost the peso symbol`))
    })

    it('falls back to a plain number when no currency is set', () => {
      assert.equal(formatAmount(1234.5, { language: 'en' }), '1,234.50')
    })

    it('keeps amounts typeable after being displayed with a currency', () => {
      const displayed = formatAmount(1234.5, { language: 'de', currency: 'EUR' })

      assert.equal(parseAmount(sanitizeAmountInput(displayed, 'de'), 'de'), 1234.5)
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
