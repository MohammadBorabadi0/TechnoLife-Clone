import { useModal, useShipmentStore } from "@/store/store";
import React from "react";
import { IoClose } from "react-icons/io5";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AddressFormValues } from "@/utils/type";
import ReceiverSpecifications from "../ShipmentAddressForm/ReceiverSpecifications";
import ReceiverAddress from "../ShipmentAddressForm/ReceiverAddress";

const AddAddressModal: React.FC = () => {
  const { showAddAddressForm, setShowAddAdressForm } = useModal(
    (state) => state
  );
  const { addressFormValues, setAddressFormValues } = useShipmentStore(
    (state) => state
  );

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("نام الزامی است"),
    lastname: Yup.string().required("نام خانوادگی الزامی است"),
    phonenumber: Yup.string()
      .matches(/^[0-9]{10}$/, "شماره تماس باید 10 رقم باشد")
      .required("شماره تماس الزامی است"),
    province: Yup.string().required("استان الزامی است"),
    city: Yup.string().required("شهر الزامی است"),
    quarter: Yup.string().required("محله الزامی است"),
    postalAddress: Yup.string().required("آدرس پستی الزامی است"),
    housenumber: Yup.string().required("پلاک الزامی است"),
    postalCode: Yup.string().required("کد پستی الزامی است"),
  });

  const handleSubmit = (values: AddressFormValues) => {
    console.log({ values });
    setAddressFormValues(values);
    setShowAddAdressForm(false);
  };

  return (
    <div
      onClick={(e) => setShowAddAdressForm(false)}
      className={`flex justify-center items-center fixed inset-0 bg-gray-500 bg-opacity-50 z-50 transition-all duration-1000 ${
        showAddAddressForm ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-5 pt-0 w-[768px] h-[90vh] overflow-hidden"
      >
        <Formik
          initialValues={addressFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Title */}
            <div className="flex justify-between items-center p-5">
              <h2 className="text-black font-semibold">افزودن آدرس</h2>
              <button
                className="flex items-center gap-1"
                type="button"
                onClick={() => setShowAddAdressForm(false)}
              >
                <span>بستن</span>
                <IoClose size={20} />
              </button>
            </div>
            <span className="block border-b"></span>

            <div
              id="scroll"
              className="flex flex-col gap-5 p-3 overflow-y-auto max-h-[80vh]"
            >
              {/* Receiver Specifications */}
              <ReceiverSpecifications />

              {/* Border  */}
              <span className="border-b block mt-8 mb-5"></span>

              {/* Receiver Address Section */}
              <ReceiverAddress />

              {/* Submit button */}
              <button
                type="submit"
                className="bg-blue-600 text-white py-3.5 rounded-xl mt-3 mb-6"
              >
                ثبت آدرس
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddAddressModal;
