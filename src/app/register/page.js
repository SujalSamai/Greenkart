"use client";

import { useRouter } from "next/navigation";
import InputComponent from "../../components/FormElements/InputComponent";
import SelectComponent from "../../components/FormElements/SelectComponent";
import { registrationFormControls } from "../../utils";
import { useContext, useEffect, useState } from "react";
import { registerNewUser } from "@/services/register";
import { GlobalContext } from "@/context";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData); //for updating form data
  const [isRegisterd, setIsRegistered] = useState(false);
  const { isAuthUser, pageLoader, setPageLoader } = useContext(GlobalContext);

  const router = useRouter();

  //disabling the register button till any of the field is empty
  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleRegisterOnSubmit() {
    setPageLoader(true);
    const data = await registerNewUser(formData);
    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setPageLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLoader(false);
      setFormData(initialFormData);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-between py-0 md:px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-5 md:px-10 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-6 md:p-10 bg-white shadow-2xl rounded-md relative z-10">
              <p className="w-full text-lg md:text-2xl font-medium text-center">
                {isRegisterd
                  ? "You are now registered with GreenKart!"
                  : "Create your GreenKart account."}
              </p>
              {isRegisterd ? (
                <button
                  className="rounded-md inline-flex items-center justify-center bg-secondary mt-10 px-6 py-4 text-lg text-white transition-custom focus:shadow font-medium tracking-wide w-full"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 ml-0 mb-0 relative space-y-8">
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <button
                    className="rounded-md inline-flex w-full items-center justify-center bg-secondary px-6 py-2 md:py-4 lg:text-lg text-white transition-custom focus:shadow font-medium tracking-wide disabled:opacity-80 disabled:cursor-not-allowed shadow-custom hover:bg-hover hover:scale-105"
                    disabled={!isFormValid()}
                    onClick={handleRegisterOnSubmit}
                  >
                    {pageLoader ? (
                      <ComponentLevelLoader
                        text={"Registering"}
                        color={"#ffffff"}
                        loading={pageLoader}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                  <div className="flex flex-col gap-2 text-xs md:text-base">
                    <p>
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="hover:underline hover:underline-offset-2 text-cyan-500"
                      >
                        Login here.
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
