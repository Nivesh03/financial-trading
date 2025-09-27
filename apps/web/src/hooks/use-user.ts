import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { type SignIn, type SignUp } from "../../types/user-schema";
import { useRouter } from "@tanstack/react-router";
const API_URL = import.meta.env.VITE_API_URL;

export const getUser = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/get-user`, {
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

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: SignIn) => {
      const res = await axios.post(`${API_URL}/auth/sign-in`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.invalidate();
      router.navigate({ to: "/" });
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: SignUp) => {
      const res = await axios.post(`${API_URL}/auth/sign-up`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.invalidate();
      router.navigate({ to: "/" });
    },
  });
};
export const useLogOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      await axios.post(
        `${API_URL}/auth/sign-out`,
        {},
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.invalidate();
      router.navigate({ to: "/" });
    },
  });
};

export const allAuthQueries = {
  all: ["auth"],
  getUserQuery: () =>
    queryOptions({
      queryKey: [...allAuthQueries.all, "user"],
      queryFn: getUser,
      staleTime: Infinity,
    }),
};
