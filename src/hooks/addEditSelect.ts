import { TFunction } from "i18next";

interface SimpleButtonTextProps {
  selected: number | null;
  loading: boolean;
  t: TFunction;
}
export const AddEditSelect: React.FC<SimpleButtonTextProps> = ({
  selected,
  loading,
  t,
}) => {
  const baseText =
    selected === null
      ? t("customers.addClientObj.addClient")
      : `${t("sale")} ${t("edit")}`;

  return loading ? `...${baseText}` : baseText;
};

export default AddEditSelect;
