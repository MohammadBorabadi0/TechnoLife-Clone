import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/Auth/Input";
import Title from "../../components/Auth/Title";
import Button from "../../components/Auth/Button";
import { useUserStore } from "../../store/store";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("فرمت ایمیل نادرست است")
    .required("ایمیل نباید خالی باشد"),
  password: Yup.string().required("رمز عبور نباید خالی باشد"),
});

const LoginForm: React.FC = () => {
  const { loginUser } = useUserStore((state) => state);

  const router = useRouter();
  const searchParams = useSearchParams();

  const backTo = searchParams.get("backTo") || "/";

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values: FormValues) => {
        try {
          await loginUser(values);
          // router.replace(backTo);
        } catch (error) {
          console.log(error);
          return;
        }
      }}
    >
      <section className="flex justify-center h-screen">
        <Form className="flex flex-col gap-5 bg-white p-6 rounded-md shadow-md border h-fit mt-16 w-full mx-3 sm:w-[380px]">
          <Title title="فرم ورود" />
          <Input type="email" name="email" placeholder="ایمیل" />
          <Input type="password" name="password" placeholder="رمز عبور" />
          <Button>ورود</Button>
          <Link
            href="/register"
            className="text-blue-600 text-xs hover:underline"
          >
            هنوز ثبت نام نکرده اید؟ ایجاد اکانت
          </Link>
        </Form>
      </section>
    </Formik>
  );
};

export default LoginForm;
