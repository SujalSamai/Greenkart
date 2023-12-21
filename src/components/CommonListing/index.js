"use client";

import ProductTile from "./ProductTile";
import ProductButtons from "./ProductButtons";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Notification from "../Notification";
import { navOptions } from "@/utils";
export default function CommonListing({ data }) {
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div>
          {navOptions.map((item) =>
            pathName.includes(item.path) ? (
              <div className="font-semibold text-4xl text-secondary font-heading px-3 md:px-0">
                {item.label}
              </div>
            ) : null
          )}
        </div>
        <div className="grid grid-cols-2 gap-1 md:gap-3 lg:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  key={item._id}
                  className="max-w-[20rem] flex flex-col overflow-hidden cursor-pointer bg-white md:rounded-md justify-between shadow-custom md:p-3"
                >
                  <ProductTile item={item} />
                  <ProductButtons item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
}
