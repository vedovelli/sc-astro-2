import { z } from "zod";

const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  price: z.string().min(1),
  imageSrc: z.string().min(1),
  imageAlt: z.string().min(1),
});

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
});

const schema = z.array(purchaseSchema);

export type Purchase = z.infer<typeof purchaseSchema>;

export type Product = z.infer<typeof productSchema>;

export const getPurchases = async (quantity?: number) => {
  const { purchases } = await fetch(
    `http://localhost:3001/purchases?quantity=${quantity ?? 10}`
  ).then((res) => res.json());

  return schema.safeParse(purchases);
};
