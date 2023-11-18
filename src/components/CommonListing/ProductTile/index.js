"use client";

import { useRouter } from "next/navigation";

export default function ProductTile({ item }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/product/${item._id}`);
      }}
    >
      <div className="overflow-hidden aspect-w-[1] aspect-h-[1] h-44 md:h-64">
        <img
          src={item.imageUrl}
          alt="product-image"
          className="h-full w-full object-cover transition-custom group-hover:scale-125 md:border border-dashed border-secondary md:rounded-md"
        />
      </div>
      <div>
        <h3 className="my-1 mx-1 min-w-[6rem] md:h-7 text-secondary text-sm md:text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {item.name}
        </h3>
      </div>
      <p className="mx-1 min-w-[6rem] md:h-5 text-secondary/80 text-xs md:text-sm font-semibold  whitespace-nowrap overflow-hidden text-ellipsis">
        {item.brand}
      </p>
      {item.onSale === "yes" ? (
        <div className="absolute top-6 left-6 rounded-sm bg-secondary/90">
          <p className="rounded-full p-1 text-xs font-bold tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="mt-2 mb-3 mx-1 flex flex-col items-start justify-between">
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
