"use client";

import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButtons({ item }) {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLoader,
    componentLoader,
    user,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
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

  async function handleAddToCart(getItem) {
    setComponentLoader({ loading: true, id: getItem._id });
    const res = await addToCart({
      productID: getItem._id,
      userID: user._id,
    });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
    console.log(res);
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
        componentLoader._id === item.id ? (
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
      <button
        onClick={() => handleAddToCart(item)}
        className="mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md hover:text-[#adc3b6]"
      >
        {componentLoader &&
        componentLoader.loading &&
        item._id === componentLoader.id ? (
          <ComponentLevelLoader
            text={"Adding Product to Cart"}
            color={"#ffffff"}
            loading={componentLoader && componentLoader.loading}
          />
        ) : (
          "Add to Cart"
        )}
      </button>
    </>
  );
}
