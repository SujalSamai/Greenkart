"use client";

import ItemsCount from "@/components/ItemsCount";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { Dialog } from "@headlessui/react";

function RadioButtons({ id, label, sizeSelect, setSizeSelect }) {
  return (
    <div className="flex items-center gap-1 mx-2">
      <input
        type="radio"
        value={id}
        name={label}
        checked={sizeSelect === id}
        onChange={(e) => setSizeSelect(e.target.value)}
      ></input>
      <p>{label}</p>
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
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(false);
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

  function toggleModal(getItem) {
    setShowModal(true);
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
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto bg-black/80 w-full h-full z-10">
          <div className="fixed inset-0 overflow-y-auto left-0 bottom-0 top-auto md:left-[30%] md:top-[30%] w-full md:w-5/12 bg-secondary h-44 md:h-64 shadow-custom flex flex-col justify-between items-center gap-3 pt-4 md:pt-10 rounded-md z-50">
            <span className="absolute top-0 w-full mr-2 text-lg text-gray-300 flex justify-end">
              <IoIosCloseCircle
                className="h-8 w-8 md:h-10 md:w-10"
                onClick={() => setShowModal(false)}
              />
            </span>
            <div className="w-full flex flex-col justify-between items-center h-full">
              <div className="flex flex-col justify-center w-full items-center h-full gap-8">
                <div className="w-full flex flex-col items-center gap-1 text-white">
                  <p>Quantity:</p>
                  <ItemsCount count={itemQuantity} setCount={setItemQuantity} />
                </div>
                {item && item.sizes.length > 0 && (
                  <div className="flex items-center mx-1 text-white">
                    <p className="">Size:</p>
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
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-primary px-5 py-3 text-sm font-medium tracking-wide text-secondary hover:bg-black hover:text-primary transition-custom rounded-b-md"
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
                  "Done"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        <button
          onClick={() => setShowModal(true)}
          className="mx-4 my-2 mt-1.5 flex w-full justify-center bg-secondary px-5 py-3 text-xs font-medium tracking-wide text-white rounded-md hover:bg-hover transition-custom"
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
      </div>
    </div>
  );
}
