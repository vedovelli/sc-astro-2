import { merge, makeDomainFunction, map } from 'domain-functions'
import { z } from 'zod'

const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  price: z.string().min(1),
  imageSrc: z.string().min(1),
  imageAlt: z.string().min(1),
})

const purchaseSchema = z.object({
  number: z.number().min(4),
  href: z.string().min(1),
  userId: z.number().min(1),
  invoiceHref: z.string().min(1),
  createdDate: z.string().min(1),
  createdDatetime: z.string().min(1),
  deliveredDate: z.string().min(1),
  deliveredDatetime: z.string().min(1),
  total: z.string().min(1),
  products: z.array(productSchema),
})

export const getPurchases = makeDomainFunction(
  z.object({
    quantity: z.number(),
  }),
)(async ({ quantity }) => {
  // safe?
  const { purchases } = await fetch(
    `http://localhost:3001/purchases?quantity=${quantity}`,
  ).then((res) => res.json())

  return {
    purchases: z.array(purchaseSchema).parse(purchases),
  }
})

const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  avatar: z.string().url(),
})

export const getUsers = makeDomainFunction(z.object({}))(async () => {
  const { data } = await fetch('https://reqres.in/api/users').then((res) =>
    res.json(),
  )

  return {
    users: z.array(userSchema).parse(data),
  }
})

export const getPurchasesAndUsers = map(
  merge(getPurchases, getUsers),
  ({ users, purchases }) => {
    return {
      purchases: purchases.map((purchase) => {
        const user = users.find((user) => user.id === purchase.userId)

        return {
          ...purchase,
          user: user
            ? {
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                avatar: user.avatar,
              }
            : null,
        }
      }),
      users,
    }
  },
)
