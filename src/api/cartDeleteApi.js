import { useMutation, useQueryClient } from "react-query";
import jwtAxios from "../util/jwtUtil";
import { SERVER_URL } from "./config";

export const cartDeleteApi = async ({ id }) => {
  const body = { data: { id: id } };
  try {
    const response = await jwtAxios.delete(
      `${SERVER_URL}/shoppingbasket`,
      body,
    );
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

export const useCartDeleteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(({ id }) => cartDeleteApi({ id }), {
    onSuccess: res => {
      queryClient.invalidateQueries(["cartQuery"]);
    },
    onError: error => {
      console.error("Error updating cart:", error);
    },
  });
  return { mutate, isLoading };
};
