"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useUserStore } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/Admin/add/Input";
import toast from "react-hot-toast";
import { IUser } from "@/utils/type";

const EditUserScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { user, getUserById, updateUser } = useUserStore((state) => state);

  const router = useRouter();
  const { userId } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (firstName.trim() === "" && email.trim() === "") {
      toast.error("لطفا نام و ایمیل را وارد کنید");
      return;
    }
    const data: IUser = {
      firstName,
      lastName,
      email,
      isAdmin,
      _id: userId.toString(),
    };
    updateUser(data);
    router.push("/admin/users");
  };

  useEffect(() => {
    getUserById(userId.toString());
  }, [getUserById, userId]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setIsAdmin(user.isAdmin || false);
    }
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit}
      className="px-3 flex flex-col gap-5 w-full text-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="نام"
          name="firstName"
          value={firstName}
          handleChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="نام خانوادگی"
          name="lastName"
          value={lastName}
          handleChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label="ایمیل"
          type="email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label htmlFor="isAdmin">ادمین</label>
        </div>
      </div>

      <div className="flex gap-5 pb-5">
        <button
          type="submit"
          className="bg-purple-600 text-white w-full py-2 px-4 text-base lg:text-lg rounded-sm"
        >
          ویرایش کاربر
        </button>
      </div>
    </form>
  );
};

export default EditUserScreen;
