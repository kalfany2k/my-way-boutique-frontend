import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosRequestConfig, CanceledError } from "axios";

export interface PaginatedResponse<T> {
  items: T[];
  count: number;
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[],
) => {
  const [error, setError] = useState("");
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);

      apiClient
        .get<PaginatedResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((response) => {
          setData(response.data.items);
          setCount(response.data.count);
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return;
          setError(error.message);
          setLoading(true);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : [],
  );

  return { data, count, error, isLoading };
};

export default useData;
