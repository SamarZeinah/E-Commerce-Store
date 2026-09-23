"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { useAuth } from "@/Context/AuthContext";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [isloading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const loginFormikOBJ = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values: LoginValues) => {
      console.log("loginvalues:", values);

      setIsLoading(true);

      try {
        const { data } = await axiosInstance.post(
          "/users/login",
          values
        );

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        login(data.token, data.user);

        toast.success("Logged in successfully 🎉");

        router.push("/");
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
      onSubmit={loginFormikOBJ.handleSubmit}
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={loginFormikOBJ.values.email}
          onChange={loginFormikOBJ.handleChange}
          onBlur={loginFormikOBJ.handleBlur}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />

        {loginFormikOBJ.touched.email &&
          loginFormikOBJ.errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {loginFormikOBJ.errors.email}
            </p>
          )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={loginFormikOBJ.values.password}
            onChange={loginFormikOBJ.handleChange}
            onBlur={loginFormikOBJ.handleBlur}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {loginFormikOBJ.touched.password &&
          loginFormikOBJ.errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {loginFormikOBJ.errors.password}
            </p>
          )}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isloading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isloading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
