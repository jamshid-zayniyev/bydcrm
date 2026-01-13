import { api } from "@/api/axios";
import { CustomersList } from "@/types/testDrive";
import { useEffect, useState } from "react";

const NameSelectSearch = () => {
  const [carustomersList, setCustomersList] = useState<CustomersList[]>([]);
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

  useEffect(() => {
    getCustomersList();
  }, []);
  return {
    carustomersList,
    getCustomersList,
  };
};

export default NameSelectSearch;
