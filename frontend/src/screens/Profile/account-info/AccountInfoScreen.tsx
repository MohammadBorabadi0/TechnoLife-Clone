import { useModal } from "@/store/store";
import { IUser } from "@/utils/type";
import { FC } from "react";
import EditAccountInfoModal from "./Modal/EditAccountInfoModal";
import AccountInfo from "@/components/Profile/account-info/AccountInfo";

interface IProps {
  userProfile: IUser;
}

const AccountInfoScreen: FC<IProps> = ({ userProfile }) => {
  const {
    showEditName,
    showEditEmail,
    showEditMobile,
    showEditCardNumber,
    showEditNationalCode,
    showEditPassword,
  } = useModal((state) => state);

  return (
    <div className="hidden lg:block">
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

export default AccountInfoScreen;
