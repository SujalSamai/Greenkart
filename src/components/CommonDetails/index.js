"use client";

import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { addToCart } from "@/services/cart";
import ComponentLevelLoader from "../Loader/ComponentLevel";
import Notification from "../Notification";
import ItemsCount from "../ItemsCount";

export default function CommonDetails({ item }) {
  const { setComponentLoader, componentLoader, user, setShowCartModal } =
    useContext(GlobalContext);
  const [sizeSelect, setSizeSelect] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  async function handleAddToCart(getItem) {
    setComponentLoader({ loading: true, id: "" });
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
      setShowCartModal(true);
    }
  }

  function handleSizeClick(getCurrentItem) {
    if (getCurrentItem.id === sizeSelect) {
      setSizeSelect("");
    } else {
      setSizeSelect(getCurrentItem.id);
    }
  }

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16 py-20 md:py-10">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl max-h-[40rem] overflow-hidden rounded-md">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full max-w-full object-cover hover:scale-110 transition-custom"
                    alt="Product Details"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-4xl font-bold text-gray-900 font-heading">
              {item && item.name}
            </h1>
            <h3 className="text-xl font-bold text-gray-600 font-heading">
              {item && item.brand}
            </h3>
            <div className="mt-10 flex flex-col items-start justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1
                  className={`mr-3 text-3xl font-bold ${
                    item.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  ₹{item && item.price}
                </h1>
                {item.onSale === "yes" ? (
                  <h1 className="text-3xl mr-2 font-bold text-red-700">{`₹${(
                    item.price -
                    item.price * (item.priceDrop / 100)
                  ).toFixed(2)}`}</h1>
                ) : null}
              </div>
              <button
                className="rounded-md mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium tracking-wide text-white hover:bg-hover transition-custom"
                type="button"
                onClick={() => handleAddToCart(item)}
              >
                {componentLoader && componentLoader.loading ? (
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
            <div className="mt-10 flex items-center gap-5">
              <h4 className="text-xl font-bold text-gray-700">Quantity: </h4>
              <ItemsCount count={itemQuantity} setCount={setItemQuantity} />
            </div>
            <div className="mt-8 flow-root sm:mt-12 mb-8 text-gray-700 tracking-wide font-buttons">
              {item && item.description}
            </div>
            <ul className="mt-8 space-y-2">
              {item && item.color ? (
                <li className="flex gap-1 items-center text-left text-sm font-medium text-gray-600">
                  <strong>Color:</strong> {item && item.color}
                </li>
              ) : null}
              {item && item.dimensions ? (
                <li className="flex gap-1 items-center text-left text-sm font-medium text-gray-600">
                  <strong>Dimensions:</strong> {item && item.dimensions}
                </li>
              ) : null}
              {item && item.skinType ? (
                <li className="flex gap-1 items-center text-left text-sm font-medium text-gray-600">
                  <strong>Suitable for:</strong> {item && item.skinType}
                </li>
              ) : null}

              <li className="flex gap-1 items-center text-left text-sm font-medium text-gray-600">
                <strong>Shipping Time:</strong> {item && item.deliveryInfo}
              </li>
              <li className="flex flex-col gap-1 text-left text-sm font-medium text-gray-600">
                <span className="font-bold">Product Details:</span>
                <p>{item && item.manufactured}</p>
              </li>
              {item && item.sizes && item.sizes.length > 0 ? (
                <li className="flex flex-col gap-1 text-left text-sm font-medium text-gray-600">
                  <span className="font-bold">Available Sizes:</span>
                  <div className="mt-3 flex flex-wrap items-center gap-1">
                    {item.sizes.map((dataItem) => (
                      <label
                        className="cursor-pointer"
                        key={dataItem.id}
                        onClick={() => handleSizeClick(dataItem)}
                      >
                        <span
                          className={`rounded-md border border-secondary px-4 py-2 font-bold ${
                            sizeSelect === dataItem.id
                              ? "bg-secondary text-primary"
                              : "bg-primary text-secondary"
                          }`}
                        >
                          {dataItem.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </li>
              ) : null}
            </ul>
            <div className="mt-10">
              <p className="font-bold text-red-500">
                {item && item.availability}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
