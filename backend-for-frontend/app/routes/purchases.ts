import { json, type LoaderArgs } from "@remix-run/node";
import { faker } from "@faker-js/faker";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const quantity = url.searchParams.get("quantity") ?? "10";

  return json({
    purchases: Array.from({ length: Number(quantity) }, () => ({
      number: faker.datatype.number({ min: 1256, max: 4589 }),
      href: "#",
      invoiceHref: "#",
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
          href: "#",
          price: `$${faker.commerce.price()}`,
          imageSrc: faker.image.abstract(),
          imageAlt: faker.lorem.sentence(),
        })
      ),
    })),
  });
}
