import { useEffect } from "react";
import { useCustomers } from "../../hooks/useCustomers";

interface DeleteModalProps {
  closeDeleteModal: () => void;
  isOpen: boolean;
  selectedItemId: number | null;
  deleteBtn: (id: number) => void;
}
const DeleteModal: React.FC<DeleteModalProps> = ({
  closeDeleteModal,
  isOpen,
  selectedItemId,
  deleteBtn,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDeleteModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeDeleteModal]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeDeleteModal}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-lg border border-border max-w-xl animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Delete</h2>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <p className="text-muted-foreground">
              Ushbu ma'lumotni o‘chirishni xohlaysizmi?
            </p>
          </div>

          {/* Tugmalar */}
          <div
            className="px-6 py-4 border-t border-border flex gap-3 justify-end"
            style={{ justifyContent: "end" }}
          >
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2 rounded-md border border-input bg-background text-foreground hover:bg-muted transition-colors font-medium"
            >
              Cansel
            </button>
            <button
              // onClick={onConfirm}
              onClick={() => {
                if (selectedItemId !== null) {
                  deleteBtn(selectedItemId);
                }
              }}
              className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-medium text-white"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
