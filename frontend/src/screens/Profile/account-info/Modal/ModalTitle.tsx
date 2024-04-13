import { useModal } from "@/store/store";
import { FC } from "react";
import { IoClose } from "react-icons/io5";

interface IProps {
  handleCloseModal: () => void;
}

const ModalTitle: FC<IProps> = ({ handleCloseModal }) => {
  const {
    showEditName,
    showEditEmail,
    showEditMobile,
    showEditPassword,
    showEditNationalCode,
    showEditCardNumber,
  } = useModal((state) => state);

  let title = "";

  switch (true) {
    case showEditName:
      title = "نام و نام خانوادگی";
      break;
    case showEditEmail:
      title = "پست الکترونیکی";
      break;
    case showEditMobile:
      title = "شماره موبایل";
      break;
    case showEditPassword:
      title = "ویرایش رمز عبور";
      break;
    case showEditNationalCode:
      title = "کد ملی";
      break;
    case showEditCardNumber:
      title = "شماره کارت";
      break;
  }

  return (
    <div className="flex items-center justify-between p-5">
      <h2 className="font-semibold">{title}</h2>
      <button onClick={handleCloseModal}>
        <IoClose className="text-xl" />
      </button>
    </div>
  );
};

export default ModalTitle;
