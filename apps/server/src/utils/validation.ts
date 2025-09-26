import { z, type ZodType } from "zod";

export function validateBody<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(JSON.stringify(z.treeifyError(result.error)));
  }
  return result.data;
}
