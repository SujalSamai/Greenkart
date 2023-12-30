"use client";

import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { getAllOrdersForAllUsers, updateStatusOfOrder } from "@/services/order";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { GiCardboardBoxClosed } from "react-icons/gi";

export default function AdminView() {
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    pageLoader,
    setPageLoader,
    componentLoader,
    setComponentLoader,
  } = useContext(GlobalContext);
  async function extractAllOrdersForAllUsers() {
    setPageLoader(true);
    const res = await getAllOrdersForAllUsers();
    if (res.success) {
      setPageLoader(false);
      setAllOrdersForAllUsers(
        res.data && res.data.length
          ? res.data.filter((item) => item.user._id !== user._id)
          : []
      );
    }
  }
  useEffect(() => {
    if (user !== null) {
      extractAllOrdersForAllUsers();
    }
  }, [user]);

  async function handleOrderUpdateStatus(getItem) {
    setComponentLoader({ loading: true, id: getItem._id });
    const res = await updateStatusOfOrder({
      ...getItem,
      isProcessing: false,
    });
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      extractAllOrdersForAllUsers();
    } else {
      setComponentLoader({ loading: true, id: "" });
    }
    console.log("res -> ", res);
  }

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
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="mt-10 lg:mt-6 text-4xl lg:text-5xl mx-2 md:mx-4 font-bold text-secondary font-heading">
            Manage Your Orders
          </div>
          <div className="lg:px-4 py-6 sm:py-10">
            <div className="flow-root">
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                <ul className="flex flex-col gap-4">
                  {allOrdersForAllUsers.map((item) => (
                    <li
                      key={item._id}
                      className="bg-coolmint p-2 sm:p-5 flex flex-col py-6 text-left shadow-custom shadow-secondary/30 bg-white"
                    >
                      <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <GiCardboardBoxClosed className="h-10 w-10" />
                        <div className="flex-1">
                          <h1 className="font-bold md:text-lg">
                            OrderID: #{item._id}
                          </h1>
                          <p className="text-sm text-gray-600">
                            Ordered on:{" "}
                            {item &&
                              item.createdAt &&
                              item.createdAt.split("T")[0]}{" "}
                          </p>
                          <p
                            className={`${
                              item.isProcessing
                                ? "text-red-500"
                                : "text-secondary"
                            } font-bold text-sm`}
                          >
                            {item.isProcessing
                              ? "Order is Processing..."
                              : "Order is delivered!!"}
                          </p>
                          <hr className="w-full h-1 bg-gray-800 rounded md:hidden my-2"></hr>
                        </div>
                        <div className="flex flex-col md:gap-2">
                          <div className="flex items-center md:my-0.5">
                            <p className="mr-1 text-sm font-medium text-gray-900">
                              User Name :
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              {item?.user?.name}
                            </p>
                          </div>
                          <div className="flex items-center flex-wrap md:my-0.5">
                            <p className="mr-1 text-sm font-medium text-gray-900">
                              Email :
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              {item?.user?.email}
                            </p>
                          </div>
                          <div className="flex items-center my-0.5">
                            <p className="mr-1 text-sm font-medium text-gray-900">
                              Total Amount Paid :
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              ₹{item?.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 bg-primary p-4 mt-2">
                        {item.orderItems.map((orderItem, index) => (
                          <div key={index} className="shrink-0">
                            <img
                              alt="Order Item"
                              className="h-24 w-24 max-w-full rounded-md object-cover"
                              src={
                                orderItem &&
                                orderItem.product &&
                                orderItem.product.imageUrl
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center gap-5 bg-primary px-5 pb-5 ">
                        <hr class="w-9/12 h-1 bg-gray-800 border-0 rounded mt-4 hidden md:block"></hr>
                        <button
                          onClick={() => handleOrderUpdateStatus(item)}
                          disabled={!item.isProcessing}
                          className="mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium tracking-wide rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-hover transition-custom"
                        >
                          {componentLoader &&
                          componentLoader.loading &&
                          componentLoader.id === item._id ? (
                            <ComponentLevelLoader
                              text={"updating order status"}
                              color={"#ffffff"}
                              loading={
                                componentLoader && componentLoader.loading
                              }
                            />
                          ) : (
                            "Update Order Status"
                          )}
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
    </section>
  );
}
