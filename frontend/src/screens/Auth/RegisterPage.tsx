import { FC } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/Auth/Input";
import Title from "../../components/Auth/Title";
import Button from "../../components/Auth/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/store";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("نام نباید خالی باشد"),
  lastName: Yup.string().required("نام خانوادگی نباید خالی باشد"),
  email: Yup.string()
    .email("فرمت ایمیل نادرست است")
    .required("ایمیل نباید خالی باشد"),
  password: Yup.string().required("رمز عبور نباید خالی باشد"),
});

const RegisterForm: FC = () => {
  const { registerUser } = useUserStore((state) => state);

  const router = useRouter();

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values: FormValues) => {
        try {
          await registerUser(values);
          router.replace("/");
        } catch (error) {
          console.log(error);
          return;
        }
      }}
    >
      <section className="flex justify-center h-screen">
        <Form className="flex flex-col gap-5 bg-white p-6 rounded-md shadow-md border h-fit mt-16 w-full mx-3 sm:w-[380px]">
          <Title title="فرم ثبت نام" />
          <Input name="firstName" placeholder="نام" />
          <Input name="lastName" placeholder="نام خانوادگی" />
          <Input type="email" name="email" placeholder="ایمیل" />
          <Input type="password" name="password" placeholder="رمز عبور" />
          <Button>ثبت نام</Button>
          <Link href="/login" className="text-blue-600 text-xs hover:underline">
            قبلا ثبت نام کرده اید؟ ورود
          </Link>
        </Form>
      </section>
    </Formik>
  );
};

export default RegisterForm;
