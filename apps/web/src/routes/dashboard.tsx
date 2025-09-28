import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  dashboardQueries,
  useRemoveFromWatchlist,
} from "@/hooks/use-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: portfolio, isLoading: isPortfolioLoading } = useQuery(
    dashboardQueries.portfolio
  );
  const { data: watchlist, isLoading: isWatchlistLoading } = useQuery(
    dashboardQueries.watchlist
  );
  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist();

  if (isPortfolioLoading || isWatchlistLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatPrice(Number(portfolio?.totalInvestedAmount) || 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatPrice(Number(portfolio?.currentValue) || 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${
                (portfolio?.returns || 0) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {formatPrice(Number(portfolio?.returns) || 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings */}
      <h2 className="text-xl font-bold mb-4">Holdings</h2>
      <div className="mb-8 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-semibold">Name</th>
              <th className="text-left p-2 font-semibold">Symbol</th>
              <th className="text-right p-2 font-semibold">Quantity</th>
              <th className="text-right p-2 font-semibold">Total Invested</th>
              <th className="text-right p-2 font-semibold">Current Value</th>
              <th className="text-right p-2 font-semibold">P/L</th>
            </tr>
          </thead>
          <tbody>
            {portfolio?.holdings?.length > 0 ? (
              portfolio.holdings.map((holding: any) => {
                const invested =
                  holding.quantity * holding.product.pricePerUnit;
                const current = holding.product.currentPrice
                  ? holding.quantity * holding.product.currentPrice
                  : invested; // fallback if currentPrice not available
                const pl = current - invested;

                return (
                  <tr key={holding.product.id} className="border-b">
                    <td className="p-2">{holding.product.name}</td>
                    <td className="p-2">{holding.product.symbol}</td>
                    <td className="text-right p-2">{holding.quantity}</td>
                    <td className="text-right p-2">{formatPrice(invested)}</td>
                    <td className="text-right p-2">{formatPrice(current)}</td>
                    <td
                      className={`text-right p-2 ${
                        pl >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {formatPrice(pl)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No holdings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Watchlist */}
      <h2 className="text-xl font-bold mb-4">Watchlist</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-semibold">Name</th>
              <th className="text-left p-2 font-semibold">Symbol</th>
              <th className="text-right p-2 font-semibold">Current Price</th>
              <th className="text-right p-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist?.length > 0 ? (
              watchlist.map((item: any) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.product.name}</td>
                  <td className="p-2">{item.product.symbol}</td>
                  <td className="text-right p-2">
                    {formatPrice(item.product.currentPrice)}
                  </td>
                  <td className="text-right p-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromWatchlist(item.product.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Your watchlist is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
