import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { useTranslation } from "react-i18next";

interface DeleteModalProps {
  closeDeleteModal: () => void;
  isOpen: boolean;
  selectedItemId: number | null;
  deleteBtn: (id: number) => void;
  title?: string;
  message?: string;
}

const DeleteDialog: React.FC<DeleteModalProps> = ({
  closeDeleteModal,
  isOpen,
  selectedItemId,
  deleteBtn,
  title,
  message,
}) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    if (selectedItemId !== null) {
      deleteBtn(selectedItemId);
      closeDeleteModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDeleteModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            {title || t("deleteModal.title", "O'chirish")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            {message ||
              t("deleteModal.message", "Haqiqatan ham o'chirmoqchimisiz?")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 justify-end mt-6">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            {t("deleteModal.cancel", "Bekor qilish")}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-[#E60012] text-white hover:bg-[#c4000f] transition-colors font-medium"
          >
            {t("deleteModal.delete", "O'chirish")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
