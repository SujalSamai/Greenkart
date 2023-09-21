"use client";

import { usePathname } from "next/navigation";

export default function ProductButtons() {
  const pathName = usePathname();
  const isAdminView = pathName.includes("admin-view");
  return isAdminView ? (
    <>
      <button className="mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md">
        Update Info
      </button>
      <button className="mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md">
        Delete item
      </button>
    </>
  ) : (
    <>
      <button className="mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md">
        Add to Cart
      </button>
    </>
  );
}
