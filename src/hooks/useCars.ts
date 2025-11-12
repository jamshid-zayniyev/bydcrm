import { useState, useEffect } from "react";
import {
  carsApi,
  Car,
  getWeekStatistics,
  Week,
  getMonthStatistics,
  Month,
  getDayStatistics,
  Day,
  getPieChart,
  PieChart,
} from "../api/cars";

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [weekStatistics, setWeekStatistics] = useState<Week[]>([]);
  const [monthStatistics, setMonthStatistics] = useState<Month[]>([]);
  const [dayStatistics, setDayStatistics] = useState<Day[]>([]);
  const [pieChart, setPieChart] = useState<PieChart[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      // const data = await carsApi.getAllCars();
      // setCars(data);

      const [
        carsData,
        weekStatistics,
        monthStatistics,
        dayStatistics,
        pieChart,
      ] = await Promise.all([
        carsApi.getAllCars(),
        getWeekStatistics(),
        getMonthStatistics(),
        getDayStatistics(),
        getPieChart(),
      ]);

      setCars(carsData);
      setWeekStatistics(weekStatistics);
      setMonthStatistics(monthStatistics);
      setDayStatistics(dayStatistics);
      setPieChart(pieChart);
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
    cars,
    weekStatistics,
    monthStatistics,
    dayStatistics,
    pieChart,
    loading,
    error,
    refetch,
  };
};
