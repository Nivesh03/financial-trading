import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "@tanstack/react-router";
const API_URL = import.meta.env.VITE_API_URL;

const getPortfolio = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/portfolio`, {
      withCredentials: true,
    });
    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getWatchlist = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/watchlist`, {
      withCredentials: true,
    });
    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await axios.delete(
        `${API_URL}/dashboard/watchlist/${productId}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "watchlist"] });
      router.invalidate();
    },
  });
};

export const dashboardQueries = {
  all: ["dashboard"],
  portfolio: queryOptions({
    queryKey: ["dashboard", "portfolio"],
    queryFn: getPortfolio,
    staleTime: 60000,
  }),
  watchlist: queryOptions({
    queryKey: ["dashboard", "watchlist"],
    queryFn: getWatchlist,
    staleTime: 60000,
  }),
};