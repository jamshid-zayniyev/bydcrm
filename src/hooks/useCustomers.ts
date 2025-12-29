import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";

import { api } from "../api/axios";
import {
  CarsModels,
  Customers,
  getCarsModels,
  getCustomers,
  getOneCustomer,
  getUsersStatus,
  UsersStatus,
} from "../api/customers";
import {
  Analytic,
  CustomersSelectVariants,
  Districed,
  StatusResponse,
} from "@/types/customers";
import { useAuthContext } from "@/contexts/AuthContext";

const createUserSchema = (t: any, role: string) =>
  z.object({
    full_name: z.string().min(1, "Ismni to‘liq kiriting"),
    phone_number: z
      .string()
      .min(1, "Telefon raqamni kiriting")
      .transform((val) => val.replace(/\s/g, "")) // Remove spaces for storage
      .refine((val) => /^\+998\d{9}$/.test(val), {
        message: "Telefon raqam formati noto'g'ri. Format: +998 XX XXX XX XX",
      }),
    source: z.string().optional(),
    interested_in: z.string().min(1, "Model tanlash shart!"),
    notes: z.string().min(1, "To‘liq kiriting"),
    status: z.string().optional(),
    location: z.string().optional(),
    variants: z.string().optional(),
    district: z.string().min(1, "Tuman yoki shahar tanlash shart!"),
    date_joined: z.string().optional(),
    ...(role === "sa" || role === "m"
      ? {
          assigned_to: z
            .string()
            .min(1, t("qr.manualRegistration.form.assignedTo.errorAssignedTo")),
        }
      : {}),
  });

export type User = z.infer<ReturnType<typeof createUserSchema>>;

export const useCustomers = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [carsModels, setCarsModels] = useState<CarsModels[]>([]);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [pgnCount, setPgnCount] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [usersStatus, setUsersStatus] = useState<UsersStatus[]>([]);
  const [loadingModel, setLoadingModel] = useState(false);
  const [variantSelect, setVariantSelect] = useState<CustomersSelectVariants[]>(
    []
  );
  const [district, setDistrict] = useState<Districed[]>([]);
  const [analytic, setAnalytic] = useState<Analytic | null>(null);
  const [totayStats, setTotayStats] = useState<StatusResponse | null>(null);
  const [totalLoading, setTotalLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const {
    user: { role },
  } = useAuthContext();
  const userSchema = createUserSchema(t, role);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      phone_number: "",
      full_name: "",
      source: "o",
      interested_in: "",
      district: "",
      date_joined: "",
      assigned_to: "",

      notes: "",
    },
  });

  const onSubmit = async (data: User) => {
    try {
      setLoading(true);
      console.log(Boolean(data?.date_joined));

      let newData = {
        ...data,
        // location: "Qarshi",
        // assigned_to: 2,
        // sentiment: "p",
        interested_in: Number(data?.interested_in),
        status: Number(data?.status),
        district: Number(data?.district),

        date_joined: data?.date_joined
          ? data?.date_joined
          : new Date().toISOString().split("T")[0],
        assigned_to: Number(data?.assigned_to),

        // interested_in: 3,
      };
      if (selected === null) {
        await api.post("/users/customers/create/", newData);
      } else {
        await api.put(`/users/customers/${selected}/`, newData);
      }
      closeModal();
      fetchUsers();
    } catch (err: any) {
      window.alert(err?.response?.data?.phone_number[0]);
      // window.alert(err.phone_number);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setShowAddModal(false);
    reset({
      phone_number: "",
      full_name: "",
      source: "o",
      interested_in: "",
      district: "",
      date_joined: "",
      assigned_to: "",

      notes: "",
    });
    setVariantSelect([]);
  };

  const fetchCarsModels = async () => {
    try {
      const data = await getCarsModels();
      setCarsModels(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsersStatus = async () => {
    try {
      const data = await getUsersStatus();
      setUsersStatus(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async (
    active = 1,
    search = "",
    status: string | number = "all",
    created_date = ""
  ) => {
    try {
      setLoading(true);
      setError(null);
      const { results, count } = await getCustomers(
        active,
        search,
        status,
        created_date
      );
      setCustomers(results);
      setPgnCount(count);

      setActivePage(active);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const editBtn = async (id: number) => {
    try {
      setSelected(id);
      let data = await getOneCustomer(id);

      reset({
        full_name: data.full_name,
        phone_number: data.phone_number,
        source: data.source,
        interested_in: `${data.interested_in}`,
        variants: `${data.variants}`,
        district: `${data.district}`,
        date_joined: `${data.date_joined}`,

        assigned_to: `${data.assigned_to}`,

        status: `${data.status}`,
        notes: data.notes,
      });

      if (data.interested_in) {
        await editFormSelect(data.interested_in);

        // API javobi kelgach, variant select ni to'g'ri qiymatga o'rnatish
        // Bu useEffect orqali bajariladi
      }

      setShowAddModal(true);
    } catch (err) {
      window.alert(err);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const deleteBtn = async (id: number) => {
    await api.delete(`/users/customers/${id}/`);
    closeDeleteModal();
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
    fetchCarsModels();
    fetchUsersStatus();
    getDistrict();
    getAnalytics();
    getTotayStats();
  }, []);

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

  const getDistrict = async () => {
    try {
      const { data } = await api.get(`/users/district/`);
      setDistrict(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAnalytics = async () => {
    try {
      setTotalLoading(true);
      const { data } = await api.get(`/users/analytics/`);
      setAnalytic(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTotalLoading(false);
    }
  };

  const getTotayStats = async () => {
    try {
      setTotalLoading(true);
      const { data } = await api.get(`/users/customers/today-stats/`);
      setTotayStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTotalLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    trigger,
    onSubmit,
    setShowAddModal,
    showAddModal,
    editBtn,
    selected,
    deleteBtn,
    closeDeleteModal,
    openDeleteModal,
    isDeleteModal,
    closeModal,
    carsModels,
    usersStatus,

    pgnCount,
    activePage,
    fetchUsers,
    fetchCarsModels,
    setActivePage,

    customers,
    loading,
    error,
    // refetch,
    editFormSelect,
    loadingModel,
    variantSelect,
    district,
    analytic,
    totayStats,
    totalLoading,
  };
};
