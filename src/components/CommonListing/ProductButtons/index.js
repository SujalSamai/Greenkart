"use client";

import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButtons({ item }) {
  const pathName = usePathname();
  const { setCurrentUpdatedProduct, setComponentLoader, componentLoader } =
    useContext(GlobalContext);
  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProduct(item) {
    setComponentLoader({ loading: true, id: item._id });
    const res = await deleteAProduct(item._id);
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLoader({ loading: false, id: "" });
    }
  }

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
      <button
        onClick={() => handleDeleteProduct(item)}
        className="mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md"
      >
        {componentLoader &&
        componentLoader.loading &&
        item._id === componentLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLoader && componentLoader.loading}
          />
        ) : (
          "Delete Item"
        )}
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
