import React, { useEffect, useState } from "react";

const useConnection = () => {
  const [connected, setConnected] = useState(navigator.onLine);
  useEffect(() => {
    const onOnline = () => setConnected(true);
    const onOffline = () => setConnected(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return { connected };
};

export default useConnection;
