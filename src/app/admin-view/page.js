"use client";

import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { getAllOrdersForAllUsers, updateStatusOfOrder } from "@/services/order";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

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
  console.log(allOrdersForAllUsers);

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
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                <ul className="flex flex-col gap-4">
                  {allOrdersForAllUsers.map((item) => (
                    <li
                      key={item._id}
                      className="bg-coolmint shadow p-5 flex flex-col space-y-3 py-6 text-left"
                    >
                      <div className="flex">
                        <h1 className="font-bold text-lg mb-3 flex-1">
                          OrderID: #{item._id}
                        </h1>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              User Name :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.user?.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Email :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.user?.email}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total Amount Paid :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              ₹{item?.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
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
                      <div className="flex gap-5">
                        <button className="disabled:opacity-50 mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded-md">
                          {item.isProcessing
                            ? "Order is Processing"
                            : "Order is delivered"}
                        </button>
                        <button
                          onClick={() => handleOrderUpdateStatus(item)}
                          disabled={!item.isProcessing}
                          className="mt-5 mr-5 inline-block bg-secondary text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
