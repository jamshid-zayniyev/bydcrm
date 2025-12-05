import { api } from "@/api/axios";
import { SalesStatistiks } from "@/types/kpi";
import { useEffect, useState } from "react";

const useKPI = () => {
  const [KPI, setKPI] = useState<SalesStatistiks[]>([]);

  const fetchKPI = async () => {
    try {
      // setLoading(true);
      // setError(null);
      const { data } = await api.get("/kpi/sales-performance");
      // setCars(data);
      console.log(data);
    } catch (err) {
      // setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchKPI();
  }, []);

  return {};
};

export default useKPI;
