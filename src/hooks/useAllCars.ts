import { api } from "@/api/axios";
import { Car, carsApi } from "@/api/cars";
import { CarsColor } from "@/types/cars";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import z from "zod";

const createCarSchema = (t: any) =>
  z.object({
    model: z.string().min(1, "Model nomi majburiy"),
    base_price: z.number().positive("Boshlang'ich narx musbat bo'lishi kerak"),
    total_available: z.number().int().nonnegative("Umumiy son noto'g'ri"),
    description_uz: z.string(),
    description_ru: z.string(),
    brand_color: z.string().optional(),
    image: z.instanceof(File).optional(),
  });

export type CarSchema = z.infer<ReturnType<typeof createCarSchema>>;

export const useAllCars = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { t } = useTranslation();
  const carSchema = createCarSchema(t);
  const [colors, setColors] = useState<CarsColor[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [cars, setCars] = useState<Car[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<CarSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      model: "",
      // base_price: 0,
      // total_available: 0,
      description_uz: "",
      description_ru: "",
      // brand_color: "",
    },
  });

  // Image ni kuzatish
  const imageFile = watch("image");

  // Image preview yaratish
  useEffect(() => {
    if (imageFile && imageFile instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage("");
    }
  }, [imageFile]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await carsApi.getAllCars();
      setCars(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CarSchema) => {
    try {
      setUploadLoading(true);

      const formData = new FormData();
      formData.append("model", data.model);
      formData.append("base_price", data.base_price.toString());
      formData.append("total_available", data.total_available.toString());
      formData.append("description_uz", data.description_uz);
      formData.append("description_ru", data.description_ru);

      if (data.brand_color) {
        formData.append("brand_color", data.brand_color);
      }

      if (data.image) {
        formData.append("image", data.image);
      }

      if (selected === null) {
        await api.post("/cars/crm/create/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.put(`/cars/crm/${selected}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      closeModal();
      fetchCars();
    } catch (err) {
      window.alert(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setShowAddModal(false);

    reset({
      model: "",
      base_price: undefined,
      total_available: undefined,
      description_uz: "",
      description_ru: "",
      brand_color: "",
      image: undefined,
    });
    setPreviewImage("");
  };

  const getCarsColors = async () => {
    try {
      const { data } = await api.get("/cars/colors/");
      setColors(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", undefined);
    setPreviewImage("");
  };

  useEffect(() => {
    fetchCars();
    getCarsColors();
  }, []);

  const refetch = () => {
    fetchCars();
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const deleteBtn = async (id: number) => {
    await api.delete(`/cars/crm/${id}/`);
    closeDeleteModal();
    fetchCars();
  };

  const editBtn = async (id: number) => {
    try {
      setSelected(id);
      let { data } = await api.get(`/cars/crm/${id}/`);
      reset({
        model: data.model || "",
        base_price: data.base_price || 0,
        total_available: data.total_available || 0,
        description_uz: data.description_uz || "",
        description_ru: data.description_ru || "",
        brand_color: data.brand_color || "",
        image: undefined, // Image ni yangilash uchun bo'sh qoldiramiz
      });

      // Agar image bo'lsa, preview ni o'rnatish
      if (data.image) {
        setPreviewImage(data.image);
      }

      setShowAddModal(true);
    } catch (error) {
      window.alert(error);
    }
  };

  return {
    loading,
    error,
    uploadLoading,
    refetch,
    register,
    errors,
    handleSubmit,
    onSubmit,
    colors,
    previewImage,
    handleImageChange,
    handleRemoveImage,
    watch,
    control,
    cars,
    showAddModal,
    setShowAddModal,
    closeModal,
    closeDeleteModal,
    deleteBtn,
    openDeleteModal,
    isDeleteModal,
    editBtn,
  };
};
