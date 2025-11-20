import { useState, useEffect } from "react";
import {
  getSales,
  getSalesStatistics,
  Sales,
  SalesStatistics,
} from "../api/sales";
import { CallCenter, getCallCenter } from "../api/callCenter";

export const useCallCenter = () => {
  const [callCenter, setCallCenter] = useState<CallCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCallCenter = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCallCenter();
      setCallCenter(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallCenter();
  }, []);

  const refetch = () => {
    fetchCallCenter();
  };

  return {
    callCenter,
    loading,
    error,
    refetch,
  };
};
