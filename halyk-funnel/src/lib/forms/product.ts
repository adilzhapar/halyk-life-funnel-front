import { z } from "zod";

export const ProductItemOutput = z.object({
  product: z.object({
    description: z.string(),
    link_to_product: z.string().url(),
    title: z.string()
  }),
  duration_in_years: z.number().int(),
  premium: z.number().int(),
  insurance_coverage: z.number().int(),
});

export type ProductItemOutputType = z.infer<typeof ProductItemOutput>;
export type ProductItemsOutputType = ProductItemOutputType[];