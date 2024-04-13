"use client";

import { useModal, useUserStore } from "@/store/store";
import { IUser } from "@/utils/type";
import React, { FC } from "react";
import { Form, Formik } from "formik";
import Input from "./Input";
import ModalTitle from "./ModalTitle";
import validationSchema from "./validationSchema";
import EditAccountFields from "./EditAccountFields";

interface IProps {
  userProfile: IUser;
}

const EditAccountInfoModal: FC<IProps> = ({ userProfile }) => {
  const { updateUserProfile } = useUserStore((state) => state);
  const {
    showEditName,
    showEditEmail,
    showEditPassword,
    showEditNationalCode,
    showEditCardNumber,
    showEditMobile,
    setShowEditName,
    setShowEditEmail,
    setShowEditMobile,
    setShowEditNationalCode,
    setShowEditCardNumber,
    setShowEditPassword,
  } = useModal((state) => state);

  const initialValues = {
    firstName: userProfile.firstName || "",
    lastName: userProfile.lastName || "",
    email: userProfile.email || "",
    mobile: userProfile.mobile || "",
    currentPassword: (userProfile.password && "******") || "",
    newPassword: "",
    repeatNewPassword: "",
    cardNumber: userProfile.cardNumber || "",
    nationalCode: userProfile.nationalCode || "",
  };

  const handleCloseModal = () => {
    setShowEditName(false);
    setShowEditEmail(false);
    setShowEditMobile(false);
    setShowEditPassword(false);
    setShowEditCardNumber(false);
    setShowEditNationalCode(false);
    setShowEditPassword(false);
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);

    try {
      const data: IUser = {
        email: values.email,
        cardNumber: +values.cardNumber,
        password: values.newPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        mobile: +values.mobile,
        nationalCode: +values.nationalCode,
      };
      updateUserProfile(data);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-base bg-opacity-50"
      onClick={handleCloseModal}
    >
      <div
        className="flex flex-col gap-3 bg-white font-semibold lg:rounded-lg h-screen lg:h-fit pb-5 w-full lg:w-[450px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-400">
          <ModalTitle handleCloseModal={handleCloseModal} />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={() =>
            validationSchema(
              showEditName,
              showEditEmail,
              showEditPassword,
              showEditNationalCode,
              showEditCardNumber,
              showEditMobile
            )
          }
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5 px-4 text-sm">
              <EditAccountFields />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-slate-600 text-white rounded-md py-3 px-5 font-medium w-fit"
                  disabled={isSubmitting}
                >
                  ثبت اطلاعات
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditAccountInfoModal;
