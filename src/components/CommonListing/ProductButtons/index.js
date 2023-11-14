"use client";

import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

function RadioButtons({ id, label, sizeSelect, setSizeSelect }) {
  return (
    <div className="flex items-center mx-1">
      <input
        type="radio"
        value={id}
        name={label}
        checked={sizeSelect === id}
        onChange={(e) => setSizeSelect(e.target.value)}
      ></input>
      {label}
    </div>
  );
}

export default function ProductButtons({ item }) {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLoader,
    componentLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [sizeSelect, setSizeSelect] = useState("");

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
      quantity: itemQuantity,
      size: sizeSelect,
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
      setShowCartModal(false);
    }
  }
  return isAdminView ? (
    <>
      <div className="p-2">
        <button
          className="mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium tracking-wide text-white rounded-md hover:bg-hover transition-custom"
          onClick={() => {
            setCurrentUpdatedProduct(item);
            router.push("/admin-view/add-product");
          }}
        >
          Update Info
        </button>
        <button
          onClick={() => handleDeleteProduct(item)}
          className="mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium tracking-wide text-white rounded-md hover:bg-red-500 transition-custom"
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
      </div>
    </>
  ) : (
    <div className="flex flex-col">
      {item && item.sizes.length > 0 && (
        <div className="flex items-center mx-1">
          <p className="text-sm">Size:</p>
          {item.sizes.map((dataItem) => {
            return (
              <RadioButtons
                id={dataItem.id}
                label={dataItem.label}
                sizeSelect={sizeSelect}
                setSizeSelect={setSizeSelect}
              />
            );
          })}
        </div>
      )}
      <div className="flex">
        <button
          onClick={() => handleAddToCart(item)}
          className="mx-1 my-2 mt-1.5 flex w-11/12 justify-center bg-secondary px-5 py-3 text-xs font-medium tracking-wide text-white rounded-md hover:bg-hover transition-custom"
        >
          {componentLoader &&
          componentLoader.loading &&
          item._id === componentLoader.id ? (
            <ComponentLevelLoader
              text={"Adding to Cart"}
              color={"#ffffff"}
              loading={componentLoader && componentLoader.loading}
            />
          ) : (
            "Add to Cart"
          )}
        </button>
        <div className="flex items-center">
          <label for="quantity" className="text-sm">
            Qty:
          </label>
          <select
            id="quantity"
            name="selectedQty"
            defaultValue="1"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            className="bg-primary border-2 border-dashed"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </div>
  );
}
