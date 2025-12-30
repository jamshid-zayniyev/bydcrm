import { api } from "@/api/axios";
import { Employees } from "@/types/testDrive";

import React, { useEffect, useState } from "react";

const Employee = () => {
  const [employees, setEmployees] = useState<Employees[]>([]);
  useEffect(() => {
    getEmployees();
  }, []);
  const getEmployees = async () => {
    try {
      const { data } = await api.get("/users/employees/");
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };
  return { employees };
};

export default Employee;
