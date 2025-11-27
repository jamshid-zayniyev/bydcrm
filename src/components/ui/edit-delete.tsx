import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";

const EditDelete = () => {
  return (
    <div className="flex justify-center gap-4">
      {/* <button
        className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r text-white rounded-lg text-xs sm:text-sm shadow-sm"
        style={{ backgroundColor: "#1890FF" }}
      >
        Edit
      </button>
      <button className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#E60012] to-[#b00010] text-white rounded-lg text-xs sm:text-sm shadow-sm">
        Delete
      </button> */}

      <img src={Edit} alt="no image?" />
      <img src={Delete} alt="no image?" />
    </div>
  );
};

export default EditDelete;
