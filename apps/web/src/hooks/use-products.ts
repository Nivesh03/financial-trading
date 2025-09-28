import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "@tanstack/react-router";
const API_URL = import.meta.env.VITE_API_URL;

const getAllProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/products/${id}`);
    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useBuyProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const res = await axios.post(
        `${API_URL}/transactions/buy`,
        {
          productId,
          quantity,
        },
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.invalidate();
      router.navigate({ to: "/" });
    },
  });
};

export const allProductQueries = {
  all: ["products"],
  getAllProductsQuery: () =>
    queryOptions({
      queryKey: [...allProductQueries.all, "all-products"],
      queryFn: getAllProducts,
      staleTime: 60000,
    }),
  getProductByIdQuery: (id: string) =>
    queryOptions({
      queryKey: [...allProductQueries.all, id],
      queryFn: () => getProductById(id),
      staleTime: 60000,
    }),
};
