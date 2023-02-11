import { faker } from '@faker-js/faker'
import { makeDomainFunction } from 'domain-functions'
import * as z from 'zod'

export const getPurchases = makeDomainFunction(
  z.object({ quantity: z.coerce.number().default(10) }),
)(async ({ quantity }) => {
  const purchases = Array.from({ length: Number(quantity) }, () => ({
    number: faker.datatype.number({ min: 1256, max: 4589 }),
    href: '#',
    invoiceHref: '#',
    // userId: Math.ceil(Math.random() * 6),
    createdDate: faker.date.recent(),
    createdDatetime: faker.date.recent(),
    deliveredDate: faker.date.recent(),
    deliveredDatetime: faker.date.recent(),
    total: `$${faker.commerce.price()}`,
    products: Array.from(
      {
        length: faker.datatype.number({
          min: 1,
          max: 5,
        }),
      },
      () => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        href: '#',
        price: `$${faker.commerce.price()}`,
        imageSrc: faker.image.abstract(),
        imageAlt: faker.lorem.sentence(),
      }),
    ),
  }))

  return { purchases }
})
