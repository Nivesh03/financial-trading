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

export const allProductQueries = {
  all: ["products"],
  getAllProductsQuery: () =>
    queryOptions({
      queryKey: [...allProductQueries.all, "all-products"],
      queryFn: getAllProducts,
      staleTime: 60000,
    }),
};
