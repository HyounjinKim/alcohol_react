import { useMutation, useQueryClient } from "react-query";
import jwtAxios from "../util/jwtUtil";
import { SERVER_URL } from "./config";

export const cartAllDeleteApi = async () => {
  try {
    const response = await jwtAxios.delete(`${SERVER_URL}/shoppingbasket/all`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("no");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useCartAllDeleteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(() => cartAllDeleteApi(), {
    onSuccess: res => {
      queryClient.invalidateQueries(["cartQuery"]);
    },
    onError: error => {
      console.error("Error updating cart:", error);
    },
  });
  return { mutate, isLoading };
};
