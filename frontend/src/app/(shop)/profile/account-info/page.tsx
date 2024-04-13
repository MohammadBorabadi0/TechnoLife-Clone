"use client";

import Title from "@/components/Profile/Title";
import AccountInfoMobileScreen from "@/screens/Profile/account-info/AccountInfoMobileScreen";
import AccountInfoScreen from "@/screens/Profile/account-info/AccountInfoScreen";
import { useUserStore } from "@/store/store";

const AccountInfoPage = () => {
  const { userProfile } = useUserStore((state) => state);

  if (userProfile)
    return (
      <div className="flex flex-col gap-5">
        <Title title="مشخصات" />
        <AccountInfoMobileScreen userProfile={userProfile} />
        <AccountInfoScreen userProfile={userProfile} />
      </div>
    );
};

export default AccountInfoPage;
