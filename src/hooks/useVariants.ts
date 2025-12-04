import { api } from "@/api/axios";
import {
  CarsColorArray,
  CarsSeries,
  createVariantsSchema,
  GetVariants,
  VariantsSchema,
} from "@/types/cars";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useVariants = (carId?: number) => {
  const { t } = useTranslation();
  const carVariants = createVariantsSchema(t);
  const [showAddModal, setShowAddModal] = useState(false);
  const [variantsData, setVariantsData] = useState<GetVariants[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [isDeleteModal, setDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [variantsColor, setVariantsColor] = useState<CarsColorArray[]>([]);
  const [carsSeries, setCarsSeries] = useState<CarsSeries[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<VariantsSchema>({
    resolver: zodResolver(carVariants),
    defaultValues: {
      series: "",
      // color: "",
      battery_uz: "",
      battery_ru: "",
      range_uz: "",
      range_ru: "",
      price: "",
      stock: "",
    },
  });

  const onSubmit = async (data: VariantsSchema) => {
    try {
      let newData = {
        ...data,
        car: carId,
        series: Number(data?.series),
        color: Number(data?.color),
        price: Number(data?.price),
        stock: Number(data?.stock),
      };
      if (selected === null) {
        await api.post("/cars/variants/create/", newData);
      } else {
        await api.put(`/cars/variants/detail/${selected}/`, newData);
      }
      closeModal();

      if (carId) {
        await fetchVariables(carId);
        await getColors(carId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVariables = async (id: number) => {
    try {
      setLoading(true);
      // setError(null);
      const { data } = await api.get(`/cars/variants/${id}/`);

      console.log(data[0]);

      setVariantsData(data[0]?.variants);
    } catch (err) {
      // setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setShowAddModal(false);
    reset({
      series: "",
      color: "",
      battery_uz: "",
      battery_ru: "",
      range_uz: "",
      range_ru: "",
      price: "",
      stock: "",
    });
  };

  const editBtn = async (id: number) => {
    try {
      setSelected(id);
      let { data } = await api.get(`/cars/variants/detail/${id}/`);
      reset({
        ...data,
        color: `${data.color}`,
        price: `${data.price}`,
        stock: `${data.stock}`,
      });
      setShowAddModal(true);
    } catch (error) {
      window.alert(error);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const deleteBtn = async (id: number) => {
    await api.delete(`/cars/variants/detail/${id}/`);
    closeDeleteModal();
    if (carId) {
      await fetchVariables(carId);
    }
  };

  const getColors = async (id: number) => {
    try {
      setLoading(true);
      // setError(null);
      const { data } = await api.get(`/cars/variants/colors/${id}/`);
      setVariantsColor(data);
    } catch (err) {
      // setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCarsSeries = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/cars/series/${id}/`);
      setCarsSeries(data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Form
    handleSubmit,
    onSubmit,
    errors,
    register,
    control,
    // setValue,
    // watch,

    // Modal
    setShowAddModal,
    showAddModal,
    closeModal,

    // getData
    fetchVariables,
    variantsData,

    loading,

    // Edit and Delete
    editBtn,
    openDeleteModal,
    closeDeleteModal,
    isDeleteModal,
    setSelectedItemId,
    selectedItemId,
    deleteBtn,

    selected,

    // getDataColor
    getColors,
    variantsColor,

    getCarsSeries,
    carsSeries,
  };
};
