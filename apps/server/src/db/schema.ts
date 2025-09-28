import { SQL, sql } from "drizzle-orm";
import {
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const ProductTypeEnum = pgEnum("product_types", [
  "stock",
  "mutual_fund",
]);
export const CurrencyEnum = pgEnum("currencies", ["USD", "INR"]);
export const RiskLevelEnum = pgEnum("risk_levels", ["LOW", "MODERATE", "HIGH"]);
export const TransactionTypeEnum = pgEnum("transaction_types", ["BUY", "SELL"]);
export const StatusEnum = pgEnum("statuses", ["COMPLETED", "PENDING"]);
export const WalletTransactionType = pgEnum("wallet_transaction_types", [
  "DEPOSIT",
  "WITHDRAWAL",
  "BUY",
  "SELL",
]);

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  panId: text("pan").notNull().unique(),
  password: text("password").notNull(),
  imageId: text("image_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  productType: ProductTypeEnum("product_type").notNull(),
  symbol: text("symbol").unique().notNull(),
  name: text("name").notNull(),
  exchange: text("exchange"),
  currency: CurrencyEnum("currency").default("INR"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  pricePerUnit: integer("price_per_unit").notNull(),
});

export const mutualFund = pgTable("mutual_fund", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  fundManager: text("fund_manager"),
  expenseRatio: integer("expense_ratio"),
  netAssetValue: integer("net_asset_value"),
  inceptionDate: timestamp("inception_date"),
  riskLevel: RiskLevelEnum("risk_level").default("LOW"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const stock = pgTable("stock", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  isin: text("isin"),
  sector: text("sector"),
  marketCap: integer("market_cap"),
});

export const transaction = pgTable(
  "transaction",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => product.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "set null" }),
    transactionType: TransactionTypeEnum("transaction_type").notNull(),
    quantity: integer("quantity").notNull(),
    pricePerUnit: integer("price_per_unit").notNull(),
    totalAmount: integer("total_amount").generatedAlwaysAs(
      (): SQL => sql`${transaction.quantity} * ${transaction.pricePerUnit}`
    ),
    orderDate: timestamp("order_date").defaultNow(),
    status: StatusEnum("status").default("COMPLETED"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [check("quantity_check", sql`${table.quantity} > 1`)]
);

export const holding = pgTable(
  "holding",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
  },
  (table) => [unique().on(table.productId, table.userId)]
);

export const wallet = pgTable("wallet", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  balance: integer("balance").notNull().default(100000),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const walletTransaction = pgTable("wallet_transaction", {
  id: uuid("id").primaryKey().defaultRandom(),
  walletId: uuid("wallet_id")
    .notNull()
    .references(() => wallet.id, { onDelete: "set null" }),
  transactionType: WalletTransactionType("transaction_type").notNull(),
  amount: integer("amount").notNull(),
  balanceAfter: integer("balance_after").notNull(),
  transactionId: uuid("transaction_id").references(() => transaction.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const watchlist = pgTable(
  "watchlist",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [unique().on(table.userId, table.productId)]
);

export type NewUser = typeof user.$inferInsert;
export type User = typeof user.$inferSelect;
