"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import Image from "next/image";
import { HiMenuAlt1 } from "react-icons/hi";

const isAdminView = false;
const isAuthUser = false;
const user = {
  role: "admin",
};

function NavItems({ isModalView = false }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-32 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4  rounded md:p-0 hover:text-[#adc3b6]"
                key={item.id}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 rounded md:p-0 hover:text-[#adc3b6]"
                key={item.id}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center md:justify-between mx-auto">
          <div className="flex items-center cursor-pointer">
            <Image src="/logo.png" width={100} height={100} />
          </div>
          <div className="flex md:order-2 gap-2 mt-5 md:mt-0">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  className={
                    "md:mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#e5ece9] rounded-lg hover:text-[#adc3b6]"
                  }
                >
                  Account
                </button>
                <button
                  className={
                    "md:mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#e5ece9] rounded-lg hover:text-[#adc3b6]"
                  }
                >
                  Cart
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className={
                    "md:mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#e5ece9] rounded-lg hover:text-[#adc3b6]"
                  }
                >
                  Client View
                </button>
              ) : (
                <button
                  className={
                    "md:mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#e5ece9] rounded-lg hover:text-[#adc3b6]"
                  }
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                className={
                  "md:mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#e5ece9] rounded-lg hover:text-[#adc3b6]"
                }
              >
                Logout
              </button>
            ) : (
              <button
                className={
                  "md:mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#e5ece9] rounded-lg hover:text-[#adc3b6]"
                }
              >
                Login
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm rounded-lg hover:text-[#adc3b6] md:hidden text-[#295339] hover:bg-secondary"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => {
                showNavModal ? setShowNavModal(false) : setShowNavModal(true);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <HiMenuAlt1 className="text-3xl" />
            </button>
          </div>
          <NavItems />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={<NavItems isModalView={true} isAdminView={isAdminView} />}
        show={showNavModal}
        setShow={setShowNavModal}
      />
    </>
  );
}
