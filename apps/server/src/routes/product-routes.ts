import { Router } from "express";
import {
  getProductInfo,
  getProducts,
} from "../controllers/product-controllers";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductInfo);

export { productRouter };
