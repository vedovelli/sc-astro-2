import { fromSuccess } from 'domain-functions'
import { getPurchases } from '../purchases.server'

describe('getPurchases', () => {
  it('should return 10 purchases by default', async () => {
    const { purchases } = await fromSuccess(getPurchases)({})
    expect(purchases).toHaveLength(10)
  })

  it('should have between 1 and 5 products', async () => {
    const { purchases } = await fromSuccess(getPurchases)({})

    expect(purchases[0].products.length).toBeGreaterThanOrEqual(1)
    expect(purchases[0].products.length).toBeLessThanOrEqual(5)
  })

  it('should accept a quantity of purchases to show', async () => {
    const { purchases } = await fromSuccess(getPurchases)({ quantity: 5 })

    expect(purchases).toHaveLength(5)
  })

  it('accepts "number-like" quantity', async () => {
    const result = await getPurchases({ quantity: '5' })
    expect(result.success).toBe(true)
  })

  it('fails if the quantity is not a number', async () => {
    const result = await getPurchases({ quantity: 'foo' })

    expect(result.success).toBe(false)
    expect(result.inputErrors).toEqual([
      { path: ['quantity'], message: 'Expected number, received nan' },
    ])
  })
})
