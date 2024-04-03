import { useModal, useShipmentStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import React from "react";
import { FiUser } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { AiOutlineMail } from "react-icons/ai";
import { BiChevronLeft, BiPlus } from "react-icons/bi";
import { initialAddressFormValues } from "@/data/data";

const ShowAddress: React.FC = () => {
  const { showAddress, setShowAddress, setShowAddAdressForm } = useModal(
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
      onClick={(e) => setShowAddress(false)}
      className={`flex lg:hidden fixed inset-0 bg-gray-500 bg-opacity-50 z-50 transition-all duration-1000 ${
        showAddress ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 flex flex-col bg-white transition-all duration-1000 overflow-y-auto"
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
            <IoClose size={20} />
          </button>
        </div>
        <span className="block border-b"></span>

        {/* Address Data  */}
        <div className="flex flex-col gap-5 shadow-3xl rounded-lg py-4 m-3 border text-xs">
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
              {En_To_Fa(`${postalCode}`)}
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
        </div>

        {/* Button For Add New Address */}
        <div className="flex lg:hidden justify-center items-center text-sm font-semibold fixed left-0 right-0 bottom-0 h-20 bg-[#f6f6f6] border-t">
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
  );
};

export default ShowAddress;
