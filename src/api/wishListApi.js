import { SERVER_URL } from "./config";
import jwtAxios from "../util/jwtUtil";
import { useMutation, useQueryClient } from "react-query";

const prefix = `${SERVER_URL}/favorites`;

export const getWishList = async () => {
  try {
    const url = `${prefix}/list`;
    const res = await jwtAxios.get(url);

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      return res.data;
    } else {
      alert("메인 모스트 데이터 불러오기 실패");
    }
  } catch (error) {
    alert(error);
  }
};

export const deleteWish = async ({ code }) => {
  try {
    const url = `${prefix}`;
    const res = await jwtAxios.delete(url, { data: { code: code.code } });

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      return res.data;
    } else {
      console.log("실패");
    }
  } catch (error) {
    console.log("err", error);
  }
};

export const useWishDeleteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(code => deleteWish({ code }), {
    onSuccess: res => {
      queryClient.invalidateQueries(["wishQuery"]);
    },
    onError: error => {
      console.error("Error updating cart:", error);
    },
  });
  return { mutate, isLoading };
};

export const postWish = async ({ code }) => {
  try {
    // const url = `${prefix}?code=${code.code}`;
    const url = `${prefix}`;
    const res = await jwtAxios.post(url, code);

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      return res.data;
    } else {
      console.log("er");
    }
  } catch (error) {
    console.log("er", error);
  }
};

export const useWishPostMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(code => postWish({ code }), {
    onSuccess: res => {
      queryClient.invalidateQueries(["wishQuery"]);
    },
    onError: error => {
      console.error("Error updating cart:", error);
    },
  });
  return { mutate, isLoading };
};

export const wishPostCheck = async ({ code }) => {
  try {
    // const url = `${prefix}?code=${code.code}`;
    const url = `${prefix}/check`;
    const res = await jwtAxios.post(url, code);
    if (res.status === 200) {
      return res;
    } else {
      console.log("데이터 불러오기 실패");
    }
  } catch (error) {
    console.log(error);
  }
};

export const useWishPostCheckMutation = ({ setHeartChecked }) => {
  const { mutate, isLoading } = useMutation(code => wishPostCheck({ code }), {
    onSuccess: data => {
      setHeartChecked(data.data);
    },
    onError: error => {
      console.error("처리 중 오류가 발생했습니다:", error);
    },
  });
  return { mutate, isLoading };
};
