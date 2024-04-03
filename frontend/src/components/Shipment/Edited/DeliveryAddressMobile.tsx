import { useModal, useShipmentStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { BiChevronLeft, BiPlus } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";

const DeliveryAddressMobile = () => {
  const { addressFormValues } = useShipmentStore((state) => state);
  const {
    setShowAddAdressForm,
    setShowAddress,
  } = useModal((state) => state);

  // Destructuring addressFormValues
  const {
    firstname,
    lastname,
    province,
    city,
    housenumber,
    postalAddress,
    quarter,
  } = addressFormValues;

  return (
    <>
      {/* Address */}
      <div className="flex flex-col gap-3 font-semibold p-4">
        <h2 className="text-black">آدرس تحویل</h2>

        {firstname.trim() !== "" ? (
          <div
            className="flex items-center gap-2 relative bg-blue-50 p-3 rounded-lg cursor-pointer"
            onClick={() => setShowAddress(true)}
          >
            <GrLocation className="text-blue-600 text-2xl absolute right-2" />
            <div className="flex flex-col gap-1 text-xs leading-5 pr-8 pl-4 text-ellipsis line-clamp-2 overflow-hidden">
              <p className="text-gray-400">
                {firstname} {lastname}
              </p>
              <p className="text-gray-600">
                {En_To_Fa(
                  `${province} , ${city} - ${quarter} ، ${postalAddress} / پلاک ${housenumber}`
                )}
              </p>
            </div>
            <BiChevronLeft size={20} className="absolute left-2" />
          </div>
        ) : (
          <button
            onClick={() => setShowAddAdressForm(true)}
            className="flex justify-center items-center gap-1 py-3 mx-3 border border-blue-600 rounded-lg text-blue-600"
          >
            <p>افزودن آدرس</p>
            <BiPlus size={18} />
          </button>
        )}
      </div>
    </>
  );
};

export default DeliveryAddressMobile;
