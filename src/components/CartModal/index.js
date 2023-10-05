"use client";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { getAllCartItems } from "@/services/cart";

export default function CartModal() {
  const { showCartModal, setShowCartModal, user, cartItems, setCartItems } =
    useContext(GlobalContext);
  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      setCartItems(res.data);
      // storing the items in the local storage, beacuse they will be used in the checkout function
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }

    console.log(res);
  }
  useEffect(() => {
    if (user !== null) {
      extractAllCartItems();
    }
  }, [user]);
  return (
    <CommonModal
      show={showCartModal}
      setShow={setShowCartModal}
      showButtons={true}
      buttonComponent={
        <Fragment>
          <button type="button">Go to Cart</button>
          <button type="button">Checkout</button>
        </Fragment>
      }
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem) => {
              <li key={cartItem.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl
                    }
                    alt={
                      cartItem && cartItem.productID && cartItem.productID._id
                    }
                  />
                </div>
              </li>;
            })}
          </ul>
        ) : <div>null</div>
      }
    />
  );
}
