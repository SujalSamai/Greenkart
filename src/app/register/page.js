"use client";

import { useRouter } from "next/navigation";
import InputComponent from "../../components/FormElements/InputComponent";
import SelectComponent from "../../components/FormElements/SelectComponent";
import { registrationFormControls } from "../../utils";
import { useState } from "react";
import { registerNewUser } from "@/services/register";

const isRegisterd = false;

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData); //for updating form data
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
    const data = await registerNewUser(formData);
    console.log(data);
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-10 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-2xl font-medium text-center">
                {isRegisterd
                  ? "You are now registered with GreenKart!"
                  : "Create your GreenKart account."}
              </p>
              {isRegisterd ? (
                <button
                  className="inline-flex items-center justify-center bg-secondary mt-10 px-6 py-4 text-lg rounded-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
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
                    className="inline-flex w-full items-center justify-center bg-secondary px-6 py-4 text-lg rounded-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide disabled:opacity-80"
                    disabled={!isFormValid()}
                    onClick={handleRegisterOnSubmit}
                  >
                    Register
                  </button>
                  <div className="flex flex-col gap-2">
                    <p>
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="hover:underline hover:underline-offset-2"
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
    </div>
  );
}
