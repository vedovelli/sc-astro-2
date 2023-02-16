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
  invoiceHref: z.string().min(1),
  createdDate: z.string().min(1),
  createdDatetime: z.string().min(1),
  deliveredDate: z.string().min(1),
  deliveredDatetime: z.string().min(1),
  total: z.string().min(1),
  products: z.array(productSchema),
})

export type Purchase = z.infer<typeof purchaseSchema>

export const getPurchases = async (quantity = 10) => {
  const { purchases } = await fetch(
    `http://localhost:3001/purchases?quantity=${quantity}`,
  ).then((res) => res.json())

  // safe?

  return z.array(purchaseSchema).safeParse(purchases)
}

// const userSchema = z.object({
//   id: z.number(),
//   email: z.string().email(),
//   first_name: z.string().min(2),
//   last_name: z.string().min(2),
//   avatar: z.string().url(),
// })

// export type User = z.infer<typeof userSchema>

// export const getUsers = makeDomainFunction()(async () => {
//   const { data } = await fetch('https://reqres.in/api/users').then((res) =>
//     res.json(),
//   )

//   return {
//     users: z.array(userSchema).parse(data),
//   }
// })
