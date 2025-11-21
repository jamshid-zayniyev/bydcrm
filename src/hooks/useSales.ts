import { useState, useEffect } from "react";
import {
  getSales,
  getSalesBanner,
  getSalesStatistics,
  Sales,
  SalesBanner,
  SalesStatistics,
} from "../api/sales";

export const useSales = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sales, setSales] = useState<Sales[]>([]);
  const [salesStatistics, setSalesStatistics] = useState<SalesStatistics>({
    total_income: "",
    completed_trade: "",
    average_check: "",
  });
  const [salesBanner, setSalesBanner] = useState<SalesBanner[]>([]);

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

  const fetchSalesStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSalesStatistics();
      setSalesStatistics(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesBanner = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSalesBanner();
      setSalesBanner(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
    fetchSalesStatistics();
    fetchSalesBanner();
  }, []);

  const refetch = () => {
    fetchSales();
  };

  return {
    sales,
    salesStatistics,
    salesBanner,
    loading,
    error,
    refetch,
  };
};
