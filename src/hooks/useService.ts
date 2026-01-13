import { useState, useEffect } from "react";

import { api } from "../api/axios";
import {
  Employees,
  Reports,
  Service,
  ServiceFormData,
  serviceSchema,
  ServicesType,
  WeeklyStatistic,
} from "../types/service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomersSelectVariants } from "@/types/customers";
import { CustomersList } from "@/types/testDrive";

export const useService = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      // customer_name: "",
      // vehicle: 0,
      // service_type: "",
      date: new Date().toISOString().split("T")[0],
      // status: "",
      // technician: 0,
      // rate: 5,
    },
  });
  const [service, setService] = useState<ServicesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [pgnCount, setPgnCount] = useState<number | null>(null);
  const [serives, setSerives] = useState<Service[]>([]);
  const [weeklyStatistic, setWeeklyStatistic] = useState<WeeklyStatistic[]>([]);
  const [reports, setReports] = useState<Reports>({
    total_request: 0,
    completed: 0,
    average_rating: 0,
  });
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [variantSelect, setVariantSelect] = useState<CustomersSelectVariants[]>(
    []
  );
  const [carustomersList, setCustomersList] = useState<CustomersList[]>([]);

  const fetchService = async (
    active = 1,
    search = "",
    status: string = "",
    service_type: string = "",
    date: string = ""
  ) => {
    try {
      setLoading(true);
      setError(null);
      const {
        data: { results, count },
      } = await api.get(
        `/serives/?page=${active}&search=${search}&status=${status}&service_type=${service_type}&date=${date}`
      );
      setService(results);

      setPgnCount(count);

      setActivePage(active);
      getWeeklyStatistic();
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setLoadingPost(true);
      let newData = {
        ...data,
        customer_id: Number(data?.customer_id),
        vehicle: Number(data?.vehicle),
        technician: Number(data?.technician),
        service_type: Number(data?.service_type),
        rate: Number(data?.rate),
      };

      if (selected === null) {
        await api.post("/serives/create/", newData);
      } else {
        await api.put(`/serives/${selected}/`, newData);
      }
      closeModal();
      fetchService();
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoadingPost(false);
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await api.get("/users/technicians/");
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const getSerives = async () => {
    try {
      const { data } = await api.get("/serives/types/");
      setSerives(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setShowAddModal(false);
    reset({
      // customer_name: "",
      date: new Date().toISOString().split("T")[0],
    });
    setVariantSelect([]);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const deleteBtn = async (id: number) => {
    await api.delete(`/serives/${id}/`);
    closeDeleteModal();
    fetchService();
  };

  const getWeeklyStatistic = async () => {
    try {
      const { data } = await api.get("/serives/weekly-statistic/");
      setWeeklyStatistic(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const getReports = async () => {
    try {
      const { data } = await api.get("/serives/reports/");
      setReports(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchService();
    getEmployees();
    getSerives();
    getWeeklyStatistic();
    getReports();

    getCustomersList();
  }, []);

  const refetch = () => {
    fetchService();
  };

  const editBtn = async (id: number) => {
    try {
      setSelected(id);
      let { data } = await api.get(`/serives/${id}/`);
      console.log(data);

      reset({
        customer_id: `${data.customer_id}`,
        // customer_name: data.customer_name,
        date: data.date,
        rate: `${data.rate}`,
        service_type: `${data.service_type}`,
        status: data.status,
        technician: `${data.technician}`,
        vehicle: `${data.vehicle}`,
        variants: `${data.variants}`,
      });

      if (data.vehicle) {
        await editFormSelect(data.vehicle);
      }

      setShowAddModal(true);
    } catch (err) {
      window.alert(err);
    }
  };

  const editFormSelect = async (id: number) => {
    try {
      setLoadingModel(true);

      const { data } = await api.get(`/cars/variants/${id}/`);
      console.log(data);

      setVariantSelect(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingModel(false);
    }
  };

  const getCustomersList = async (search = "") => {
    try {
      const { data } = await api.get("/users/customers/list/", {
        params: {
          search,
        },
      });
      setCustomersList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    errors,
    control,
    register,
    handleSubmit,
    onSubmit,
    setShowAddModal,
    showAddModal,
    closeModal,
    service,
    employees,
    loading,
    error,
    refetch,
    editBtn,
    selected,
    deleteBtn,
    closeDeleteModal,
    openDeleteModal,
    isDeleteModal,
    setActivePage,
    pgnCount,
    activePage,
    fetchService,
    serives,
    weeklyStatistic,
    reports,

    loadingPost,

    editFormSelect,
    loadingModel,
    variantSelect,

    carustomersList,
    getCustomersList,
  };
};
