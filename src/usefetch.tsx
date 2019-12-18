import { useState, useEffect } from "react";
import { UseFetchResponse, FetchArgs, Res } from "./type";
import timeout from "./timeout";

export default function useFetch(a: FetchArgs | string): UseFetchResponse {
  var arg: FetchArgs = { url: "" };
  if (typeof a === "string") {
    arg.url = a as string;
  } else arg = a;

  // ---- State
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState<Res>({
    data: null,
    error: null
  });

  // ---- API
  const fetchData = async (url?: string) => {
    // onError(null)
    const c = new AbortController();
    const timeOutId = timeout(
      c,
      () => {
        setRes({ data: null, error: new Error("Timed out") });
        setIsLoading(false);
      },
      arg.timeout
    );

    try {
      setIsLoading(true);
      console.log(url && typeof url == "string" ? url : arg.url);
      const res = await fetch(url && typeof url == "string" ? url : arg.url, {
        ...arg.options,
        signal: c.signal
      });
      res
        .json()
        .then(res => {
          setRes({ data: res, error: null });
        })
        .catch(err => {
          setRes({ data: null, error: err });
        });
    } catch (e) {
      setRes({ data: null, error: e });
    } finally {
      clearTimeout(timeOutId);
      setIsLoading(false);
    }
  };

  useEffect(
    () => {
      fetchData();
    },
    arg.onUpdate ? arg.onUpdate : []
  );

  return {
    data: res.data,
    isLoading: isLoading,
    error: res.error,
    retry: fetchData
  };
}
