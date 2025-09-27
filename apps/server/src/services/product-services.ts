import type { Request, Response } from "express";
import { db } from "../db/drizzle";
import { handleError, handleSuccess } from "../utils/response";
import { eq } from "drizzle-orm";
import { mutualFund, product, stock } from "../db/schema";
import z from "zod";

export const getProductDetails = async (productId: string) => {
  const productData = await db.query.product.findFirst({
    where: eq(product.id, productId),
  });
  if (!productData) {
    return null;
  }
  if (productData.productType === "mutual_fund") {
    const mutualFundDetails = await db.query.mutualFund.findFirst({
      where: eq(mutualFund.productId, productId),
    });
    return { ...productData, mutualFundDetails };
  }
  const stockDetails = await db.query.stock.findFirst({
    where: eq(stock.productId, productId),
  });
  return { ...productData, stockDetails };
};
