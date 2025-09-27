import type { Request, Response } from "express";
import { db } from "../db/drizzle";
import { handleError, handleSuccess } from "../utils/response";
import { and, eq, sql } from "drizzle-orm";
import { validateBody } from "../utils/validation";
import { BuySchema } from "../types/transaction-schema";
import { holding, transaction, wallet, walletTransaction } from "../db/schema";
import { getUser } from "../services/auth-services";
import { getProductDetails } from "../services/product-services";

export const handleTransaction = async (req: Request, res: Response) => {
  const body = req.body;
  const { productId, quantity } = validateBody(BuySchema, body);
  const { token } = req.cookies;
  const { id: userId } = await getUser(token);
  if (!userId) {
    return handleError(res, new Error("Unauthorized"), "You must be logged in");
  }
  const productDetails = await getProductDetails(productId);
  if (!productDetails || !productDetails.pricePerUnit) {
    return handleError(
      res,
      new Error("No product found"),
      "Error fetching product details"
    );
  }
  const pricePerUnit = productDetails.pricePerUnit;
  try {
    await db.transaction(async (tx) => {
      const [newTransaction] = await tx
        .insert(transaction)
        .values({
          userId,
          pricePerUnit,
          productId,
          quantity,
          transactionType: "BUY",
        })
        .returning();
      if (!newTransaction) return;

      const currHolding = await tx.query.holding.findFirst({
        where: and(
          eq(holding.productId, productId),
          eq(holding.userId, userId)
        ),
      });

      if (currHolding) {
        await tx
          .update(holding)
          .set({
            quantity: sql`${holding.quantity} + ${quantity}`,
          })
          .where(
            and(eq(holding.userId, userId), eq(holding.productId, productId))
          );
      } else {
        await tx.insert(holding).values({
          userId,
          productId,
          quantity,
        });
      }

      const [updatedWallet] = await tx
        .update(wallet)
        .set({
          balance: sql`${wallet.balance} - ${quantity * pricePerUnit}`,
        })
        .where(eq(wallet.userId, userId))
        .returning({ walletId: wallet.id, balanceLeft: wallet.balance });
      if (!updatedWallet) return;

      await tx.insert(walletTransaction).values({
        amount: quantity * pricePerUnit,
        walletId: updatedWallet.walletId,
        transactionType: "BUY",
        transactionId: newTransaction.id,
        balanceAfter: updatedWallet.balanceLeft,
      });
    });

    handleSuccess(res, "Success", "Transaction completed successfuly");
  } catch (error) {
    console.error(error);
    handleError(res, error, "Transaction could not be completed");
  }
};
