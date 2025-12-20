import { useState, useEffect, useRef } from "react";
import {
  getSales,
  getSalesBanner,
  getSalesStatistics,
  Sales,
  SalesBanner,
  SalesStatistics,
} from "../api/sales";
import { useTranslation } from "react-i18next";
import { createSaleContractSchema, SaleContractSchema } from "@/types/sales";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/api/axios";
import { CarMe, createMeSchema, UserProfile } from "@/types/header";

export const useHeader = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [getUpload, setGetUpload] = useState<UserProfile>();

  const { t } = useTranslation();
  const meSchema = createMeSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
    trigger,
  } = useForm<CarMe>({
    resolver: zodResolver(meSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      username: "",
      avatar: undefined,
    },
  });
  // Avatar'ni o'zgartirish handler'i
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Formga qo'shish
      setValue("avatar", file, { shouldValidate: true });

      // Preview uchun
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CarMe) => {
    try {
      setLoading(true);

      // FormData yaratish
      const formData = new FormData();

      // Text ma'lumotlarni qo'shish
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("phone_number", data.phone_number.replace(/\s/g, ""));
      formData.append("username", data.username);

      // Avatar faylini qo'shish (agar mavjud va File tipida bo'lsa)
      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      console.log("FormData mazmuni:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // API so'rovini yuborish
      const response = await api.put("/users/me-edit/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("Muvaffaqiyatli yangilandi:", response.data);
      // setShowAddModal(false);

      editBtn();
      closeModal();
    } catch (err) {
      window.alert(err);
    } finally {
      setLoading(false);
    }
  };
  const editBtn = async () => {
    try {
      const { data } = await api.get("/users/me/");

      setGetUpload(data);
      // Formni to'ldirish
      reset({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone_number: data.phone_number || "",
        username: data.username || "",
        avatar: data.avatar || undefined,
      });

      // Avatar preview'ni o'rnatish
      if (data.avatar) {
        setPreviewImage(data.avatar);
      } else {
        setPreviewImage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setPreviewImage("");
    reset();
  };

  useEffect(() => {
    editBtn();
  }, []);

  return {
    closeModal,
    setShowAddModal,
    showAddModal,
    onSubmit,
    handleSubmit,
    errors,
    register,
    watch,
    setValue,
    trigger,
    editBtn,
    previewImage,
    loading,
    handleAvatarChange,
    fileInputRef,
    getUpload,
  };
};
