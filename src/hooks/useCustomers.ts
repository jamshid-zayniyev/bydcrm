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
} from "../api/customers";

const createUserSchema = (t: any) =>
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
    interested_in: z.string().optional(),
    notes: z.string().min(1, "To‘liq kiriting"),
  });

export type User = z.infer<ReturnType<typeof createUserSchema>>;

export const useCustomers = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [carsModels, setCarsModels] = useState<CarsModels[]>([]);
  const [isDeleteModal, setDeleteModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const userSchema = createUserSchema(t);

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
      // interested_in: "",
      notes: "",
    },
  });

  const onSubmit = async (data: User) => {
    try {
      setLoading(true);
      console.log(data);

      let newData = {
        ...data,
        location: "Qarshi",
        assigned_to: 2,
        sentiment: "p",
        interested_in: Number(data?.interested_in),
        // interested_in: 3,
      };
      if (selected === null) {
        await api.post("/users/customers/create/", newData);
      } else {
        await api.put(`/users/customers/${selected}/`, newData);
      }
      closeModal();
      fetchUsers();
    } catch (err) {
      window.alert(err);
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
      // interested_in: "",
      notes: "",
    });
  };

  const fetchCarsModels = async () => {
    try {
      const data = await getCarsModels();
      setCarsModels(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCustomers();
      setCustomers(data);
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
      console.log(data);

      reset({
        full_name: data.full_name,
        phone_number: data.phone_number,
        source: data.source,
        interested_in: `${data.interested_in}`,
        notes: data.notes,
      });
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
  }, []);

  // const refetch = () => {
  //   fetchUsers();
  // };

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

    customers,
    loading,
    error,
    // refetch,
  };
};
