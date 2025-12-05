import { api } from "@/api/axios";
import { kpiMonthly, kpiRevenue } from "@/types/kpi";
import { useEffect, useState } from "react";

const useKPI = () => {
  const [kpiMonthly, setKpiMonthly] = useState<kpiMonthly>();
  const [kpiRevenue, setKpiRevenue] = useState<kpiRevenue>();
  const getKpiMonthly = async () => {
    try {
      let { data } = await api.get("/kpi/monthly/");
      setKpiMonthly(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKpiRevenue = async () => {
    try {
      let { data } = await api.get("/kpi/revenue/");
      setKpiRevenue(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKpiMonthly();
    getKpiRevenue();
  }, []);

  return {
    kpiMonthly,
    kpiRevenue,
  };
};

export default useKPI;
