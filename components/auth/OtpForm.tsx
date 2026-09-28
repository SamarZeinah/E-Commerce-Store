"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

type OtpValues = {
otp: string;
};

export default function VerifyOtpForm() {
const [isLoading, setIsLoading] = useState(false);
const router = useRouter();

const email =
typeof window !== "undefined"
? sessionStorage.getItem("resetEmail") || ""
: "";

const validationSchema = Yup.object({
otp: Yup.string()
.matches(/^\d{6}$/, "Code must be 6 digits")
.required("Verification code is required"),
});

const otpFormik = useFormik<OtpValues>({
initialValues: {
otp: "",
},

validationSchema,

onSubmit: async (values) => {
  if (!email) {
    toast.error("Email not found. Please start again.");
    router.push("/forgot-password");
    return;
  }

  setIsLoading(true);

  try {
    const {data}=await axiosInstance.post("/users/verify-otp", {
      email: email,
      otp: values.otp,
    });

    toast.success("Code verified successfully 🎉");

    sessionStorage.setItem("otp", values.otp);
sessionStorage.setItem("resetToken", data.resetToken);

    router.push("/reset-password");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    toast.error(
      err.response?.data?.message ||
        "Invalid verification code ❌"
    );
  } finally {
    setIsLoading(false);
  }
},


});

return (
<form onSubmit={otpFormik.handleSubmit} className="space-y-5" >
{/* Email */}
<div>
<p className="text-center text-sm text-slate-500">
We sent a verification code to
</p>

    <p className="mt-1 text-center font-medium text-slate-700">
      {email}
    </p>
  </div>

  {/* OTP */}
  <div>
    <label
      htmlFor="otp"
      className="mb-2 block text-sm font-medium text-slate-700"
    >
      Verification Code
    </label>

    <input
      id="otp"
      name="otp"
      type="text"
      inputMode="numeric"
      maxLength={6}
      placeholder="Enter 6-digit code"
      value={otpFormik.values.otp}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");

        otpFormik.setFieldValue("otp", value);
      }}
      onBlur={otpFormik.handleBlur}
      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center text-lg font-semibold tracking-[0.5em] text-slate-800 outline-none transition placeholder:text-slate-400 placeholder:tracking-normal focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
    />

    {otpFormik.touched.otp &&
      otpFormik.errors.otp && (
        <p className="mt-1 text-sm text-red-500">
          {otpFormik.errors.otp}
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
        Verifying...
      </>
    ) : (
      "Verify Code"
    )}
  </button>
</form>


);
}