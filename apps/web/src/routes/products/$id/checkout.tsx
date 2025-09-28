import { Button } from "@/components/ui/button";
import { useBuyProduct } from "@/hooks/use-products";
import { formatPrice } from "@/lib/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import z from "zod";
import { allProductQueries } from "@/hooks/use-products";
import { toast } from "sonner";
export const Route = createFileRoute("/products/$id/checkout")({
  beforeLoad: async ({ params: { id }, context: { queryClient, user } }) => {
    if (!user) {
      toast.error("Must be logged in")
      throw redirect({ to: "/" });
    }
    const product = await queryClient.ensureQueryData(
      allProductQueries.getProductByIdQuery(id)
    );
    return { product };
  },
  validateSearch: z.object({
    quantity: z.number().min(1),
  }),
  component: RouteComponent,
});
function RouteComponent() {
  const { quantity } = Route.useSearch();
  const { id: productId } = Route.useParams();
  const { product } = Route.useRouteContext();
  const { mutate, isPending } = useBuyProduct();
  const { productDetails } = product;
  const { name, productType, pricePerUnit } = productDetails;
  const handleSubmit = () => {
    mutate({ productId, quantity });
  };
  return (
    <div className="min-w-xl max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Order summary</h2>
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-lg font-semibold">{formatPrice(pricePerUnit)}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Type</h3>
          <p className="text-lg font-semibold">
            {productType === "stock" ? "Stock" : "Mutual Fund"}
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-muted-foreground">Quantity</p>
          <p>{quantity}</p>
        </div>
        <div className="flex justify-between items-center font-bold text-xl">
          <p>Total</p>
          <p>{formatPrice(pricePerUnit * quantity)}</p>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full mt-6"
        disabled={isPending}
      >
        {isPending ? "Processing..." : "Confirm Buy"}{" "}
        <ArrowRight className="size-4 ml-1.5 inline" />
      </Button>
    </div>
  );
}
