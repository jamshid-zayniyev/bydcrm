import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  createTestDriveSchema,
  CustomersList,
  Employees,
  TestDrive,
  TestDriveSchema,
} from "@/types/testDrive";
import { api } from "@/api/axios";

export const useTestDrive = (tabsValue?: string) => {
  const { t } = useTranslation();
  const testDriveSchema = createTestDriveSchema(t);

  const [currentTab, setCurrentTab] = useState<string>(tabsValue || "p");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [carustomersList, setCustomersList] = useState<CustomersList[]>([]);
  const [customersId, setCustomersId] = useState<CustomersList | null>(null);

  const [testDrive, setTestDrive] = useState<TestDrive[]>([]);
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [loadingDrive, setLoadingDrive] = useState(false);

  const [isDeleteModal, setDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [pgnCount, setPgnCount] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<TestDriveSchema>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: {
      customer: "",
    },
  });

  useEffect(() => {
    if (tabsValue) {
      setCurrentTab(tabsValue);
      // Tab o'zgarganida test drive ma'lumotlarini yangilash
      // getTestDrive(tabsValue);
    }
  }, [tabsValue]);

  const onSubmit = async (data: TestDriveSchema) => {
    try {
      if (selected === null) {
        await api.post("/kpi/test-drive/create/", data);
      } else {
        await api.put(`/kpi/test-drive/${selected}/`, data);
      }

      closeModal();
      getTestDrive(currentTab);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setShowAddModal(false);
    reset({
      customer: "",
      email: "",
      // employee: "",
      // status: "",
    });
    setCustomersId(null);
  };

  const getEmployees = async () => {
    try {
      const { data } = await api.get("/users/employees/");
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomersList = async () => {
    try {
      const { data } = await api.get("/users/customers/list/");
      setCustomersList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editForm = async (id: number) => {
    try {
      setLoadingDrive(true);
      const { data } = await api.get(`/users/customers/${id}/`);
      setCustomersId(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDrive(false);
    }
  };

  const getTestDrive = async (
    tabs: string = currentTab,
    search = "",
    active = 1
  ) => {
    try {
      setLoading(true);
      const { data } = await api.get("/kpi/test-drive/", {
        params: {
          status: tabs,
          search,
          active,
        },
      });
      setTestDrive(data?.results);

      setPgnCount(data?.count);

      setActivePage(active);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editBtn = async (id: number) => {
    setSelected(id);
    const { data } = await api.get(`/kpi/test-drive/${id}/`);
    console.log(data);

    reset({
      customer: `${data.customer}`,
      email: data.email,
      employee: `${data.employee}`,
      status: `${data.status}`,
    });

    editForm(data.customer);
    setShowAddModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const deleteBtn = async (id: number) => {
    await api.delete(`/kpi/test-drive/${id}/`);
    closeDeleteModal();
    getTestDrive();
  };

  useEffect(() => {
    getTestDrive(currentTab);
    getCustomersList();
    getEmployees();
  }, []);

  const refetch = () => {};

  return {
    // form-validation
    handleSubmit,
    onSubmit,
    register,
    errors,

    // modal
    closeModal,
    showAddModal,
    setShowAddModal,

    loading,

    selected,

    // customersList-data
    carustomersList,
    employees,
    editForm,
    customersId,

    testDrive,

    // edit-delete
    editBtn,
    closeDeleteModal,
    openDeleteModal,
    isDeleteModal,
    setSelectedItemId,
    selectedItemId,
    deleteBtn,

    getTestDrive,

    loadingDrive,

    // pagination
    pgnCount,
    activePage,
    setActivePage,
  };
};
