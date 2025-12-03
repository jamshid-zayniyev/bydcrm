import { api } from "@/api/axios";
import { Car, carsApi } from "@/api/cars";
import { CarSchema, CarsColor, createCarSchema } from "@/types/cars";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useAllCars = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const carSchema = createCarSchema(t);
  const [colors, setColors] = useState<CarsColor[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [cars, setCars] = useState<Car[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

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
      base_price: 0,
      total_available: 0,
      description_uz: "",
      description_ru: "",
      brand_color: "",
      image: undefined,
    },
  });

  // Image ni kuzatish
  const imageFile = watch("image");

  // Image preview yaratish
  useEffect(() => {
    if (imageFile instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else if (typeof imageFile === "string" && imageFile) {
      // Agar mavjud rasm URL bo'lsa
      setPreviewImage(imageFile);
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
      formData.append("brand_color", `${data.brand_color}`);

      // Image ni qayta ishlash - MUHIM O'ZGARISH
      if (data.image instanceof File) {
        // Faqat yangi rasm tanlangan bo'lsa yuborish
        formData.append("image", data.image);
      }
      // Agar data.image string (mavjud URL) bo'lsa, image fieldni YUBORMAYMIZ
      // Backend mavjud rasmni o'zi saqlab qoladi

      if (selected === null) {
        await api.post("/cars/crm/create/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.put(`/cars/crm/${selected}/`, formData, {
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
      base_price: 0,
      total_available: 0,
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
      // File hajmini tekshirish (5MB)
      if (file.size > 10 * 1024 * 1024) {
        window.alert("Rasm hajmi 5MB dan oshmasligi kerak");
        return;
      }

      // File turini tekshirish
      if (!file.type.startsWith("image/")) {
        window.alert("Faqat rasm fayllari qabul qilinadi");
        return;
      }

      setValue("image", file);
    }
  };

  const handleRemoveImage = () => {
    // Agar edit rejimida bo'lsak
    if (selected !== null) {
      // Mavjud rasm URL ni qidirish
      const car = cars.find((c) => c.id === selected);
      if (car?.image && !(watch("image") instanceof File)) {
        // Eski rasm URL ni qayta o'rnatish
        setValue("image", car.image);
        setPreviewImage(car.image);
      } else {
        setValue("image", undefined);
        setPreviewImage("");
      }
    } else {
      // Yangi yaratishda
      setValue("image", undefined);
      setPreviewImage("");
    }
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
      console.log(data);

      // Image ni qayta ishlash
      let imageValue: any = undefined;
      if (data.image) {
        // Agar backend image URL qaytarsa, uni string sifatida saqlash
        imageValue = data.image;
      }

      reset({
        model: data.model,
        base_price: data.base_price,
        total_available: data.total_available,
        description_uz: data.description_uz,
        description_ru: data.description_ru,
        brand_color: `${data.brand_color}`,
        image: imageValue,
        // image: undefined, // Image ni yangilash uchun bo'sh qoldiramiz
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
    refetch,
    register,
    uploadLoading,
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
    selected,
  };
};
