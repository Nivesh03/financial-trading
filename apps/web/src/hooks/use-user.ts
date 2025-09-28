import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { type SignIn, type SignUp } from "../types/user-schema";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
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
      toast.success("Sign in successful");
      await queryClient.invalidateQueries();
      router.invalidate();
      router.navigate({ to: "/" });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log(err.response);
        toast.error("Sign in failed", {
          description:
            `${err.response?.data.message} ` || "Invalid credentials",
        });
      }
      toast.error("Sign in failed", {
        description: "Invalid credentials",
      });
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
      toast.success("Sign up successful");
      await queryClient.invalidateQueries();
      router.invalidate();
      router.navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Sign up failed", {
        description: "Please try again later",
      });
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
      toast.success("Sign out successful");
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
