import axios, { AxiosResponse } from "axios";
import { PostReissue } from "../user/postReissue";

const BASE_URL = "https://codin.inu.ac.kr/api";

export const GetComments = async (postId: string | string[]): Promise<any> => {
  axios.defaults.withCredentials = true;
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/comments/post/${postId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      console.error("Error response:", status, data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw error;
  }
};
