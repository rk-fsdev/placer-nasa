import { useQuery, UseQueryOptions } from "react-query";
import { IMeteor } from "../types/interfaces";
import { getMeteors } from "./api";

export const QueryKeys = {
  GET_METEORS: "GET_METEORS",
};

export const useMeteors = (options?: UseQueryOptions<any>) =>
  useQuery<IMeteor[]>([QueryKeys.GET_METEORS], () => getMeteors(), options);
