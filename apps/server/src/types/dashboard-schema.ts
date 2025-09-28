import { z } from "zod";

export const watchlistSchema = z.object({
  productId: z.uuid(),
});
