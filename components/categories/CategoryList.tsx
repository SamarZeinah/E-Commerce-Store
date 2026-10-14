


"use client";

import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import CardMenu from "@/components/ui/CardMenu";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EditDialog from "@/components/ui/EditDialog";

interface Category {
  _id: string;
  name: string;
  products: string[];
  __v: number;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

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

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);

    try {
      await axiosInstance.delete(`/category/delete/${deleteTarget._id}`);
      setCategories((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      toast.success("Category deleted ✅");
      setDeleteTarget(null);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (values: Record<string, string>) => {
    if (!editTarget) return;
    setActionLoading(true);

    try {
      await axiosInstance.put(`/category/update/${editTarget._id}`, values);
      setCategories((prev) =>
        prev.map((c) => (c._id === editTarget._id ? { ...c, ...values } : c))
      );
      toast.success("Category updated ✅");
      setEditTarget(null);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAdd = async (values: Record<string, string>) => {
  if (!values.name?.trim()) {
    toast.error("Category name is required ❌");
    return;
  }
  setActionLoading(true);

  try {
    const { data } = await axiosInstance.post("/category/add", {
      name: values.name.trim(),
    });
    setCategories((prev) => [...prev, data.category]);
    toast.success("Category added ✅");
    setAddOpen(false);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data?.message || "Something went wrong ❌");
  } finally {
    setActionLoading(false);
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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      {/* Header */}
<div className="mb-8 flex items-center justify-between gap-4">
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

  <button
    onClick={() => setAddOpen(true)}
    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
  >
    <span className="text-lg leading-none">+</span>
    Add Category
  </button>
</div>

      {/* Categories */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* الزخارف (جوه div بيعمل overflow-hidden بدل الكارد) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-slate-700 transition-all duration-300 group-hover:h-2" />
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-200/30 blur-2xl transition-all duration-500 group-hover:scale-150" />
            </div>

            {/* قايمة التلات نقط */}
            <CardMenu
              onUpdate={() => setEditTarget(category)}
              onDelete={() => setDeleteTarget(category)}
            />

            {/* Icon */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-100 text-2xl text-indigo-600 shadow-sm transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
              📦
            </div>

            {/* Category Name */}
            <h2 className="text-xl font-bold capitalize text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">
              {category.name}
            </h2>

            {/* Products */}
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
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
                className="cursor-pointer rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-md"
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        message={`Delete "${deleteTarget?.name}"? This action can't be undone.`}
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Update dialog */}
      <EditDialog
        open={!!editTarget}
        title="Update Category"
        fields={[{ name: "name", label: "Category name" }]}
        initialValues={{ name: editTarget?.name ?? "" }}
        loading={actionLoading}
        onSubmit={handleUpdate}
        onClose={() => setEditTarget(null)}
      />
      {/* Add dialog */}
<EditDialog
  open={addOpen}
  title="Add Category"
  fields={[{ name: "name", label: "Category name" }]}
  initialValues={{ name: "" }}
  loading={actionLoading}
  onSubmit={handleAdd}
  onClose={() => setAddOpen(false)}
/>
    </div>
  );
};

export default CategoryList;