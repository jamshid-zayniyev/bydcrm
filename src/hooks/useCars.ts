import { useState, useEffect } from 'react';
import { carsApi, Car } from '../api/cars';

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await carsApi.getAllCars();
      setCars(data);
    } catch (err) {
      setError('Mashinalarni yuklab boʻlmadi');
      console.error('Error fetching cars:', err);
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
    loading,
    error,
    refetch,
  };
};