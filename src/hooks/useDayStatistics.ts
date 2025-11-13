import { useState, useEffect } from "react";
import { Day, getDayStatistics } from "../api/dayStatistics";

export const useDayStatistics = () => {
  const [dayStatistics, setDayStatistics] = useState<Day[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDayStatistics();
      setDayStatistics(data);
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
    dayStatistics,
    loading,
    error,
    refetch,
  };
};
