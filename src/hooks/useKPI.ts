import { api } from "@/api/axios";
import { useAuthContext } from "@/contexts/AuthContext";
import { User } from "@/types/auth";
import {
  BestStaff,
  generalStatistics,
  kpiMonthly,
  KpiMostSoldCar,
  kpiRevenue,
  last5Months,
  monthlyId,
  SalesPerformance,
  StaffReports,
  staffReports2,
  TestDriveMonth,
  TestDriveSales,
  Weekly,
  WeeklyIndicators,
  yearly,
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
  const [customersId, setCustomersId] = useState<monthlyId>();
  const [yearly, setYearly] = useState<yearly>();
  const [weeklyData, setWeeklyData] = useState<Weekly>();
  const [weeklyIndicatorsData, setWeeklyIndicatorsData] = useState<
    WeeklyIndicators[]
  >([]);
  const [last5MonthsData, setLast5MonthsData] = useState<last5Months[]>([]);
  const [staffReports2Data, setStaffReports2Data] = useState<staffReports2>();
  const [generalStatisticsData, setGeneralStatisticsData] =
    useState<generalStatistics>();

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

  const getKpiStaffReports = async () => {
    try {
      let { data } = await api.get("/kpi/staff-reports/");
      // console.log(data);
      setKpiStaffReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  /*const btnEmployeeId = async (id: number, user: User) => {
    try {
      // const { data } = await api.get(`/kpi/staff-reports/monthly/${id}/`);
      // if (user.role !== "t") {
      //   const res2 = await api.get(`/kpi/staff-reports/year-record/${id}/`);
      //   const res3 = await api.get(`/kpi/staff-reports/weekly/${id}`);
      // }

      if (user.role === "t") {
      const { data } = await api.get(`/kpi/staff-reports/monthly/${id}/`);
      
      } else {
        const res2 = await api.get(`/kpi/staff-reports/year-record/${id}/`);
        const res3 = await api.get(`/kpi/staff-reports/weekly/${id}`);
        const res1 = await api.get(`/kpi/staff-reports/monthly/${id}/`);

      }

      // const [monthlyRes, yearlyRes, weekly] = await Promise.all([
      //   api.get(`/kpi/staff-reports/monthly/${id}/`),
      //   api.get(`/kpi/staff-reports/year-record/${id}/`),
      //   api.get(`/kpi/staff-reports/weekly/${id}`),
      // ]);

      setCustomersId(data);
      setYearly(res2?.data);
      console.log(res3?.data);
    } catch (error) {
      console.log(error);
    }
  };*/

  const btnEmployeeId = async (id: number, user: string) => {
    try {
      let monthlyData = null;
      let yearlyData = null;
      let weeklyData = null;
      let weeklyIndicatorsData = null;
      let last5MonthsData = null;
      let staffReports2Data = null;

      console.log(user);

      if (user === "t") {
        const { data } = await api.get(`/kpi/staff-reports/monthly/${id}/`);
        const res = await api.get(`/kpi/staff-reports/${id}/`);
        monthlyData = data;
        staffReports2Data = res.data;
      } else if (user === "s") {
        const [
          monthlyRes,
          yearlyRes,
          weeklyRes,
          weeklyIndicators,
          last5Months,
          staffReports2,
        ] = await Promise.all([
          api.get(`/kpi/staff-reports/monthly/${id}/`),
          api.get(`/kpi/staff-reports/year-record/${id}/`),
          api.get(`/kpi/staff-reports/weekly/${id}`),
          api.get(`/kpi/staff-reports/weekly-indicators/${id}/`),
          api.get(`/kpi/staff-reports/last-5-months/${id}/`),
          api.get(`/kpi/staff-reports/${id}/`),
        ]);

        monthlyData = monthlyRes.data;
        yearlyData = yearlyRes.data;
        weeklyData = weeklyRes.data;
        weeklyIndicatorsData = weeklyIndicators.data;
        last5MonthsData = last5Months?.data;
        staffReports2Data = staffReports2.data;
      } else {
        const [monthlyRes, yearlyRes, weeklyRes, staffReports2] =
          await Promise.all([
            api.get(`/kpi/staff-reports/monthly/${id}/`),
            api.get(`/kpi/staff-reports/year-record/${id}/`),
            api.get(`/kpi/staff-reports/weekly/${id}`),
            api.get(`/kpi/staff-reports/${id}/`),
          ]);

        monthlyData = monthlyRes.data;
        yearlyData = yearlyRes.data;
        weeklyData = weeklyRes.data;
        staffReports2Data = staffReports2.data;
      }
      let generalStatistics = await api.get(`/kpi/general-statistics/${id}/`);

      setCustomersId(monthlyData);
      setYearly(yearlyData);
      setWeeklyData(weeklyData);
      setWeeklyIndicatorsData(weeklyIndicatorsData);
      setLast5MonthsData(last5MonthsData);
      setStaffReports2Data(staffReports2Data);
      setGeneralStatisticsData(generalStatistics?.data);
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
    btnEmployeeId,
    customersId,
    yearly,
    weeklyData,
    weeklyIndicatorsData,
    last5MonthsData,
    staffReports2Data,
    generalStatisticsData,
  };
};

export default useKPI;
