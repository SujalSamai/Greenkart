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
      <div className="mx-auto px-3 lg:px-20">
        <div>
          {navOptions.map((item) =>
            pathName.includes(item.path) ? (
              <div className="font-semibold text-4xl text-secondary font-heading px-3 md:px-0">
                {item.label}
              </div>
            ) : null
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-10 lg:gap-x-3 lg:gap-y-16 md:grid-cols-3 lg:grid-cols-4 mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  key={item._id}
                  className="max-w-[20rem] flex flex-col overflow-hidden cursor-pointer bg-white/40 justify-between"
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
