import { api } from "@/api/axios";
import { useAuthContext } from "@/contexts/AuthContext";
import { User } from "@/types/auth";
import {
  BestStaff,
  createEmployeeSchema,
  createKpiSchema,
  Employee,
  generalStatistics,
  kpiMonthly,
  KpiMostSoldCar,
  kpiRevenue,
  KpiSchema,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const useKPI = () => {
  const { t } = useTranslation();
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
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const kpiSchema = createKpiSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<KpiSchema>({
    resolver: zodResolver(kpiSchema),
    defaultValues: {
      target: "",
    },
  });

  const {
    register: registerEmployee,
    handleSubmit: handleSubmitEmployee,
    reset: resetEmployee,
  } = useForm<Employee>({
    resolver: zodResolver(createEmployeeSchema()),
    defaultValues: {
      target: "",
      revenue_target: "",
      rating_target: "",
    },
  });

  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);

  const [showAddModalEmpolyee, setShowAddModalEmpolyee] = useState(false);

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

  const btnEmployeeId = async (id: number, user: string) => {
    try {
      setLoading(true);
      let monthlyData = null;
      let yearlyData = null;
      let weeklyData = null;
      let weeklyIndicatorsData = null;
      let last5MonthsData = null;
      let staffReports2Data = null;

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
    } finally {
      setLoading(false);
    }
  };

  const closeSalesModal = () => {
    setShowAddModal(false);
    reset({
      target: "",
    });
  };

  const closeRevenueModal = () => {
    setShowRevenueModal(false);
    reset({
      target: "",
    });
  };

  const closePerformanceModal = () => {
    setShowPerformanceModal(false);
    reset({
      target: "",
    });
  };

  const onSubmit = async (data: KpiSchema) => {
    try {
      setLoading(true);
      await api.put("/kpi/monthly-sales-target/", data);

      getKpiMonthly();
      closeSalesModal();
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitRevenue = async (data: KpiSchema) => {
    try {
      setLoading(true);
      await api.put("/kpi/monthly-revenue-target/", data);

      getKpiRevenue();
      closeRevenueModal();
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPerformance = async (data: KpiSchema) => {
    try {
      setLoading(true);
      await api.put("/kpi/employee-performance-target/", data);

      getKpiSalesPerformance();
      closePerformanceModal();
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const [currentId, setCurrentId] = useState<number | null>(null);
  const addSellerId = async (id: number) => {
    setShowAddModalEmpolyee(true);
    setCurrentId(id);
    let { data } = await api.get(`/kpi/staff-reports/${id}/`);

    resetEmployee({
      target: data?.sales?.target || "",
      revenue_target: data?.revenue?.target || "",
      rating_target: data?.rating?.target || "",
    });
  };
  const closeModalEmpolyee = () => {
    setShowAddModalEmpolyee(false);
    resetEmployee({
      target: "",
      revenue_target: "",
      rating_target: "",
    });
  };

  const onSubmitEmployee = async (objForm: Employee) => {
    console.log(currentId);
    let newData = {
      ...objForm,
      target: objForm?.target ? Number(objForm?.target) : null,
      revenue_target: objForm?.revenue_target
        ? Number(objForm?.revenue_target)
        : null,
      rating_target: objForm?.rating_target ? objForm?.rating_target : null,
    };
    await api.put(`/kpi/seller-kpi-target/${currentId}/`, newData);
    getKpiStaffReports();
    closeModalEmpolyee();
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
    loading,

    closeSalesModal,
    showAddModal,
    setShowAddModal,

    onSubmit,
    handleSubmit,
    register,
    errors,

    closeRevenueModal,
    showRevenueModal,
    setShowRevenueModal,

    closePerformanceModal,
    showPerformanceModal,
    setShowPerformanceModal,
    onSubmitRevenue,
    onSubmitPerformance,
    addSellerId,

    registerEmployee,
    handleSubmitEmployee,

    onSubmitEmployee,
    showAddModalEmpolyee,
    closeModalEmpolyee,
  };
};

export default useKPI;
