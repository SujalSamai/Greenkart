"use client";

import { GlobalContext } from "@/context";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllOrdersForUser } from "@/services/order";
import { PulseLoader } from "react-spinners";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";
import { GiCardboardBoxClosed } from "react-icons/gi";

export default function Orders() {
  const {
    user,
    pageLoader,
    setPageLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    setPageLoader(true);
    const res = await getAllOrdersForUser(user?._id);

    if (res.success) {
      setPageLoader(false);

      setAllOrdersForUser(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLoader(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);
  if (pageLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto lg:px-8 ">
        <div className="mt-8 mx-auto max-w-screen-xl px-0 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10 ">
              <div className="mb-4 text-4xl font-heading font-bold">
                Your Orders
              </div>
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4 ">
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className="bg-coolmint p-2 sm:p-5 flex flex-col py-6 text-left shadow-custom shadow-secondary/30 bg-white"
                      >
                        <div className="flex items-center gap-3 ">
                          <GiCardboardBoxClosed className="h-10 w-10" />
                          <div className="flex flex-col">
                            <h1
                              className={`${
                                item.isProcessing
                                  ? "text-red-500"
                                  : "text-secondary"
                              } font-bold text-xl`}
                            >
                              {item.isProcessing
                                ? "Order is Processing..."
                                : "Order is delivered!!"}
                            </h1>
                            <p className="text-sm text-gray-600">
                              Ordered on:{" "}
                              {item &&
                                item.createdAt &&
                                item.createdAt.split("T")[0]}{" "}
                            </p>
                          </div>
                        </div>
                        <div className="flex md:flex-row flex-col md:items-center bg-primary px-5 mt-6 pt-5">
                          <h2 className="font-bold flex-1 items-center text-sm sm:text-base">
                            OrderID: #{item._id}
                          </h2>
                          <div className="flex items-center">
                            <p className="mr-3 font-medium text-gray-900 text-sm sm:text-base">
                              Total paid amount:
                            </p>
                            <p className="mr-3 font-semibold text-gray-900">
                              ₹{item.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 bg-primary p-5">
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className="shrink-0 flex gap-5">
                              <img
                                alt="Order Item"
                                className="h-24 w-24 max-w-full rounded-md object-cover"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                              <div className="flex flex-col gap-1">
                                <h2 className="md:text-lg font-bold text-secondary">
                                  {orderItem &&
                                    orderItem.product &&
                                    orderItem.product.name}
                                </h2>
                                <h2 className="text-sm md:text-base text-secondary">
                                  {orderItem &&
                                    orderItem.product &&
                                    orderItem.product.brand}
                                </h2>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center gap-5 bg-primary px-5 pb-5">
                          <hr class="w-9/12 h-1 bg-gray-800 border-0 rounded mt-4 hidden md:block"></hr>
                          <button
                            onClick={() => router.push(`/orders/${item._id}`)}
                            className="mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium tracking-wide rounded-md hover:bg-hover transition-custom"
                          >
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <h1 className="font-bold text-xl mt-8">No orders found!</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
