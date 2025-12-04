import { useState, useEffect } from "react";
import { getPieChart, PieChart } from "../api/pieChart";
import { api } from "@/api/axios";
import { bestSeller } from "@/types/dashboard";

export const usePieChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pieChart, setPieChart] = useState<PieChart[]>([]);
  const [bestSeller, setBestSeller] = useState<bestSeller[]>([]);

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

  const getBestSeller = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/reports/best-seller/");

      setBestSeller(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    getBestSeller();
  }, []);

  const refetch = () => {
    fetchCars();
  };

  return {
    pieChart,
    loading,
    error,
    refetch,
    bestSeller,
  };
};
