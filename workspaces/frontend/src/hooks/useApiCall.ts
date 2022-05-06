import { useCallback, useState } from "react";

interface IUseApiCall<TResult> {
  value: TResult | null;
  isLoading: boolean;
  error: Error | null;

  execute: () => void;
}

export function useApiCall<TResult>(
  callback: () => Promise<TResult>
): IUseApiCall<TResult> {
  const [value, setValue] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      const value = await callback();
      setValue(value);
      setError(null);
    } catch (err: any) {
      setError(err);
      setValue(null);
    }
    setIsLoading(false);
  }, [callback]);

  return {
    value,
    isLoading,
    error,

    execute,
  };
}