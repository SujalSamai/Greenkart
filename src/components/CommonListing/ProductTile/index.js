"use client";

import { useRouter } from "next/navigation";

export default function ProductTile({ item }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/product/${item._id}`);
      }}
      className="relative"
    >
      <div className="overflow-hidden aspect-w-[1] aspect-h-[1] h-56 md:h-96 shadow-md">
        <img
          src={item.imageUrl}
          alt="product-image"
          className="h-full w-full object-cover transition-all ease-out duration-300 hover:scale-110"
        />
      </div>
      <div>
        <h3 className="mt-5 mb-2 mx-4 min-w-[6rem] md:h-8 text-secondary text-lg md:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis font-heading">
          {item.name}
        </h3>
      </div>
      <p className="mx-4 min-w-[6rem] md:h-5 text-secondary/80 text-xs md:text-sm font-semibold  whitespace-nowrap overflow-hidden text-ellipsis">
        {item.brand}
      </p>
      {item.onSale === "yes" ? (
        <div className="absolute top-3 left-3 rounded-sm bg-secondary/90">
          <p className="rounded-full p-1 text-xs font-bold tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="mt-2 mb-3 mx-4 flex flex-col items-start justify-between">
        <div className="h-full flex justify-between">
          <p
            className={`mr-2 text-[0.65rem] md:text-sm font-semibold ${
              item.onSale === "yes" ? "line-through" : ""
            }`}
          >{`₹ ${item.price}`}</p>
          {item.onSale === "yes" ? (
            <div className="flex items-center">
              <p className="mr-2 text-[0.65rem] md:text-sm font-bold text-red-700">{`₹ ${(
                item.price -
                item.price * (item.priceDrop / 100)
              ).toFixed(2)}`}</p>
              <p className="text-[0.6rem] md:text-xs font-semibold text-gray-600">{`(${item.priceDrop}% off)`}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
