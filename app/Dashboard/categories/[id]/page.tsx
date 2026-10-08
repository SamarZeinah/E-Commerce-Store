"use client";

import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { ArrowLeft, Package } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Product = {
  _id: string;
  productName: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
  colors: string[];
  sizes: string[];
  discount: number;
  rating: number;
  reviews: string[];
  __v: number;
};

type Category = {
  _id: string;
  name: string;
  products: Product[];
  __v: number;
};

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

      setCategory(data.Category);
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
            cursor-pointer
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

      {/* Category Details */}
      <div className="max-w-5xl">
        <div
          className="
            group relative overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white
            p-7
            shadow-md
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
            "
          >
            <Package size={30} />
          </div>

          {/* Category Name */}
          <h2 className="text-2xl font-bold capitalize text-slate-800">
            {category.name}
          </h2>

          {/* Category Info */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-400">
                Version
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-700">
                {category.__v}
              </p>
            </div>
          </div>

          {/* Products */}
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold text-slate-800">
              Products
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {category.products.map((product) => (
                <div
                  key={product._id}
                  className="
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    p-5
                    transition-all
                    hover:border-indigo-200
                    hover:shadow-md
                  "
                >
                  {/* Product Name */}
                  <h4 className="text-lg font-bold text-slate-800">
                    {product.productName}
                  </h4>

                  {/* Brand */}
                  <p className="mt-1 text-sm text-slate-500">
                    Brand: {product.brand}
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">
                      {product.price} EGP
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  {/* Description */}
                  {/* <p className="mt-4 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p> */}

                  {/* Product Details */}
                  {/* <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-3">
                      <p className="text-xs text-slate-400">
                        Discount
                      </p>

                      <p className="mt-1 font-semibold text-slate-700">
                        {product.discount}%
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3">
                      <p className="text-xs text-slate-400">
                        Rating
                      </p>

                      <p className="mt-1 font-semibold text-slate-700">
                        {product.rating}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3">
                      <p className="text-xs text-slate-400">
                        Colors
                      </p>

                      <p className="mt-1 font-semibold text-slate-700">
                        {product.colors.length > 0
                          ? product.colors.join(", ")
                          : "No colors"}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-3">
                      <p className="text-xs text-slate-400">
                        Sizes
                      </p>

                      <p className="mt-1 font-semibold text-slate-700">
                        {product.sizes.length > 0
                          ? product.sizes.join(", ")
                          : "No sizes"}
                      </p>
                    </div>
                  </div> */}

                  {/* Product ID */}
                  {/* <div className="mt-4 border-t border-slate-200 pt-3">
                    <p className="text-xs text-slate-400">
                      Product ID
                    </p>

                    <p className="mt-1 break-all text-xs font-medium text-slate-600">
                      {product._id}
                    </p>
                  </div> */}

                  {/* Images & Reviews */}
                  {/* <div className="mt-3 flex gap-4 text-xs text-slate-400">
                    <span>
                      Images: {product.images.length}
                    </span>

                    <span>
                      Reviews: {product.reviews.length}
                    </span>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
