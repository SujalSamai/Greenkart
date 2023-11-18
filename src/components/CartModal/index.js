"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/ComponentLevel";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    cartItems,
    setCartItems,
    user,
    setComponentLoader,
    componentLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLoader({ loading: false, id: getCartItemID });
    }
  }
  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl
                    }
                    alt="Cart Item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col ">
                  <div>
                    <h3 className="text-sm">
                      {cartItem &&
                        cartItem.productID &&
                        cartItem.productID.name}
                    </h3>
                    <div className="flex items-center gap-4 flex-wrap">
                      <p className="mt-1 text-xs text-gray-600">
                        ₹
                        {cartItem &&
                          cartItem.productID &&
                          cartItem.productID.price}
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        Quantity: {cartItem && cartItem.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-yellow-600 sm:order-2 rounded-md hover:text-yellow-700 hover:scale-105 transition-custom"
                      onClick={() => handleDeleteCartItem(cartItem._id)}
                    >
                      {componentLoader &&
                      componentLoader.loading &&
                      componentLoader.id === cartItem._id ? (
                        <ComponentLevelLoader
                          text={"Removing"}
                          color={"#000000"}
                          loading={componentLoader && componentLoader.loading}
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-xl font-semibold">Your cart is empty!</div>
        )
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            onClick={() => {
              router.push("/cart");
              setShowCartModal(false);
            }}
            className="rounded-md mt-1.5 w-full inline-block bg-secondary text-white px-5 py-3 text-sm font-medium tracking-wide hover:bg-hover transition-custom"
          >
            Go To Cart
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            onClick={() => {
              router.push("/checkout");
              setShowCartModal(false);
            }}
            type="button"
            className="mt-1.5 w-full inline-block bg-secondary text-white px-5 py-3 text-sm font-medium  tracking-wide disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-hover transition-custom"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600 rounded-md">
            <button
              type="button"
              className="font-medium text-grey hover:scale-105 transition-custom"
              onClick={() => {
                router.push("/product/listing/all-products");
                setShowCartModal(false);
              }}
            >
              Continue Shopping
              <span aria-hidden="true" className="text-lg">
                {" "}
                &rarr;
              </span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
