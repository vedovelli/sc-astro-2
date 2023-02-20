import { loader } from '../../routes/purchases'

describe('purchases loader', () => {
  it('should return 10 purchases by default', async () => {
    // Remix arguments
    const response = await loader({
      request: new Request('http://localhost:3000/purchases'),
      context: {},
      params: {},
    })

    const result = await response.json()

    expect(result.purchases).toHaveLength(10)
  })

  it('should have between 1 and 5 products', async () => {
    const response = await loader({
      request: new Request('http://localhost:3000/purchases'),
      context: {},
      params: {},
    })

    const result = await response.json()

    expect(result.purchases[0].products.length).toBeGreaterThanOrEqual(1)
    expect(result.purchases[0].products.length).toBeLessThanOrEqual(5)
  })

  it('should accept a quantity of purchases to show', async () => {
    const response = await loader({
      request: new Request('http://localhost:3000/purchases?quantity=5'),
      context: {},
      params: {},
    })

    const result = await response.json()

    expect(result.purchases).toHaveLength(5)
  })

  it.skip('fails if the quantity is not a number', async () => {
    const response = await loader({
      request: new Request('http://localhost:3000/purchases?quantity=foo'),
      context: {},
      params: {},
    })

    const result = await response.json()

    expect(result.purchases).toHaveLength(10)
  })
})
