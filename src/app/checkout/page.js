"use client";

import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession } from "@/services/stripe";

export default function Checkout() {
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);

  const router = useRouter();
  // console.log("checkout", cartItems);

  const publishableKey =
    "pk_test_51O0cwlSEn9YaE0PU01zNkBlzwF1X94vSiwFOzSbLGCAcOfDuR1OHvCX0XfRoGTIv3q30d5d166a8VgxtKI6kuCF900sXZCxLoC";
  const stripePromise = loadStripe(publishableKey);

  async function getAllAddresses() {
    const res = await fetchAllAddresses(user?._id);
    if (res.success) {
      setAddresses(res.data);
    }
  }

  useEffect(() => {
    getAllAddresses();
  }, [user]);

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }
    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  }

  async function handleCheckout() {
    const stripe = await stripePromise;
    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });

    console.log(error);
  }
  //   console.log("address", addresses);
  // console.log("checkout form data", checkoutFormData);
  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-2xl font-bold">Cart Summary</p>
          <div className="mt-4 space-y-3 rounded-lg border bgwhite px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <img
                    src={item && item.productID && item.productID.imageUrl}
                    alt="Cart Item"
                    className="m-2 h-28 w-28 rounded-lg border object-cover object-center"
                  />
                  <div className="flex w-full flex-col p-4">
                    <span className="font-bold">
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className="font-semibold">
                      ₹{item && item.productID && item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty. Time to buy something!</div>
            )}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping Address Details</p>
          <p className="text-gray-500">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((address) => (
                <div
                  key={address._id}
                  className={`border-2 p-6 rounded-lg ${
                    selectedAddress === address._id ? "border-secondary" : ""
                  }`}
                >
                  <p>Name : {address.fullName}</p>
                  <p>Address : {address.address}</p>
                  <p>City : {address.city}</p>
                  <p>Country : {address.country}</p>
                  <p>PostalCode : {address.postalCode}</p>
                  <button
                    className="mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded-lg"
                    onClick={() => handleSelectedAddress(address)}
                  >
                    {address._id === selectedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </button>
                </div>
              ))
            ) : (
              <div>
                <p>No address found ! Please add a new address below.</p>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              router.push("/account");
            }}
            className="mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded-lg"
          >
            Add new Address
          </button>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="text-lg font-bold text-gray-900">
                ₹
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="text-lg font-bold text-gray-900">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-900">
                ₹
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="pb-10">
              <button
                disabled={
                  (cartItems && cartItems.length === 0) ||
                  Object.keys(checkoutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
