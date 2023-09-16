"use client";

import { useRouter } from "next/navigation";
import InputComponent from "../components/FormElements/InputComponent";
import SelectComponent from "../components/FormElements/SelectComponent";
import { registrationFormControls } from "../utils";

const isRegisterd = false;
export default function Register() {
  const router = useRouter();
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
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                      />
                    ) : null
                  )}
                  <button className="inline-flex w-full items-center justify-center bg-secondary px-6 py-4 text-lg rounded-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
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
