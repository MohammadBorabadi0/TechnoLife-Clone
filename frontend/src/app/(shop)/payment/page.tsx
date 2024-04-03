'use client';

import PaymentMobileScreen from "@/screens/Payment/PaymentMobileScreen";
import PaymentScreen from "@/screens/Payment/PaymentScreen";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PaymentPage = () => {
  const { userProfile, fetchUser } = useUserStore((state) => state);

  const router = useRouter();

  useEffect(() => {
    if (!userProfile) {
      router.replace("/login?backTo=payment");
    }
  }, [userProfile, router]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main className="bg-primary">
      <div className="hidden lg:block">
        <PaymentScreen />
      </div>
      <div className="lg:hidden">
        <PaymentMobileScreen />
      </div>
    </main>
  );
};

export default PaymentPage;
