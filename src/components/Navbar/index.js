"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import Cookies from "js-cookie";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect } from "react";
import { HiMenuAlt1, HiUser, HiEyeOff, HiEye } from "react-icons/hi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import CommonModal from "../CommonModal";
import CartModal from "../CartModal";

function NavItems({ isModalView = false, router, isAdminView }) {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 font-medium md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-transparent ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 lowercase md:p-0 hover:text-gray-300 hover:scale-105 transition-custom border-b border-black rounded-sm md:border-none my-2"
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  setShowNavModal(false);
                }}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 lowercase md:p-0 hover:text-gray-300 hover:scale-105 transition-custom border-b border-black rounded-sm md:border-none my-2"
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  setShowNavModal(false);
                }}
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
  const {
    user,
    setUser,
    isAuthUser,
    setIsAuthUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    ) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
    setShowNavModal(false);
    setShowCartModal(false);
  }

  const isAdminView = pathName.includes("admin-view");

  function handleLogin() {
    router.push("/login");
    setShowNavModal(false);
  }

  return (
    <>
      <nav className="bg-secondary/90 text-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 font-para shadow-lg">
        <div className="px-4 flex items-center justify-between mx-auto">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/shopBag.png"
              width={100}
              height={100}
              priority
              className="p-2 drop-shadow-lg"
            />
          </div>
          <div className="flex items-center justify-center md:order-2 gap-1 md:gap-3">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  className={"md:mt-1.5 flex flex-col items-center"}
                  onClick={() => {
                    router.push("/account");
                    setShowNavModal(false);
                    setShowCartModal(false);
                  }}
                >
                  <img
                    title="Account"
                    src="https://img.icons8.com/?size=80&id=91244&format=png"
                    alt="user-male-circle"
                    className="w-10 h-10 hover:scale-110 transition-custom"
                  />
                  <span className="text-xs hidden md:block">account</span>
                </button>
                <button
                  className={"md:mt-1.5 flex flex-col items-center"}
                  onClick={() => {
                    setShowCartModal(true);
                    setShowNavModal(false);
                  }}
                >
                  <img
                    title="Cart"
                    src="https://d3sxshmncs10te.cloudfront.net/icon/free/svg/1794982.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcwMDA5MjgwMCwicSI6bnVsbCwiaWF0IjoxNjk5ODg3ODYyfQ__.74e534c3529efba7711bd098706cace89bc0125bbe1355ff641f2f0adc7429d6"
                    alt="shopping-cart-loaded"
                    className="w-10 h-10 hover:scale-110 transition-custom"
                  />
                  <span className="text-xs hidden md:block">cart</span>
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className={"md:mt-1.5 flex flex-col items-center"}
                  onClick={() => {
                    router.push("/");
                    setShowNavModal(false);
                    setShowCartModal(false);
                  }}
                >
                  <img
                    title="Client View"
                    src="https://img.icons8.com/office/80/change-user-male.png"
                    alt="change-user-male"
                    className="w-8 h-8 hover:scale-110 transition-custom"
                  />
                  <span className="text-xs hidden md:block">client</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    router.push("/admin-view");
                    setShowNavModal(false);
                    setShowCartModal(false);
                  }}
                  className={"md:mt-1.5 flex flex-col items-center"}
                >
                  <img
                    title="Admin View"
                    src="https://d3sxshmncs10te.cloudfront.net/icon/free/svg/1316200.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcwMDA5MjgwMCwicSI6bnVsbCwiaWF0IjoxNjk5ODg3NTU3fQ__.2af9d0f15ee33036717aae2b94d812daa69fe89519d88c0d8892d9eb4a778ccd"
                    alt="user-shield"
                    className="w-10 h-10 hover:scale-110 transition-custom"
                  />
                  <span className="text-xs hidden md:block">admin</span>
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className={
                  "font-buttons flex items-center md:bg-red-600 md:pl-2 md:pr-4 md:py-2 text-sm rounded-md font-medium tracking-wide md:shadow-custom hover:bg-red-700 text-white hover:scale-105 transition-custom"
                }
              >
                <MdOutlinePowerSettingsNew
                  title="Log Out"
                  className="w-8 h-8 md:w-5 md:h-5 m-1 text-red-600 md:text-white"
                />
                <span className="hidden md:block">Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className={
                  "font-buttons flex items-center gap-1 bg-[#009197] px-4 py-3 text-sm rounded-md font-medium tracking-wide shadow-custom hover:bg-sky-700 text-white hover:scale-105 transition-custom"
                }
              >
                <HiUser className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 mr-2 text-smtext-white md:hidden "
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => {
                showNavModal ? setShowNavModal(false) : setShowNavModal(true);
                setShowCartModal(false);
              }}
            >
              <span className="sr-only">Open main menu</span>
              {showNavModal ? (
                <RxCross1 className="text-2xl" />
              ) : (
                <HiMenuAlt1 className="text-3xl" />
              )}
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            isModalView={true}
            isAdminView={isAdminView}
            router={router}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
