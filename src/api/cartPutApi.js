import { useMutation, useQueryClient } from "react-query";
import jwtAxios from "../util/jwtUtil";
import { SERVER_URL } from "./config";

export const cartPutApi = async ({ code, amount }) => {
  const body = {
    id: code,
    amount: amount,
  };

  try {
    const response = await jwtAxios.put(`${SERVER_URL}/shoppingbasket`, body);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("no");
    }
  } catch (error) {
    console.log(error);
  }
};

export const useCartPutMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ({ code, amount }) => cartPutApi({ code, amount }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cartQuery"]);
      },
      onError: error => {
        console.error("Error updating cart:", error);
      },
    },
  );
  return { mutate, isLoading };
};
