import React from "react";

/**
 * Stripped-down version of react-query. FOR DEMO PURPOSES ONLY. Has poor types.
 */
export const useQuery = <T = undefined>(
  depList: unknown[],
  query: () => Promise<T>,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: T) => void;
  },
) => {
  const { enabled = true, onSuccess } = {
    ...options,
  };
  const [data, setData] = React.useState<T>();
  const [status, setStatus] = React.useState<
    "error" | "idle" | "loading" | "success"
  >("idle");

  const fetch = React.useCallback(async () => {
    setStatus("loading");
    try {
      const newData = await query();
      setData(newData);
      setStatus("success");
      onSuccess?.(newData);
    } catch (e) {
      setData(e);
      setStatus("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depList);

  React.useEffect(() => {
    if (enabled) {
      fetch();
    }
  }, [enabled, fetch]);

  return {
    data,
    isError: status === "error",
    isIdle: status === "idle",
    isLoading: status === "loading",
    isSuccess: status === "success",
    refetch: fetch,
    status,
  };
};
