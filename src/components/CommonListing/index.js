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
      <div className="mx-auto max-w-screen-xl px-3 sm:px-6 lg:px-8">
      <div>
        {navOptions.map((item)=>(
          pathName.includes(item.path) ? <div className="font-semibold text-4xl text-secondary font-heading">{item.label}</div> : null
        ))}
      </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  key={item._id}
                  className="relative flex flex-col overflow-hidden cursor-pointer bg-white rounded-md justify-between shadow-xl shadow-secondary/50 my-3"
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
