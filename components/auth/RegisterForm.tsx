"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
const RegisterForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .required("Username is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

  phoneNumber: Yup.string()
  .matches(/^01\d{9}$/, "Please enter a valid Egyptian phone number")
  .required("Phone number is required"),

  });

  const RegisterFormikOBJ = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
    },

    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });
  return (
    <div>
      <form onSubmit={RegisterFormikOBJ.handleSubmit} className="space-y-5">
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
            value={RegisterFormikOBJ.values.email}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          {RegisterFormikOBJ.touched.email &&
            RegisterFormikOBJ.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {RegisterFormikOBJ.errors.email}
              </p>
            )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            username
          </label>

          <input
            id="username"
            name="username"
            type="string"
            placeholder="Enter your username"
            value={RegisterFormikOBJ.values.username}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          {RegisterFormikOBJ.touched.username &&
            RegisterFormikOBJ.errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {RegisterFormikOBJ.errors.username}
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
            value={RegisterFormikOBJ.values.password}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          {RegisterFormikOBJ.touched.password &&
            RegisterFormikOBJ.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {RegisterFormikOBJ.errors.password}
              </p>
            )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            phoneNumber
          </label>

          <input
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            placeholder="Enter your phoneNumber"
            value={RegisterFormikOBJ.values.phoneNumber}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          {RegisterFormikOBJ.touched.phoneNumber &&
            RegisterFormikOBJ.errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {RegisterFormikOBJ.errors.phoneNumber}
              </p>
            )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
