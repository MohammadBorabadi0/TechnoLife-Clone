import { initialAddressFormValues } from "@/data/data";
import { useModal, useShipmentStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiChevronLeft, BiPlus } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuPhone } from "react-icons/lu";

const ShowAddressessModal = () => {
  const { showAddress, setShowAddAdressForm, setShowAddress } = useModal(
    (state) => state
  );
  const { addressFormValues, setAddressFormValues } = useShipmentStore(
    (state) => state
  );

  // Destructuring addressFormValues
  const {
    firstname,
    lastname,
    phonenumber,
    province,
    city,
    housenumber,
    postalAddress,
    postalCode,
    quarter,
  } = addressFormValues;

  return (
    <div
      onClick={(e) => setShowAddAdressForm(false)}
      className={`flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-50 z-50 transition-all duration-1000 ${
        showAddress ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg p-5 pt-0 w-[768px] h-[90vh] overflow-hidden"
      >
        {/* Title */}
        <div className="flex justify-between items-center p-5">
          <h2 className="text-black font-semibold">آدرس تحویل</h2>
          <button
            className="flex items-center gap-1"
            type="button"
            onClick={() => setShowAddress(false)}
          >
            <span>بستن</span>
            <IoIosCloseCircleOutline size={23} />
          </button>
        </div>
        <span className="block border-b"></span>

        {/* Address Data  */}
        <div className="flex flex-col gap-5 shadow-3xl rounded-lg py-4 m-3 border">
          <div className="relative flex items-center gap-2 pr-10">
            <GrLocation className="text-blue-600 text-2xl absolute right-3" />
            <p className="text-gray-600 leading-5">
              {En_To_Fa(
                `${province} , ${city} - ${quarter} ، ${postalAddress} / پلاک ${housenumber}`
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4">
            <LuPhone size={16} />
            <p>{En_To_Fa(`${phonenumber}`)}</p>
          </div>
          <div className="flex items-center gap-2 px-4">
            <FiUser size={16} />
            {firstname} {lastname}
          </div>
          <section className="flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
              <AiOutlineMail size={16} />
              {En_To_Fa(`${postalCode || "---"}`)}
            </div>
            <button
              onClick={() => {
                setShowAddress(false);
                setShowAddAdressForm(true);
              }}
              className="text-blue-600 font-semibold flex items-center gap-1"
            >
              <span>ویرایش</span>
              <BiChevronLeft size={18} />
            </button>
          </section>
          {/* Button For Add New Address */}
          <div className="flex justify-center items-center font-semibold absolute left-0 right-0 bottom-0 h-20 bg-[#f6f6f6] border-t">
            <button
              onClick={() => {
                setShowAddress(false);
                localStorage.setItem(
                  "addressFormValues",
                  JSON.stringify(initialAddressFormValues)
                );
                setAddressFormValues(initialAddressFormValues);
                setShowAddAdressForm(true);
              }}
              className="flex items-center justify-center gap-1 border border-blue-600 text-blue-600 flex-1 py-3 mx-3 rounded-lg"
            >
              <span>افزودن آدرس جدید</span>
              <BiPlus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAddressessModal;
