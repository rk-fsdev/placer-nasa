import axios, { AxiosInstance } from "axios";
import { IMeteor } from "../types/interfaces";

let axiosInstance: AxiosInstance;

const baseURL: string = "https://data.nasa.gov/resource";

axiosInstance = axios.create({
  baseURL,
});

const getRequest = async <T, K = any>(
  url: string,
  params: K = null as any
): Promise<T> => {
  const response = await axiosInstance.get(url, { params });
  return response.data as T;
};

// NASA API

export const getMeteors = () => getRequest<IMeteor[]>(`/y77d-th95.json`);
