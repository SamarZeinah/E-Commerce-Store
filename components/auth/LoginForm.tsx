"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
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

    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  return (
    <form onSubmit={loginFormikOBJ.handleSubmit} className="space-y-5">
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

        {loginFormikOBJ.touched.email && loginFormikOBJ.errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {loginFormikOBJ.errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={loginFormikOBJ.values.password}
          onChange={loginFormikOBJ.handleChange}
          onBlur={loginFormikOBJ.handleBlur}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />

        {loginFormikOBJ.touched.password && loginFormikOBJ.errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {loginFormikOBJ.errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}
