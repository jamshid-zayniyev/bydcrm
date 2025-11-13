import { useState, useEffect } from "react";
import { getPieChart, PieChart } from "../api/pieChart";

export const usePieChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pieChart, setPieChart] = useState<PieChart[]>([]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPieChart();
      setPieChart(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const refetch = () => {
    fetchCars();
  };

  return {
    pieChart,
    loading,
    error,
    refetch,
  };
};
