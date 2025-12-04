// hooks/useNumberFormat.ts
import { useState, useCallback } from "react";

interface UseNumberFormatProps {
  onChange?: (value: number) => void;
}

export const useNumberFormat = ({ onChange }: UseNumberFormatProps = {}) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  const formatNumber = useCallback((value: string): string => {
    // Faqat raqamlarni qoldirish
    const numericValue = value.replace(/,/g, "");

    if (!numericValue || isNaN(Number(numericValue))) {
      return "";
    }

    return Number(numericValue).toLocaleString("en-US");
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatNumber(e.target.value);
      setDisplayValue(formatted);

      // Asl qiymatni qaytarish
      const rawValue = formatted.replace(/,/g, "");
      if (onChange) {
        onChange(Number(rawValue));
      }
    },
    [formatNumber, onChange]
  );

  const getRawValue = useCallback((): number => {
    return Number(displayValue.replace(/,/g, "")) || 0;
  }, [displayValue]);

  return {
    displayValue,
    setDisplayValue,
    handleChange,
    getRawValue,
  };
};
