"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

type ResetPasswordValues = {
  newPassword: string;
};

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const resetFormik = useFormik<ResetPasswordValues>({
    initialValues: {
      newPassword: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      setIsLoading(true);

      try {
       const resetToken = sessionStorage.getItem("resetToken");

console.log("RESET TOKEN:", resetToken);

console.log("REQUEST BODY:", {
  resetToken,
  newPassword: values.newPassword,
});

await axiosInstance.post("/users/reset-password", {
  resetToken,
  newPassword: values.newPassword,
});


        toast.success("Password reset successfully 🎉");

        // Clear all reset-related data
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("resetCode");
        sessionStorage.removeItem("resetToken");

        router.push("/login");
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
    <form
      onSubmit={resetFormik.handleSubmit}
      className="space-y-5"
    >
      {/* New Password */}
      <div>
        <label
          htmlFor="newPassword"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          New Password
        </label>

        <div className="relative">
          <input
            id="newPassword"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={resetFormik.values.newPassword}
            onChange={resetFormik.handleChange}
            onBlur={resetFormik.handleBlur}
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {resetFormik.touched.newPassword &&
          resetFormik.errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {resetFormik.errors.newPassword}
            </p>
          )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );
}
