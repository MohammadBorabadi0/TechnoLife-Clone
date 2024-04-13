import AccountInfo from "@/components/Profile/account-info/mobile/AccountInfo";
import { useModal } from "@/store/store";
import { IUser } from "@/utils/type";
import { FC } from "react";
import EditAccountInfoModal from "./Modal/EditAccountInfoModal";

interface IProps {
  userProfile: IUser;
}

const AccountInfoMobileScreen: FC<IProps> = ({ userProfile }) => {
  const {
    showEditName,
    showEditEmail,
    showEditMobile,
    showEditCardNumber,
    showEditNationalCode,
    showEditPassword,
  } = useModal((state) => state);

  return (
    <div className="lg:hidden">
      <AccountInfo userProfile={userProfile} />
      {showEditName ||
      showEditEmail ||
      showEditNationalCode ||
      showEditMobile ||
      showEditPassword ||
      showEditCardNumber ? (
        <EditAccountInfoModal userProfile={userProfile} />
      ) : null}
    </div>
  );
};

export default AccountInfoMobileScreen;
