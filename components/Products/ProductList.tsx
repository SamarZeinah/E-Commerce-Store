"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
export type Product = {
  _id: string;
  productName: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
  discount: number;
  rating: number;
};

type ProductsResponse = {
  message: string;
  products: Product[];
};

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const router = useRouter();
  useEffect(() => {
   const getAllProducts = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await axiosInstance.get<ProductsResponse>(
      "/products/all"
    );

    setProducts(response.data.products);
  } catch {
    setError("Something went wrong while fetching products.");
  } finally {
    setLoading(false);
  }
};

    getAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">

         {/* Header */}
<div className="mb-8 flex items-center justify-between gap-4">
  <div className="flex items-center gap-3">
    <div className="h-8 w-1 rounded-full bg-indigo-600" />

    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-800">
        All Product
      </h1>
      <p className="mt-1 text-sm text-slate-500">
            Discover our products collection
      </p>
    </div>
  </div>
</div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <p className="py-10 text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
           
{products.map((product) => (
  <div
    key={product._id}
    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
  >
    {/* Product Image */}
    <div className="flex h-56 items-center justify-center bg-slate-50 p-4">
      {product.images?.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.productName}
          className="h-full w-full object-contain transition duration-300 hover:scale-105"
        />
      ) : (
        <span className="text-sm text-slate-400">
          No Image Available
        </span>
      )}
    </div>

    {/* Product Info */}
    <div className="p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
        {product.brand}
      </p>

      <h2 className="mt-2 truncate text-lg font-bold text-slate-800">
        {product.productName}
      </h2>

      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-slate-500">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-xl font-bold text-slate-900">
          {product.price.toLocaleString("en-US")} EGP
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            product.stock > 0
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </span>
      </div>

      <button
  type="button"
  onClick={() => router.push(`/Dashboard/products/${product._id}`)}
  className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-700 active:scale-[0.98] cursor-pointer"
>
  View Details
</button>
    </div>
  </div>
))}

          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsList;
