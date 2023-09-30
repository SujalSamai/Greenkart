"use client";

import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

export default function ProductButtons({ item }) {
  const pathName = usePathname();
  const { setCurrentUpdatedProduct } = useContext(GlobalContext);
  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");
  return isAdminView ? (
    <>
      <button
        className="mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md"
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
      >
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
