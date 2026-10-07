"use client";

import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { ArrowLeft, Package } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  _id: string;
  name: string;
  products: string[];
  __v: number;
}

const CategoryDetails = () => {
  const params = useParams();
  const router = useRouter();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const getCategoryById = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(
        `/category/${params.id}`
      );

      setCategory(data.category);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(
        err.response?.data?.message ||
          "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryById();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Loading category...
        </p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Category not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="
            mb-5 flex items-center gap-2
            rounded-lg
            px-3 py-2
            text-sm font-medium
            text-slate-500
            transition-all
            hover:bg-white
            hover:text-indigo-600
            hover:shadow-sm
          "
        >
          <ArrowLeft size={18} />
          Back to Categories
        </button>

        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-indigo-600" />

          <div>
            <h1 className="text-3xl font-bold capitalize tracking-tight text-slate-800">
              {category.name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Category details
            </p>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="max-w-3xl">
        <div
          className="
            group relative overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white
            p-7
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          {/* Top Gradient */}
          <div
            className="
              absolute left-0 top-0
              h-1 w-full
              bg-gradient-to-r
              from-indigo-600
              via-indigo-500
              to-slate-700
            "
          />

          {/* Icon */}
          <div
            className="
              mb-6 flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-50
              to-slate-100
              text-indigo-600
              shadow-sm
              transition-all
              duration-300
              group-hover:scale-110
            "
          >
            <Package size={30} />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold capitalize text-slate-800">
            {category.name}
          </h2>

          {/* Info */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-400">
                Category ID
              </p>

              <p className="mt-2 break-all text-sm font-semibold text-slate-700">
                {category._id}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-4">
              <p className="text-xs font-medium text-indigo-400">
                Products
              </p>

              <p className="mt-2 text-2xl font-bold text-indigo-600">
                {category.products.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;