"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

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
  reviews: unknown[];
  __v: number;
};

type ProductsResponse = {
  message: string;
  products: Product[];
};

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product details using Axios
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await axiosInstance.get<ProductsResponse>("/products/all");

        const selectedProduct = response.data.products.find(
          (item) => item._id === id,
        );

        if (!selectedProduct) {
          setProduct(null);
          setError("Product not found.");
          return;
        }

        setProduct(selectedProduct);
        setSelectedImage(0);
      } catch {
        setProduct(null);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProductDetails();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="animate-pulse text-indigo-600">
          Loading product details...
        </p>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-rose-600">{error || "Product not found."}</p>

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Product Details
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View all information about this product.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          ← Back to Products
        </button>
      </div>

      {/* Product Content */}
      
{/* Product Content */}
<div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">

  {/* Images */}
  <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 xl:col-span-7">

    {/* Main Image */}
    <div className="flex h-72 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-4 sm:h-[440px]">
      {product.images?.length > 0 ? (
        <img
          src={product.images[selectedImage]}
          alt={product.productName}
          className="h-full w-full object-contain transition duration-300"
        />
      ) : (
        <p className="text-sm text-slate-400">
          No Image Available
        </p>
      )}
    </div>

    {/* Images Slider */}
    {product.images?.length > 1 && (
      <div className="mt-10">
        <p className="mb-5 text-sm font-semibold text-slate-700">
          Product Images
        </p>

        <div className="flex gap-3 overflow-x-auto scroll-smooth pb-3">
          {product.images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={selectedImage === index}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-2 transition sm:h-24 sm:w-24 ${
                selectedImage === index
                  ? "border-indigo-600 ring-2 ring-indigo-100"
                  : "border-slate-200 hover:border-indigo-300"
              }`}
            >
              <img
                src={image}
                alt={`${product.productName} ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    )}
  </section>

  {/* Product Information */}
  <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-5">

    {/* Brand & Name */}
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
      {product.brand}
    </p>

    <h2 className="mt-2 break-words text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
      {product.productName}
    </h2>

    <p className="mt-3 text-sm leading-6 text-slate-500">
      {product.description || "No description available."}
    </p>

    {/* Price */}
    <div className="mt-6 rounded-xl bg-indigo-50/70 p-4">
      <p className="text-sm font-medium text-slate-500">
        Price
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-3">
        <span className="text-2xl font-bold text-indigo-700">
          {product.price.toLocaleString("en-US")} EGP
        </span>

        {product.discount > 0 && (
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">
            {product.discount}% OFF
          </span>
        )}
      </div>
    </div>

    {/* Stock & Rating */}
    <div className="mt-4 grid grid-cols-2 gap-3">

      <div className="rounded-xl border border-slate-100 p-3 sm:p-4">
        <p className="text-xs text-slate-500 sm:text-sm">
          Stock
        </p>

        <p
          className={`mt-2 text-sm font-bold sm:text-base ${
            product.stock > 0
              ? "text-emerald-600"
              : "text-rose-600"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} available`
            : "Out of stock"}
        </p>
      </div>

      <div className="rounded-xl border border-slate-100 p-3 sm:p-4">
        <p className="text-xs text-slate-500 sm:text-sm">
          Rating
        </p>

        <p className="mt-2 font-bold text-slate-900">
          ⭐ {product.rating}
        </p>
      </div>
    </div>

    {/* Category */}
    <div className="mt-5 border-b border-slate-100 pb-5">
      <p className="text-sm text-slate-500">
        Category
      </p>

      <p className="mt-1 break-words font-semibold text-slate-800">
        {product.category}
      </p>
    </div>

    {/* Colors */}
    <div className="mt-5">
      <h3 className="text-sm font-bold text-slate-900">
        Available Colors
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {product.colors?.length > 0 ? (
          product.colors.map((color, index) => (
            <span
              key={`${color}-${index}`}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"
            >
              {color}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-400">
            No colors available
          </span>
        )}
      </div>
    </div>

    {/* Sizes */}
    <div className="mt-5">
      <h3 className="text-sm font-bold text-slate-900">
        Available Sizes
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {product.sizes?.length > 0 ? (
          product.sizes.map((size, index) => (
            <span
              key={`${size}-${index}`}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700"
            >
              {size}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-400">
            No sizes available
          </span>
        )}
      </div>
    </div>

    {/* Product ID */}
    <div className="mt-5 border-t border-slate-100 pt-4">
      <p className="text-xs font-medium text-slate-500">
        Product ID
      </p>

      <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-600">
        {product._id}
      </p>
    </div>

  </section>
</div>


      {/* Reviews */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Reviews ({product.reviews?.length ?? 0})
        </h2>

        {product.reviews?.length ? (
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-700">
            {JSON.stringify(product.reviews, null, 2)}
          </pre>
        ) : (
          <p className="mt-3 text-sm text-slate-500">No reviews yet.</p>
        )}

        <p className="mt-4 text-xs text-slate-400">Version: {product.__v}</p>
      </section>
    </main>
  );
}
