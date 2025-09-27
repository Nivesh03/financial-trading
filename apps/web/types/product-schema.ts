export type Product = {
  symbol: string;
  id: string;
  name: string;
  createdAt: Date | null;
  productType: "stock" | "mutual_fund";
  exchange: string | null;
  currency: "USD" | "INR" | null;
  updatedAt: Date | null;
  pricePerUnit: number;
};
