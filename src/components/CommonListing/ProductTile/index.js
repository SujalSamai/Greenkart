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
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-56 md:h-64">
        <img
          src={item.imageUrl}
          alt="product-image"
          className="h-full w-full object-cover transition-custom group-hover:scale-125 border border-secondary rounded-md"
        />
      </div>
      <h3 className="my-1 mx-2 text-secondary text-lg font-semibold">
        {item.name}
      </h3>
      <h3 className="mx-2 text-secondary/80 text-sm font-semibold">
        {item.brand}
      </h3>
      {item.onSale === "yes" ? (
        <div className="absolute top-6 left-6 rounded-sm bg-secondary/90">
          <p className="rounded-full p-1 text-xs font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="my-1 mx-auto flex w-11/12 flex-col items-start justify-between">
        <div className="flex">
          <p
            className={`mr-2 text-sm font-semibold ${
              item.onSale === "yes" ? "line-through" : ""
            }`}
          >{`₹ ${item.price}`}</p>
          {item.onSale === "yes" ? (
            <div className="flex items-center">
              <p className="mr-2 text-sm font-bold text-red-700">{`₹ ${(
                item.price -
                item.price * (item.priceDrop / 100)
              ).toFixed(2)}`}</p>
              <p className="text-xs font-semibold text-gray-600">{`(${item.priceDrop}% off)`}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
