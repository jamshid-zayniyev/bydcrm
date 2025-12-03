import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";

interface EditDeleteProps {
  openDeleteModal: () => void;
  setSelectedItemId: (id: number | null) => void;
  id: number;
  editBtn: (id: number) => void;
}
const EditDelete = ({
  openDeleteModal,
  setSelectedItemId,
  id,
  editBtn,
}: EditDeleteProps) => {
  return (
    <div className="flex justify-center gap-4">
      <img
        src={Edit}
        alt="no image?"
        onClick={(e) => {
          e.stopPropagation();
          editBtn(id);
        }}
      />
      <img
        src={Delete}
        alt="no image?"
        onClick={(e) => {
          e.stopPropagation();
          openDeleteModal();
          setSelectedItemId(id);
        }}
      />
    </div>
  );
};

export default EditDelete;
