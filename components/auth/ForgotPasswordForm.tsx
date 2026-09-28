"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

type ForgotPasswordValues = {
email: string;
};

export default function ForgotPasswordForm() {
const [isLoading, setIsLoading] = useState(false);
const router = useRouter();

const validationSchema = Yup.object({
email: Yup.string()
.email("Invalid email format")
.required("Email is required"),
});

const forgotFormik = useFormik<ForgotPasswordValues>({
initialValues: {
email: "",
},

validationSchema,

onSubmit: async (values) => {
  setIsLoading(true);

  try {
    await axiosInstance.post("/users/forgot-password", values);

    toast.success("Reset code sent to your email 📩");

    sessionStorage.setItem("resetEmail", values.email);

    router.push("/verify-otp");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    toast.error(
      err.response?.data?.message ||
        "Something went wrong ❌"
    );
  } finally {
    setIsLoading(false);
  }
},


});

return (
<form onSubmit={forgotFormik.handleSubmit} className="space-y-5" >
{/* Email */}
<div>
<label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700" >
Email
</label>

    <div className="relative">
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={forgotFormik.values.email}
        onChange={forgotFormik.handleChange}
        onBlur={forgotFormik.handleBlur}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      />

      <Mail
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>

    {forgotFormik.touched.email &&
      forgotFormik.errors.email && (
        <p className="mt-1 text-sm text-red-500">
          {forgotFormik.errors.email}
        </p>
      )}
  </div>

  {/* Button */}
  <button
    type="submit"
    disabled={isLoading}
    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
  >
    {isLoading ? (
      <>
        <Loader2 size={18} className="animate-spin" />
        Sending...
      </>
    ) : (
      "Send Reset Code"
    )}
  </button>
</form>


);
}