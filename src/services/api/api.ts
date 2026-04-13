import { getErrorHandler } from "@/utils/errorHandler";
import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";


/** Thrown by apiRequest on non-2xx so mutations get onError, not onSuccess. */
export interface ApiRequestError extends Error {
  status?: number;
  message: string;
}

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const res = await axiosInstance.request(config);
    return res.data;
  } catch (error: unknown) {
    const message =
      typeof getErrorHandler(error) === "string"
        ? (getErrorHandler(error) as string)
        : "An unexpected error occurred.";
    const status = (error as { response?: { status?: number } })?.response
      ?.status;
    const err = new Error(message) as ApiRequestError;
    err.message = message;
    err.status = status;
    throw err;
  }
};

