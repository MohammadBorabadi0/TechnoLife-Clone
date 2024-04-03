import { useModal } from "@/store/store";
import { copyCurrentUrlToClipboard } from "@/utils/functions";
import React from "react";
import { FiCopy } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";

const ShareModal = () => {
  const { setShowShareModal } = useModal((state) => state);

  const handleCopyToClipboard = () => {
    copyCurrentUrlToClipboard();
    setShowShareModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-sm bg-opacity-50">
      <div className="bg-white rounded-lg h-fit p-5 pt-0 w-[464px] overflow-hidden">
        {/* Modal Title  */}
        <div className="flex items-center justify-between border-b-2 overflow-hidden py-5 mb-5 text-lg">
          <div className="flex items-center gap-2 text-gray-500">
            <MdOutlineNotificationsActive size={25} />
            <h2>اشتراک گذاری</h2>
          </div>
          <button onClick={() => setShowShareModal(false)}>
            <IoIosCloseCircleOutline size={30} />
          </button>
        </div>

        {/* Modal Content  */}
        <div className="flex flex-col gap-8">
          <p className="text-center text-base text-black">
            این مطلب را با دوستان خود به اشتراک بگذارید
          </p>
          <button
            onClick={handleCopyToClipboard}
            className="relative flex justify-center p-4 mb-3 text-sm text-blue-600 font-semibold border-2 border-blue-600 rounded-xl"
          >
            <span>کپی لینک</span>
            <FiCopy size={23} className="absolute left-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
