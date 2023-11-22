"use client";

import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession } from "@/services/stripe";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import { createNewOrder } from "@/services/order";

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
  const [orderSuccess, setOrderSuccess] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

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

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));

      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckOutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData")
        );

        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: getCheckOutFormData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            qty: item.quantity,
            product: item.productID,
            size: item.size,
          })),
          paymentMethod: "Stripe",
          totalPrice: cartItems.reduce(
            (total, item) => item.productID.price * item.quantity + total + 40,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };
        const res = await createNewOrder(createFinalCheckoutFormData);

        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
    createFinalOrder();
  }, [params.get("status"), cartItems]);

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
        unit_amount_decimal: item.productID.price * 100,
      },
      quantity: item.quantity,
    }));

    const price = cartItems.reduce(
      (total, item) => item.productID.price * item.quantity + total + 40,
      0
    );

    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });

    console.log(error);
  }

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        router.push("/orders");
      }, [2000]);
    }
  }, [orderSuccess]);

  if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  Your payment is successful and you will be redirected to
                  orders page in 2 seconds !
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderProcessing) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={isOrderProcessing}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-2xl md:text-4xl font-bold font-heading">
            Cart Summary
          </p>
          <div className="mt-4 space-y-3 rounded-md border bgwhite px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex rounded-md bg-white flex-row"
                  key={item._id}
                >
                  <img
                    src={item && item.productID && item.productID.imageUrl}
                    alt="Cart Item"
                    className="m-2 aspect-square h-28 w-28 rounded-md object-cover object-center"
                  />
                  <div className="flex w-full flex-col p-4">
                    <span className="font-bold">
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className="font-semibold">
                      ₹
                      {item &&
                        item.productID &&
                        item.productID.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty. Time to buy something!</div>
            )}
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping Address Details</p>
          <p className="text-gray-500">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((address) => (
                <div
                  key={address._id}
                  className={`border-2 p-6 rounded-md ${
                    selectedAddress === address._id ? "border-secondary" : ""
                  }`}
                >
                  <p>Name : {address.fullName}</p>
                  <p>
                    Address : {address.address}, {address.city},{" "}
                    {address.country} ({address.postalCode})
                  </p>
                  <button
                    className="mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium tracking-wide rounded-md"
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
            className="mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium tracking-wide rounded-md"
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
                      (total, item) =>
                        item.productID.price * item.quantity + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="text-lg font-bold text-gray-900">
                {cartItems && cartItems.length
                  ? `₹40 x ${cartItems.length}`
                  : "Free"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-900">
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
            <div className="pb-10">
              <button
                disabled={
                  (cartItems && cartItems.length === 0) ||
                  Object.keys(checkoutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium tracking-wide rounded-md hover:bg-hover transition-custom"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
