"use client";
import { useState } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea";
};

type Props = {
  open: boolean;
  title: string;
  fields: Field[];
  initialValues: Record<string, string>;
  loading?: boolean;
  onSubmit: (values: Record<string, string>) => void;
  onClose: () => void;
};

export default function EditDialog(props: Props) {
  if (!props.open) return null;
  // بيتعمل mount من جديد كل مرة تفتح، فالقيم بتتصفّر لوحدها
  return <EditForm {...props} />;
}

function EditForm({ title, fields, initialValues, loading, onSubmit, onClose }: Props) {
  const [values, setValues] = useState(initialValues);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>

        <div className="mt-4 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="mb-1 block text-sm font-medium text-slate-600">
                {f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-indigo-500"
                />
              ) : (
                <input
                  type={f.type ?? "text"}
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-indigo-500"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(values)}
            disabled={loading}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}