import  { useCallback, useState } from "react";

const useStoreData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (configRequest, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(configRequest.url, {
        method: configRequest.method ? configRequest.method : "GET",
        body: configRequest.body ? JSON.stringify(configRequest.body) : null,
        headers: configRequest.headers ? configRequest.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useStoreData;
