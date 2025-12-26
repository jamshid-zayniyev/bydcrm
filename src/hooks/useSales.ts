import { useState, useEffect } from "react";
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
import { CustomersSelectVariants } from "@/types/customers";

export const useSales = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sales, setSales] = useState<Sales[]>([]);
  const [salesStatistics, setSalesStatistics] = useState<SalesStatistics>({
    total_income: "",
    completed_trade: "",
    average_check: "",
  });
  const [salesBanner, setSalesBanner] = useState<SalesBanner[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [isDeleteModal, setDeleteModal] = useState(false);

  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [variantSelect, setVariantSelect] = useState<CustomersSelectVariants[]>(
    []
  );

  const { t } = useTranslation();
  const saleContractSchema = createSaleContractSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<SaleContractSchema>({
    resolver: zodResolver(saleContractSchema),
    defaultValues: {
      customer_id: "",
      car: "",
      price: "",
      status: "",
    },
  });

  const onSubmit = async (data: SaleContractSchema) => {
    try {
      setLoadingPost(true);
      let newData = {
        ...data,
        customer_id: Number(data?.customer_id),
        car: Number(data?.car),
        price: Number(data?.price),
        variants: Number(data?.variants),
      };

      if (selected === null) {
        await api.post("/sales/sales-contract/create/", newData);
      } else {
        await api.put(`/sales/sales-contract/${selected}/`, newData);
      }

      closeModal();
      fetchSales();
    } catch (err) {
      window.alert(err);
    } finally {
      setLoadingPost(false);
    }
  };

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSales();
      setSales(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSalesStatistics();
      setSalesStatistics(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setShowAddModal(false);
    reset({
      customer_id: "",
      car: "",
      price: "",
      status: "",
      // variants: "",
    });
    setVariantSelect([]);
  };

  const fetchSalesBanner = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSalesBanner();
      setSalesBanner(data);
    } catch (err) {
      setError("Mashinalarni yuklab boʻlmadi");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
    fetchSalesStatistics();
    fetchSalesBanner();
  }, []);

  const refetch = () => {
    fetchSales();
  };

  const editBtn = async (id: number) => {
    setSelected(id);
    let { data } = await api.get(`/sales/sales-contract/${id}/`);
    console.log(data);

    reset({
      customer_id: `${data.customer_id}`,
      car: `${data.car}`,
      variants: `${data.variants}`,

      price: `${data.price}`,
      status: data.status,
    });
    if (data.car) {
      await editFormSelect(data.car);
    }

    setShowAddModal(true);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const deleteBtn = async (id: number) => {
    await api.delete(`/sales/sales-contract/${id}/`);
    closeDeleteModal();
    fetchSales();
  };

  const editFormSelect = async (id: number) => {
    try {
      setLoadingModel(true);

      const { data } = await api.get(`/cars/variants/${id}/`);
      setVariantSelect(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingModel(false);
    }
  };

  return {
    sales,
    salesStatistics,
    salesBanner,
    loading,
    error,
    refetch,

    // form
    register,
    errors,
    handleSubmit,
    onSubmit,

    // modal
    setShowAddModal,
    showAddModal,
    closeModal,

    // edit and delete
    editBtn,
    openDeleteModal,
    closeDeleteModal,
    isDeleteModal,
    deleteBtn,

    // selected
    selected,

    loadingPost,

    editFormSelect,
    loadingModel,
    variantSelect,
  };
};
