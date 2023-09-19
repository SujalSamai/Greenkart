"use client";

import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputComponent from "../../components/FormElements/InputComponent";
import { loginFormControls } from "../../utils";

const initialFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLoader,
    setComponentLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  function isFormValid() {
    return formData &&
      formData.email &&
      formData.email.trim() != "" &&
      formData.password &&
      formData.password.trim() != ""
      ? true
      : false;
  }

  async function handleLogin() {
    setComponentLoader({ loading: true, id: "" });
    const response = await login(formData);

    //if user is authenticated
    if (response.success) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(response?.finalData?.user);
      setFormData(initialFormData); //resetting the form after submitting

      //storing the user token to cookies & user data in localstorage so that user stays logged in
      Cookies.set("token", response?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(response?.finalData?.user));
      setComponentLoader({ loading: false, id: "" });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLoader({ loading: false, id: "" });
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-10 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-2xl font-medium text-center">
                Login to GreenKart.
              </p>

              <div className="w-full mt-6 mr-0 ml-0 mb-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ) : null
                )}
                <button
                  className="text-white inline-flex w-full items-center justify-center bg-secondary px-6 py-4 text-lg hover:text-[#adc3b6] transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide disabled:opacity-80"
                  disabled={!isFormValid()}
                  onClick={handleLogin}
                >
                  {componentLoader && componentLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Logging in"}
                      color={"#ffffff"}
                      loading={componentLoader && componentLoader.loading}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to GreenKart? </p>
                  <button
                    onClick={() => router.push("/register")}
                    className="inline-flex w-full items-center justify-center bg-secondary px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
