import { Button } from "@/components/ui/button";
import { allProductQueries } from "@/hooks/use-products";
import { formatDateIST, formatPrice } from "@/lib/utils";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
// bg-green-500
// bg-red-500
// bg-orange-500
const riskLevelColor = {
  LOW: "green-500",
  MODERATE: "orange-500",
  HIGH: "red-500",
} as const;

type RiskLevel = keyof typeof riskLevelColor;

function getColor(riskLevel: RiskLevel) {
  return riskLevelColor[riskLevel];
}

export const Route = createFileRoute("/products/$id/")({
  beforeLoad: async ({ params: { id }, context: { queryClient } }) => {
    const product = await queryClient.ensureQueryData(
      allProductQueries.getProductByIdQuery(id)
    );
    return { product };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();
  const { id } = Route.useParams();
  const { product } = Route.useRouteContext();
  if (!product.productDetails) throw notFound();
  const { productDetails } = product;
  const {
    name,
    exchange,
    productType,
    currency,
    pricePerUnit,
    symbol,
    mutualFundDetails = null,
    stockDetails = null,
  } = productDetails;

  const handleNavigate = () => {
    router.navigate({
      to: "/products/$id/checkout",
      params: { id },
      search: { quantity },
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-base font-medium text-primary">
            {productType === "stock" ? "Stock" : "Mutual Fund"}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {name}
          </h1>
          <p className="mt-2 text-base text-zinc-500">Find more about {name}</p>
          <div className="flex gap-6 items-center">
            <div className="mt-12 text-sm font-medium">
              <p className="text-zinc-900">Exchange</p>
              <p className="mt-2 text-zinc-500">{exchange ?? "NA"}</p>
            </div>
            <div className="mt-12 text-sm font-medium">
              <p className="text-zinc-900">Symbol</p>
              <p className="mt-2 text-zinc-500">{symbol}</p>
            </div>
            <div className="mt-12 text-sm font-medium">
              <p className="text-zinc-900">Currency</p>
              <p className="mt-2 text-zinc-500">{currency}</p>
            </div>
            <div className="mt-12 text-sm font-medium">
              <p className="text-zinc-900">Price / Unit</p>
              <p className="mt-2 text-zinc-500">{formatPrice(pricePerUnit)}</p>
            </div>
            {mutualFundDetails && (
              <div className="mt-12 text-sm font-medium">
                <p className="text-zinc-900">Risk Level</p>
                <p
                  className={`mt-2 text-${getColor(mutualFundDetails.riskLevel)}`}
                >
                  {mutualFundDetails.riskLevel}
                </p>
              </div>
            )}
          </div>
          <div className="mt-10 border-t border-zinc-200">
            <div className="mt-10 flex flex-auto flex-col">
              <h4 className="font-semibold text-zinc-900">
                About <span className="underline">{name}</span>
              </h4>
              {stockDetails && (
                <p className="mt-2 text-sm text-zinc-600">
                  {name} has given great return on investments for its investors
                  in the{" "}
                  <span className="font-semibold">{stockDetails.sector}</span>{" "}
                  sector
                </p>
              )}
              {mutualFundDetails && (
                <p className="mt-2 text-sm text-zinc-600">
                  Founded on {formatDateIST(mutualFundDetails.inceptionDate)},{" "}
                  {name} has given great return on investments for its investors
                  with steady returns.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4">
            {stockDetails && (
              <div>
                <p className="font-bold text-gray-900">Stock Details</p>
                <div className="mt-2 text-zinc-700">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>ISIN: </div>
                      <span className="block">{stockDetails.isin}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>Sector: </div>
                      <span className="block">{stockDetails.sector}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>Market Cap: </div>
                      <span className="block">{stockDetails.marketCap}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {mutualFundDetails && (
              <div>
                <p className="font-bold text-gray-900 underline">
                  Stock Details
                </p>
                <div className="mt-2 text-zinc-700">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Fund Manager: </div>
                      <span className="block">
                        {mutualFundDetails.fundManager}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Expense Ratio: </div>
                      <span className="block">
                        {mutualFundDetails.expenseRatio}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Net Asset Value: </div>
                      <span className="block">
                        {mutualFundDetails.netAssetValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-end pb-12">
          <div className="flex items-center gap-4 space-x-4 mx-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(0, q - 1))}
              disabled={quantity === 0}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="select-none font-semibold text-lg w-8 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleNavigate}
            className="cursor-pointer px-4 sm:px-6 lg:px-8 select-none"
            disabled={!!!quantity}
          >
            Buy <ArrowRight className="h-4 w-4 ml-1.5 inline" />
          </Button>
        </div>
      </div>
    </div>
  );
}
