import { useState, useEffect } from "react";
import { getPieChart, PieChart } from "../api/pieChart";
import { api } from "@/api/axios";
import { bestSeller } from "@/types/dashboard";
import { Reports } from "@/types/kpi";

export const usePieChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pieChart, setPieChart] = useState<PieChart[]>([]);
  const [bestSeller, setBestSeller] = useState<bestSeller[]>([]);
  const [reports, setReports] = useState<Reports>({
    customers: {
      total: 0,
      current_month: 0,
      last_month: 0,
      percent_change: 0,
    },
    calls: {
      today: 0,
      yesterday: 0,
      percent_change: 0,
    },
    sales: {
      current_month: 0,
      last_month: 0,
      percent_change: 0,
    },
  });

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

  const getReports = async () => {
    try {
      // setLoading(true);
      // setError(null);
      const { data } = await api.get("/reports/");
      // setCars(data);
      setReports(data);
    } catch (err) {
      // setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const refetch = () => {
    fetchCars();
    getReports();
  };

  return {
    pieChart,
    loading,
    error,
    refetch,
    bestSeller,
    reports,
  };
};
