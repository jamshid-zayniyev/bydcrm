import { api } from "@/api/axios";
import {
  BestStaff,
  kpiMonthly,
  KpiMostSoldCar,
  kpiRevenue,
  SalesPerformance,
  StaffReports,
  TestDriveMonth,
  TestDriveSales,
} from "@/types/kpi";
import { useEffect, useState } from "react";

const useKPI = () => {
  const [kpiMonthly, setKpiMonthly] = useState<kpiMonthly>();
  const [kpiRevenue, setKpiRevenue] = useState<kpiRevenue>();
  const [bestStaff, setBestStaff] = useState<BestStaff[]>([]);
  const [salesPerformance, setSalesPerformance] = useState<SalesPerformance[]>(
    []
  );
  const [kpiTestDriveMonthly, setKpiTestDriveMonthly] =
    useState<TestDriveMonth>();
  const [kpiMostSoldCar, setKpiMostSoldCar] = useState<KpiMostSoldCar>();
  const [kpiSales, setKpiSales] = useState<TestDriveSales>();
  const [kpiStaffReports, setKpiStaffReports] = useState<StaffReports[]>([]);

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

  const getKpiBestStaff = async () => {
    try {
      let { data } = await api.get("/kpi/best-staff/");
      setBestStaff(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKpiSalesPerformance = async () => {
    try {
      let { data } = await api.get("kpi/sales-performance/");
      setSalesPerformance(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKpiTestDriveMonthly = async () => {
    try {
      let { data } = await api.get("/kpi/test-drive/monthly/");
      setKpiTestDriveMonthly(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKpiMostSoldCar = async () => {
    try {
      let { data } = await api.get("/kpi/most-sold-car/");
      setKpiMostSoldCar(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKpiSales = async () => {
    try {
      let { data } = await api.get("/kpi/test-drive/sales/");
      setKpiSales(data);
    } catch (error) {
      console.log(error);
    }
  };

  // /kpi/staff-reports/
  const getKpiStaffReports = async () => {
    try {
      let { data } = await api.get("/kpi/staff-reports/");
      // console.log(data);
      setKpiStaffReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKpiMonthly();
    getKpiRevenue();
    getKpiStaffReports();
    getKpiBestStaff();
    getKpiSalesPerformance();
    getKpiTestDriveMonthly();
    getKpiMostSoldCar();
    getKpiSales();
  }, []);

  return {
    kpiMonthly,
    kpiRevenue,
    bestStaff,
    salesPerformance,
    kpiTestDriveMonthly,
    kpiMostSoldCar,
    kpiSales,
    kpiStaffReports,
  };
};

export default useKPI;
