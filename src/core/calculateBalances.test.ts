import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { calculateBalances } from '@/core/calculateBalances'

import { Balance } from '@/types/balance-types'
import { Expense } from '@/types/expense-types'

import { getExpenseSharers, getParticipantNames } from '@/utils/functions/getParticipants'

type SharedExpense = Pick<Expense, 'name' | 'amount' | 'sharedWith'>

const fairPositions = (expenses: SharedExpense[]) => {
  const participants = getParticipantNames(expenses)
  const positions = new Map(participants.map((participant) => [participant, 0]))

  expenses.forEach((expense) => {
    const sharers = getExpenseSharers(expense, participants)

    positions.set(expense.name, (positions.get(expense.name) ?? 0) - expense.amount)
    sharers.forEach((sharer) => positions.set(sharer, (positions.get(sharer) ?? 0) + expense.amount / sharers.length))
  })

  return positions
}

const settledPositions = (balances: Balance[]) => {
  const positions = new Map<string, number>()
  const add = (participant: string, cents: number) =>
    positions.set(participant, (positions.get(participant) ?? 0) + cents)

  balances.forEach(({ debtor, creditor, amount }) => {
    add(debtor, Math.round(amount * 100))
    add(creditor, -Math.round(amount * 100))
  })

  return positions
}

const transfersPerPerson = (balances: Balance[]) => {
  const counts = new Map<string, number>()
  const add = (participant: string) => counts.set(participant, (counts.get(participant) ?? 0) + 1)

  balances.forEach(({ debtor, creditor }) => {
    add(debtor)
    add(creditor)
  })

  return counts
}

const expectSettles = (expenses: SharedExpense[]) => {
  const balances = calculateBalances(expenses)
  const settled = settledPositions(balances)
  const fair = fairPositions(expenses)
  const sharedExpenses = (participant: string) =>
    expenses.filter((expense) => getExpenseSharers(expense, getParticipantNames(expenses)).includes(participant)).length

  balances.forEach(({ debtor, creditor, amount }) => {
    assert.ok(amount > 0, `expected a positive transfer, got ${amount}`)
    assert.notEqual(debtor, creditor, 'expected no self transfers')
    assert.equal(amount, Math.round(amount * 100) / 100, `expected ${amount} to be a whole number of cents`)
  })

  assert.equal(
    [...settled.values()].reduce((total, cents) => total + cents, 0),
    0,
    'expected transfers to create and destroy no money',
  )

  fair.forEach((owed, participant) => {
    const drift = Math.abs((settled.get(participant) ?? 0) / 100 - owed)
    const tolerance = sharedExpenses(participant) / 100

    assert.ok(
      drift <= tolerance + Number.EPSILON,
      `expected ${participant} to settle within ${tolerance} of ${owed}, drifted ${drift}`,
    )
  })

  const debtors = new Set(balances.map(({ debtor }) => debtor))
  const creditors = new Set(balances.map(({ creditor }) => creditor))
  const counts = transfersPerPerson(balances)

  assert.ok(
    balances.length <= debtors.size + creditors.size - 1 || !balances.length,
    `expected at most ${debtors.size + creditors.size - 1} payments, got ${balances.length}`,
  )

  counts.forEach((count, participant) => {
    const others = debtors.has(participant) ? creditors.size : debtors.size

    assert.ok(count <= others, `expected ${participant} to take part in at most ${others} payments, got ${count}`)
  })

  return balances
}

describe('calculateBalances', () => {
  describe('nothing to settle', () => {
    it('returns no balances without expenses', () => {
      assert.deepEqual(calculateBalances([]), [])
    })

    it('returns no balances for a lonely participant', () => {
      assert.deepEqual(calculateBalances([{ name: 'Ana', amount: 100 }]), [])
    })

    it('returns no balances when everybody spent the same', () => {
      assert.deepEqual(
        calculateBalances([
          { name: 'Ana', amount: 50 },
          { name: 'Bob', amount: 50 },
        ]),
        [],
      )
    })

    it('returns no balances when nobody spent anything', () => {
      assert.deepEqual(
        calculateBalances([
          { name: 'Ana', amount: 0 },
          { name: 'Bob', amount: 0 },
          { name: 'Cleo', amount: 0 },
        ]),
        [],
      )
    })

    it('returns no balances when everyone paid their own share', () => {
      assert.deepEqual(
        calculateBalances([
          { name: 'Ana', amount: 75, sharedWith: ['Ana'] },
          { name: 'Bob', amount: 20, sharedWith: ['Bob'] },
        ]),
        [],
      )
    })

    it('returns no balances when debts cancel each other out', () => {
      assert.deepEqual(
        calculateBalances([
          { name: 'Ana', amount: 30, sharedWith: ['Bob'] },
          { name: 'Bob', amount: 30, sharedWith: ['Cleo'] },
          { name: 'Cleo', amount: 30, sharedWith: ['Ana'] },
        ]),
        [],
      )
    })
  })

  describe('splitting between everyone', () => {
    it('splits a single expense in half', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 100 },
          { name: 'Bob', amount: 0 },
        ]),
        [{ debtor: 'Bob', creditor: 'Ana', amount: 50 }],
      )
    })

    it('splits a single expense three ways', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 90 },
          { name: 'Bob', amount: 0 },
          { name: 'Cleo', amount: 0 },
        ]),
        [
          { debtor: 'Bob', creditor: 'Ana', amount: 30 },
          { debtor: 'Cleo', creditor: 'Ana', amount: 30 },
        ],
      )
    })

    it('treats an empty sharedWith as everyone', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 100, sharedWith: [] },
          { name: 'Bob', amount: 0, sharedWith: [] },
        ]),
        [{ debtor: 'Bob', creditor: 'Ana', amount: 50 }],
      )
    })

    it('adds up several expenses from the same person', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 20 },
          { name: 'Ana', amount: 30 },
          { name: 'Bob', amount: 10 },
        ]),
        [{ debtor: 'Bob', creditor: 'Ana', amount: 20 }],
      )
    })

    it('settles uneven contributions', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 120 },
          { name: 'Bob', amount: 60 },
          { name: 'Cleo', amount: 0 },
        ]),
        [{ debtor: 'Cleo', creditor: 'Ana', amount: 60 }],
      )
    })

    it('counts someone who only shows up as a sharer', () => {
      assert.deepEqual(expectSettles([{ name: 'Ana', amount: 10, sharedWith: ['Ana', 'Zoe'] }]), [
        { debtor: 'Zoe', creditor: 'Ana', amount: 5 },
      ])
    })
  })

  describe('splitting between some participants', () => {
    it('leaves out the participants that are not sharing', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 90, sharedWith: ['Ana', 'Bob'] },
          { name: 'Cleo', amount: 30 },
        ]),
        [
          { debtor: 'Bob', creditor: 'Ana', amount: 35 },
          { debtor: 'Bob', creditor: 'Cleo', amount: 20 },
        ],
      )
    })

    it('lets the payer stay out of their own expense', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 60, sharedWith: ['Bob', 'Cleo'] },
          { name: 'Bob', amount: 0 },
          { name: 'Cleo', amount: 0 },
        ]),
        [
          { debtor: 'Bob', creditor: 'Ana', amount: 30 },
          { debtor: 'Cleo', creditor: 'Ana', amount: 30 },
        ],
      )
    })

    it('handles a guest who never paid anything', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 120, sharedWith: ['Ana', 'Bob', 'Carl'] },
          { name: 'Bob', amount: 0 },
        ]),
        [
          { debtor: 'Bob', creditor: 'Ana', amount: 40 },
          { debtor: 'Carl', creditor: 'Ana', amount: 40 },
        ],
      )
    })

    it('keeps two disjoint splits apart', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 40, sharedWith: ['Ana', 'Bob'] },
          { name: 'Cleo', amount: 80, sharedWith: ['Cleo', 'Dana'] },
        ]),
        [
          { debtor: 'Bob', creditor: 'Ana', amount: 20 },
          { debtor: 'Dana', creditor: 'Cleo', amount: 40 },
        ],
      )
    })

    it('mixes shared and unshared expenses in the same group', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 60 },
          { name: 'Bob', amount: 30, sharedWith: ['Bob', 'Cleo'] },
          { name: 'Cleo', amount: 0 },
        ]),
        [
          { debtor: 'Bob', creditor: 'Ana', amount: 5 },
          { debtor: 'Cleo', creditor: 'Ana', amount: 35 },
        ],
      )
    })

    it('ignores participants that share nothing at all', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 50, sharedWith: ['Ana'] },
          { name: 'Bob', amount: 50, sharedWith: ['Ana'] },
        ]),
        [{ debtor: 'Ana', creditor: 'Bob', amount: 50 }],
      )
    })
  })

  describe('cent precision', () => {
    it('gives the remaining cents to the first sharers', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 10 },
          { name: 'Bob', amount: 0 },
          { name: 'Cleo', amount: 0 },
        ]),
        [
          { debtor: 'Bob', creditor: 'Ana', amount: 3.33 },
          { debtor: 'Cleo', creditor: 'Ana', amount: 3.33 },
        ],
      )
    })

    it('never loses a cent when splitting one hundred three ways', () => {
      const balances = expectSettles([
        { name: 'Ana', amount: 100 },
        { name: 'Bob', amount: 0 },
        { name: 'Cleo', amount: 0 },
      ])

      assert.deepEqual(balances, [
        { debtor: 'Bob', creditor: 'Ana', amount: 33.33 },
        { debtor: 'Cleo', creditor: 'Ana', amount: 33.33 },
      ])
      assert.equal(
        balances.reduce((total, { amount }) => total + amount, 0),
        66.66,
      )
    })

    it('leaves nothing to settle when a cent cannot be split', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 0.01 },
          { name: 'Bob', amount: 0 },
          { name: 'Cleo', amount: 0 },
        ]),
        [],
      )
    })

    it('rounds a seven cent split down to two cents each', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 0.07 },
          { name: 'Bob', amount: 0 },
          { name: 'Cleo', amount: 0 },
        ]),
        [
          { debtor: 'Bob', creditor: 'Ana', amount: 0.02 },
          { debtor: 'Cleo', creditor: 'Ana', amount: 0.02 },
        ],
      )
    })

    it('survives the classic floating point pair', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 0.1 },
          { name: 'Bob', amount: 0.2 },
        ]),
        [{ debtor: 'Ana', creditor: 'Bob', amount: 0.05 }],
      )
    })

    it('keeps repeated decimals from drifting across many expenses', () => {
      const balances = expectSettles([
        ...Array.from({ length: 30 }, () => ({ name: 'Ana', amount: 3.33 })),
        { name: 'Bob', amount: 0 },
      ])

      assert.deepEqual(balances, [{ debtor: 'Bob', creditor: 'Ana', amount: 49.8 }])
    })

    it('splits an odd amount between seven people', () => {
      const balances = expectSettles([
        { name: 'Ana', amount: 100, sharedWith: ['Ana', 'Bob', 'Cleo', 'Dana', 'Eddie', 'Fran', 'Gus'] },
        { name: 'Bob', amount: 0 },
        { name: 'Cleo', amount: 0 },
        { name: 'Dana', amount: 0 },
        { name: 'Eddie', amount: 0 },
        { name: 'Fran', amount: 0 },
        { name: 'Gus', amount: 0 },
      ])

      assert.deepEqual(
        balances.map(({ amount }) => amount),
        [14.29, 14.29, 14.29, 14.28, 14.28, 14.28],
      )
      assert.equal(
        balances.reduce((total, { amount }) => total + amount, 0),
        85.71,
      )
    })
  })

  describe('big numbers', () => {
    it('splits the maximum amount in half', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 1000000000 },
          { name: 'Bob', amount: 0 },
        ]),
        [{ debtor: 'Bob', creditor: 'Ana', amount: 500000000 }],
      )
    })

    it('splits the maximum amount between three people', () => {
      const balances = expectSettles([
        { name: 'Ana', amount: 1000000000 },
        { name: 'Bob', amount: 0 },
        { name: 'Cleo', amount: 0 },
      ])

      assert.deepEqual(balances, [
        { debtor: 'Bob', creditor: 'Ana', amount: 333333333.33 },
        { debtor: 'Cleo', creditor: 'Ana', amount: 333333333.33 },
      ])
    })

    it('handles a tiny expense next to a huge one', () => {
      expectSettles([
        { name: 'Ana', amount: 999999999.99 },
        { name: 'Bob', amount: 0.01 },
        { name: 'Cleo', amount: 0 },
      ])
    })
  })

  describe('transfers', () => {
    it('needs a single transfer when one person owes one person', () => {
      assert.equal(
        expectSettles([
          { name: 'Ana', amount: 40 },
          { name: 'Bob', amount: 20 },
        ]).length,
        1,
      )
    })

    it('spreads the transfers instead of piling them on one person', () => {
      const balances = expectSettles([
        { name: 'Ana', amount: 100 },
        { name: 'Bob', amount: 100 },
        { name: 'Cleo', amount: 0 },
        { name: 'Dana', amount: 0 },
      ])

      assert.deepEqual(balances, [
        { debtor: 'Cleo', creditor: 'Ana', amount: 50 },
        { debtor: 'Dana', creditor: 'Bob', amount: 50 },
      ])
    })

    it('never asks anyone to pay themselves', () => {
      const balances = expectSettles([
        { name: 'Ana', amount: 33.33, sharedWith: ['Ana', 'Bob'] },
        { name: 'Bob', amount: 12.5 },
        { name: 'Cleo', amount: 7.77, sharedWith: ['Ana', 'Cleo'] },
      ])

      balances.forEach(({ debtor, creditor }) => assert.notEqual(debtor, creditor))
    })

    it('lists the balances sorted by debtor', () => {
      const balances = expectSettles([
        { name: 'Zoe', amount: 120 },
        { name: 'Ana', amount: 0 },
        { name: 'Mel', amount: 0 },
      ])

      assert.deepEqual(
        balances.map(({ debtor }) => debtor),
        ['Ana', 'Mel'],
      )
    })

    it('never chops a debt into extra payments', () => {
      const balances = expectSettles([
        { name: 'Ana', amount: 0 },
        { name: 'Bob', amount: 99 },
        { name: 'Cleo', amount: 150 },
        { name: 'Dana', amount: 150 },
        { name: 'Eddie', amount: 101 },
      ])

      assert.deepEqual(balances, [
        { debtor: 'Ana', creditor: 'Cleo', amount: 50 },
        { debtor: 'Ana', creditor: 'Dana', amount: 50 },
        { debtor: 'Bob', creditor: 'Eddie', amount: 1 },
      ])
      assert.equal(Math.max(...transfersPerPerson(balances).values()), 2)
    })

    it('shares the load when two people paid for everyone', () => {
      const balances = expectSettles([
        { name: 'Hana', amount: 500 },
        { name: 'Eddie', amount: 300 },
        { name: 'Ana', amount: 0 },
        { name: 'Bob', amount: 0 },
        { name: 'Cleo', amount: 0 },
        { name: 'Dana', amount: 0 },
        { name: 'Fran', amount: 0 },
        { name: 'Gus', amount: 0 },
      ])

      assert.equal(balances.length, 6)
      assert.equal(Math.max(...transfersPerPerson(balances).values()), 4)
      assert.equal(transfersPerPerson(balances).get('Eddie'), 2)
    })

    it('settles two people at once when their amounts match', () => {
      const balances = expectSettles([
        { name: 'Ana', amount: 40 },
        { name: 'Bob', amount: 0 },
        { name: 'Cleo', amount: 40 },
        { name: 'Dana', amount: 0 },
      ])

      assert.deepEqual(balances, [
        { debtor: 'Bob', creditor: 'Ana', amount: 20 },
        { debtor: 'Dana', creditor: 'Cleo', amount: 20 },
      ])
      assert.equal(Math.max(...transfersPerPerson(balances).values()), 1)
    })

    it('gives the same answer every time', () => {
      const expenses = [
        { name: 'Ana', amount: 71.31, sharedWith: ['Ana', 'Bob', 'Cleo'] },
        { name: 'Bob', amount: 19.9 },
        { name: 'Cleo', amount: 0, sharedWith: ['Cleo', 'Dana'] },
        { name: 'Dana', amount: 5.05, sharedWith: [] },
      ]

      assert.deepEqual(calculateBalances(expenses), calculateBalances(expenses))
    })
  })

  describe('unusual names', () => {
    it('handles accents, emojis and non latin names', () => {
      const balances = expectSettles([
        { name: 'José 🐶', amount: 33.33 },
        { name: '李雷', amount: 0 },
        { name: 'Ω', amount: 10 },
      ])

      assert.deepEqual(
        balances.map(({ debtor }) => debtor),
        ['Ω', '李雷'],
      )
    })

    it('treats the same name as the same person across expenses', () => {
      assert.deepEqual(
        expectSettles([
          { name: 'Ana', amount: 10 },
          { name: 'Ana', amount: 10 },
          { name: 'Bob', amount: 0 },
        ]),
        [{ debtor: 'Bob', creditor: 'Ana', amount: 10 }],
      )
    })
  })

  describe('random groups', () => {
    const names = ['Ana', 'Bob', 'Cleo', 'Dana', 'Eddie', 'Fran']

    let seed = 20260822
    const random = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648
      return seed / 2147483648
    }

    it('settles a thousand random groups down to the cent', () => {
      for (let run = 0; run < 1000; run += 1) {
        const group = names.slice(0, 2 + Math.floor(random() * (names.length - 1)))

        expectSettles(
          Array.from({ length: 1 + Math.floor(random() * 6) }, () => ({
            name: group[Math.floor(random() * group.length)],
            amount: Math.round(random() * 100000) / 100,
            sharedWith: random() > 0.5 ? group.filter(() => random() > 0.4) : [],
          })),
        )
      }
    })
  })
})
