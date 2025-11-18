import { useState, useEffect } from "react";
import { getSales, Sales } from "../api/sales";

export const useSales = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sales, setSales] = useState<Sales[]>([]);

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSales();
      setSales(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const refetch = () => {
    fetchSales();
  };

  return {
    sales,
    loading,
    error,
    refetch,
  };
};
