import type { Request, Response } from "express";
import z from "zod";
import { db } from "../db/drizzle";
import { getProductDetails } from "../services/product-services";
import { handleError, handleSuccess } from "../utils/response";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await db.query.product.findMany();
    handleSuccess(res, allProducts, "all available products", 200);
  } catch (error) {
    console.error(error);
    handleError(res, error, "could not fetch products");
  }
};

export const getProductInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parsedId = z.uuid().safeParse(id);
    if (!parsedId.success) {
      return handleError(
        res,
        new Error("validation failed"),
        "product id must me a valid string"
      );
    }
    const productId = parsedId.data;
    const productDetails = await getProductDetails(productId);
    handleSuccess(res, { productDetails }, "stock details");
  } catch (error) {
    handleError(res, error, "coud not fetch product details");
  }
};
