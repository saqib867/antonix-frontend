import useOrderStore from "@/store/useOrderStore";
import axios, { type AxiosRequestConfig } from "axios";
import { v4 as uuidv4 } from "uuid";

// Extend AxiosRequestConfig to include custom idempotencyKey field
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  idempotencyKey?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE, // change as needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the idempotency key
api.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
