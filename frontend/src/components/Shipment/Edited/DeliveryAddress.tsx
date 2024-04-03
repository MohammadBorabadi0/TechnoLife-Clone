// store
import { useModal, useShipmentStore } from "@/store/store";

// utils
import { En_To_Fa } from "@/utils/functions";

// icons
import { BiChevronLeft, BiPlus } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";

const DeliveryAddress = () => {
  const { addressFormValues } = useShipmentStore((state) => state);
  const {
    showAddAddressForm,
    setShowAddAdressForm,
    showAddress,
    setShowAddress,
  } = useModal((state) => state);

  const {
    firstname,
    lastname,
    province,
    city,
    quarter,
    postalAddress,
    housenumber,
  } = addressFormValues;

  return (
    <>
      <h3 className="text-black xl:text-lg font-semibold mx-2">آدرس تحویل</h3>

      {firstname.trim() !== "" ? (
        <div
          onClick={() => setShowAddress(true)}
          className="relative bg-blue-50 rounded-lg flex gap-5 items-center justify-between my-5 p-8"
        >
          <div className="flex items-center gap-5">
            <GrLocation
              size={25}
              className="text-blue-600 border-b-2 border-blue-600"
            />
            <div className="flex flex-col gap-2 max-w-3/4 xl:max-w-[64%] h-fit">
              <p className="text-gray-400">
                {firstname} {lastname}
              </p>
              <p className="text-black leading-9">
                {En_To_Fa(
                  `${province} , ${city} - ${quarter} ، ${postalAddress} / پلاک ${housenumber}`
                )}
              </p>
            </div>
          </div>
          <button
            // type="button"
            // onClick={() => setShowAddress(true)}
            className="flex items-center gap-1 whitespace-nowrap"
          >
            <span>انتخاب / ویرایش</span>
            <BiChevronLeft size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddAdressForm(true)}
          className="flex w-full justify-center items-center gap-1 font-semibold py-4 my-4 border-2 border-blue-600 rounded-lg text-blue-600"
        >
          <p>افزودن آدرس</p>
          <BiPlus size={20} />
        </button>
      )}
    </>
  );
};

export default DeliveryAddress;
