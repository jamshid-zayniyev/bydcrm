import { api } from "@/api/axios";
import { Car } from "@/api/cars";
import { QRData, User, userSchema } from "@/types/qrScanner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const UseQrScanner = () => {
  const { t } = useTranslation();
  const userSchema1 = userSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema1),
    defaultValues: {
      phone_number: "",
      full_name: "",
      interested_in: "",
      assigned_to: "",
    },
  });

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [daily, setDaily] = useState<QRData[]>([]);
  const [loadingDaily, setLoadingDaily] = useState(false);

  useEffect(() => {
    getCars();
    Daily();
  }, []);

  const getCars = async () => {
    try {
      const { data } = await api.get("/cars/models/");
      setCars(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: User) => {
    try {
      setLoading(true);
      let newData = {
        ...data,
        interested_in: Number(data.interested_in),
        assigned_to: Number(data.assigned_to),
      };
      await api.post("/users/customers/create/", newData);
      Daily();

      reset({
        phone_number: "",
        full_name: "",
        interested_in: "",
        assigned_to: "",
      });
    } catch (error) {
      console.log(error);
      error;
    } finally {
      setLoading(false);
    }
  };

  const Daily = async () => {
    try {
      setLoadingDaily(true);
      const { data } = await api.get("/users/customers/daily/");
      setDaily(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDaily(false);
    }
  };

  const formatPhoneNumber = useCallback((value: string): string => {
    // Remove all non-digit characters except +
    const numbers = value.replace(/[^\d+]/g, "");

    // If starts with +998, format accordingly
    if (numbers.startsWith("+998")) {
      const digits = numbers.slice(4); // Remove +998

      if (digits.length <= 2) {
        return `+998 ${digits}`;
      } else if (digits.length <= 5) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 8) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5
        )}`;
      } else {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5,
          7
        )} ${digits.slice(7, 9)}`;
      }
    } else if (numbers.startsWith("998")) {
      const digits = numbers.slice(3); // Remove 998

      if (digits.length <= 2) {
        return `+998 ${digits}`;
      } else if (digits.length <= 5) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 8) {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5
        )}`;
      } else {
        return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
          5,
          7
        )} ${digits.slice(7, 9)}`;
      }
    } else {
      // For other cases, just return the numbers with +
      return `+998 ${numbers.replace(/\D/g, "")}`;
    }
  }, []);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatPhoneNumber(e.target.value);
      setValue("phone_number", formattedValue, { shouldValidate: true });
    },
    [formatPhoneNumber, setValue]
  );

  const handlePhoneBlur = useCallback(() => {
    trigger("phone_number");
  }, [trigger]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,

    cars,
    loading,

    handlePhoneChange,
    handlePhoneBlur,

    daily,
    loadingDaily,
  };
};

export default UseQrScanner;
