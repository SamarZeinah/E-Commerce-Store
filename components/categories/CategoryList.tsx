"use client";

import axiosInstance from "@/lib/axios";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  _id: string;
  name: string;
  products: string[];
  __v: number;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCategories = async () => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.get("/category/getAll");

      setCategories(data.categories);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-5 text-center text-red-600">
        {error}
      </div>
    );
  }

  // return (
  //   <div className="min-h-screen bg-gray-50 p-6">
  //     {/* Header */}
  //     <div className="mb-8">
  //       <h1 className="text-3xl font-bold text-gray-800">
  //         Categories
  //       </h1>

  //       <p className="mt-2 text-gray-500">
  //         Explore and manage all product categories
  //       </p>
  //     </div>

  //     {/* Categories */}
  //     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  //       {categories.map((category) => (
  //         <div
  //           key={category._id}
  //           className="
  //             group relative overflow-hidden
  //             rounded-2xl
  //             border border-gray-100
  //             bg-white
  //             p-6
  //             shadow-md
  //             transition-all
  //             duration-300
  //             ease-out
  //             hover:-translate-y-2
  //             hover:shadow-2xl
  //           "
  //         >
  //           {/* Top gradient */}
  //           <div
  //             className="
  //               absolute left-0 top-0 h-1 w-full
  //               bg-gradient-to-r
  //               from-purple-500
  //               via-pink-500
  //               to-blue-500
  //               transition-all
  //               duration-300
  //               group-hover:h-2
  //             "
  //           />

  //           {/* Icon */}
  //           <div
  //             className="
  //               mb-5
  //               flex h-14 w-14
  //               items-center justify-center
  //               rounded-2xl
  //               bg-gradient-to-br
  //               from-purple-100
  //               to-pink-100
  //               text-2xl
  //               shadow-sm
  //               transition-all
  //               duration-300
  //               group-hover:scale-110
  //               group-hover:rotate-3
  //             "
  //           >
  //             📦
  //           </div>

  //           {/* Category Name */}
  //           <h2
  //             className="
  //               text-xl
  //               font-bold
  //               capitalize
  //               text-gray-800
  //               transition-colors
  //               duration-300
  //               group-hover:text-purple-600
  //             "
  //           >
  //             {category.name}
  //           </h2>

  //           {/* Products */}
  //           <div className="mt-4 flex items-center gap-2">
  //             <span
  //               className="
  //                 rounded-full
  //                 bg-purple-50
  //                 px-3
  //                 py-1
  //                 text-sm
  //                 font-medium
  //                 text-purple-600
  //               "
  //             >
  //               {category.products.length}{" "}
  //               {category.products.length === 1
  //                 ? "Product"
  //                 : "Products"}
  //             </span>
  //           </div>

  //           {/* Bottom */}
  //           <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
  //             <span className="text-xs text-gray-400">
  //               ID: {category._id.slice(-6)}
  //             </span>

  //             <button
  //               className="
  //                 rounded-lg
  //                 bg-purple-50
  //                 px-3
  //                 py-2
  //                 text-sm
  //                 font-semibold
  //                 text-purple-600
  //                 transition-all
  //                 duration-300
  //                 hover:bg-purple-600
  //                 hover:text-white
  //                 hover:shadow-md
  //               "
  //             >
  //               View →
  //             </button>
  //           </div>

  //           {/* Hover glow */}
  //           <div
  //             className="
  //               pointer-events-none
  //               absolute -right-10 -top-10
  //               h-24 w-24
  //               rounded-full
  //               bg-purple-200/30
  //               blur-2xl
  //               transition-all
  //               duration-500
  //               group-hover:scale-150
  //             "
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      {/* <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Categories
      </h1>

      <p className="mt-2 text-slate-500">
        Explore and manage all product categories
      </p>
    </div> */}
      <div className="mb-8">
  <div className="flex items-center gap-3">
    <div className="h-8 w-1 rounded-full bg-indigo-600" />

    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-800">
        Categories
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        Explore and manage all product categories
      </p>
    </div>
  </div>
</div>

      {/* Categories */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="
            group relative overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white
            p-6
            shadow-md
            transition-all
            duration-300
            ease-out
            hover:-translate-y-2
            hover:shadow-2xl
          "
          >
            {/* Top gradient */}
            <div
              className="
              absolute left-0 top-0 h-1 w-full
              bg-gradient-to-r
              from-indigo-600
              via-indigo-500
              to-slate-700
              transition-all
              duration-300
              group-hover:h-2
            "
            />

            {/* Icon */}
            <div
              className="
              mb-5
              flex h-14 w-14
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-50
              to-slate-100
              text-2xl
              text-indigo-600
              shadow-sm
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:rotate-3
            "
            >
              📦
            </div>

            {/* Category Name */}
            <h2
              className="
              text-xl
              font-bold
              capitalize
              text-slate-800
              transition-colors
              duration-300
              group-hover:text-indigo-600
            "
            >
              {category.name}
            </h2>

            {/* Products */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className="
                rounded-full
                bg-indigo-50
                px-3
                py-1
                text-sm
                font-medium
                text-indigo-600
              "
              >
                {category.products.length}{" "}
                {category.products.length === 1 ? "Product" : "Products"}
              </span>
            </div>

            {/* Bottom */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-400">
                ID: {category._id.slice(-6)}
              </span>

              <Link
  href={`/Dashboard/categories/${category._id}`}
                className="
                rounded-lg
                bg-indigo-50
                px-3
                py-2
                text-sm
                font-semibold
                text-indigo-600
                transition-all
                duration-300
                hover:bg-indigo-600
                hover:text-white
                hover:shadow-md
                cursor-pointer
              "
              >
                View →
              </Link>
            </div>

            {/* Hover glow */}
            <div
              className="
              pointer-events-none
              absolute -right-10 -top-10
              h-24 w-24
              rounded-full
              bg-indigo-200/30
              blur-2xl
              transition-all
              duration-500
              group-hover:scale-150
            "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
