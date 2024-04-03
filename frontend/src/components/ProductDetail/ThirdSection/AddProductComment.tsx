import { BiPlus } from "react-icons/bi";
import { MdOutlineTextsms } from "react-icons/md";
import { useModal } from "@/store/store";

const AddProductComment = () => {
  const { setShowAddCommentModal } = useModal((state) => state);

  return (
    <div className="flex flex-1 items-center md:items-stretch justify-between md:flex-col gap-2 sm:gap-4 overflow-hidden text-[10px] sm:text-base whitespace-nowrap bg-white h-fit p-2 sm:p-6 mt-6 shadow-lg rounded-xl border border-gray-100">
      <div className="flex items-center gap-2">
        <MdOutlineTextsms className="text-blue-600 text-lg sm:text-2xl" />
        <p>نظر خود را در مورد این محصول بنویسید ...</p>
      </div>
      <button
        onClick={() => setShowAddCommentModal(true)}
        className="flex sm:gap-2 justify-center items-center px-2 py-1 lg:p-3 sm:p-4 rounded-xl md:text-base bg-blue-600 text-white"
      >
        <span>افزودن نظر</span>
        <BiPlus size={20} />
      </button>
    </div>
  );
};

export default AddProductComment;
