import z from "zod";

export const BuySchema = z.object({
  productId: z.uuid(),
  quantity: z.int().min(1),
});
