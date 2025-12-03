import { api } from "@/api/axios";
import {
  createFeaturesSchema,
  FeaturesSchema,
  GetFeatures,
} from "@/types/cars";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useFeatures = (carId?: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [featuresData, setFeaturesData] = useState<GetFeatures[]>([]);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const { t } = useTranslation();
  const carSchema = createFeaturesSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<FeaturesSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      description_uz: "",
      description_ru: "",
    },
  });

  const onSubmit = async (data: FeaturesSchema) => {
    try {
      let newData = {
        ...data,
        car: carId,
      };
      if (selected === null) {
        await api.post("/cars/features/create/", newData);
      } else {
        await api.put(`/cars/features/detail/${selected}/`, newData);
      }
      closeModal();
      if (carId) {
        await fetchFeatures(carId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFeatures = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/cars/features/${id}/`);

      setFeaturesData(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    //  setSelected(null);
    setShowAddModal(false);
    reset({
      description_uz: "",
      description_ru: "",
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const editBtn = async (id: number) => {
    try {
      setSelected(id);
      let { data } = await api.get(`/cars/features/detail/${id}/`);
      reset(data);
      setShowAddModal(true);
    } catch (error) {
      window.alert(error);
    }
  };

  const deleteBtn = async (id: number) => {
    await api.delete(`/cars/features/detail/${id}/`);
    closeDeleteModal();
    if (carId) {
      await fetchFeatures(carId);
    }
  };

  return {
    loading,
    error,
    // refetch,
    showAddModal,
    setShowAddModal,
    closeModal,
    handleSubmit,
    onSubmit,
    register,
    errors,
    featuresData,
    fetchFeatures,

    openDeleteModal,
    editBtn,

    closeDeleteModal,
    isDeleteModal,
    deleteBtn,
    setSelectedItemId,
    selectedItemId,
  };
};
