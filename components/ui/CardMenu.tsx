"use client";
import { useState, useRef, useEffect } from "react";

type Props = {
  onUpdate: () => void;
  onDelete: () => void;
};

export default function CardMenu({ onUpdate, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="absolute right-4 top-5 z-20">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
        aria-label="Options"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          <button
            onClick={() => { setOpen(false); onUpdate(); }}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50"
          >
            ✏️ Update
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}