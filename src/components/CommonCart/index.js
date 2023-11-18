"use client";

import { useRouter } from "next/navigation";
import ComponentLevelLoader from "../Loader/ComponentLevel";

export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) {
  const router = useRouter();
  return (
    <section className="h-screen bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl sm:px-6 lg:px-8">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="-my-8">
                    {cartItems.map((cartItem) => (
                      <li
                        className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        key={cartItem.id}
                      >
                        <div className="shrink-0">
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl
                            }
                            alt="Product image"
                            className="rounded-md object-cover h-24 w-28"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-2xl font-semibold text-gray-900 font-heading">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                              <p className="font-semibold text-gray-900">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.brand}
                              </p>
                              <div>
                                <p className="text-sm font-semibold text-gray-700">
                                  Quantity: {cartItem && cartItem.quantity}
                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                  {cartItem &&
                                    cartItem.size &&
                                    `Size: ${
                                      cartItem &&
                                      cartItem.size.length > 0 &&
                                      cartItem.size.toUpperCase()
                                    }`}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                ₹
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.price * cartItem.quantity}
                              </p>
                              <button
                                type="button"
                                className="font-medium text-yellow-700 sm:order-2 rounded-md hover:text-yellow-900 hover:scale-105 transition-custom"
                                onClick={() =>
                                  handleDeleteCartItem(cartItem._id)
                                }
                              >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                componentLevelLoader.id === cartItem._id ? (
                                  <ComponentLevelLoader
                                    text={"Removing"}
                                    color={"#0000000"}
                                    loading={
                                      componentLevelLoader &&
                                      componentLevelLoader.loading
                                    }
                                  />
                                ) : (
                                  "Remove"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">Your cart is Empty !</h1>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg text-secondary font-semibold">
                    ₹
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) =>
                            item.productID.price * item.quantity + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Delivery Charge</p>
                  <p className="text-lg text-secondary font-semibold">
                    {cartItems && cartItems.length
                      ? `₹40 x ${cartItems.length}`
                      : "Free"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg text-secondary font-semibold">
                    ₹
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) =>
                            item.productID.price * item.quantity + total + 40,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={() => router.push("/checkout")}
                    disabled={cartItems && cartItems.length === 0}
                    className="disabled:opacity-50 group inline-flex w-full items-center justify-center bg-secondary px-6 py-2 md:py-4 md:text-lg text-white font-medium tracking-wide rounded-md hover:bg-hover transition-custom"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
