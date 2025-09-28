import { and, eq, sum } from "drizzle-orm";
import { db } from "../db/drizzle";
import {
  holding,
  product,
  transaction,
  watchlist,
} from "../db/schema";

export const getPortfolio = async (userId: string) => {
  const holdings = await db
    .select({
      product: product,
      quantity: holding.quantity,
    })
    .from(holding)
    .leftJoin(product, eq(holding.productId, product.id))
    .where(eq(holding.userId, userId));

  const [totalInvested] = await db
    .select({
      total: sum(transaction.totalAmount),
    })
    .from(transaction)
    .where(
      and(eq(transaction.userId, userId), eq(transaction.transactionType, "BUY"))
    );

  const currentValue = holdings.reduce((acc, h) => {
    return acc + h.quantity * h.product!.pricePerUnit;
  }, 0);

  const totalInvestedAmount = Number(totalInvested?.total) || 0;
  const returns = currentValue - totalInvestedAmount;

  return {
    totalInvestedAmount,
    currentValue,
    returns,
    holdings,
  };
};

export const getWatchlist = async (userId: string) => {
  const userWatchlist = await db
    .select({
      product: product,
    })
    .from(watchlist)
    .leftJoin(product, eq(watchlist.productId, product.id))
    .where(eq(watchlist.userId, userId));

  return userWatchlist.map((item) => item.product);
};

export const addToWatchlist = async (userId: string, productId: string) => {
  await db.insert(watchlist).values({ userId, productId });
};

export const removeFromWatchlist = async (
  userId: string,
  productId: string
) => {
  await db
    .delete(watchlist)
    .where(and(eq(watchlist.userId, userId), eq(watchlist.productId, productId)));
};
