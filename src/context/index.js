"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [componentLoader, setComponentLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  //when we refresh the page, if the user's token is present in cookie, that means they are authenticated
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      //we will fetch user data from localStorage, if user don't have any data as of now we will fetch an empty object
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
      setUser({});
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLoader,
        setPageLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLoader,
        setComponentLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
