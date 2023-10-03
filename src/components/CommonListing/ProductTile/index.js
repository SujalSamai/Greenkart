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
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-64 p-2">
        <img
          src={item.imageUrl}
          alt="product-image"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125 border border-secondary rounded-sm"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 mt-4 mx-2 rounded-sm bg-secondary/80">
          <p className="rounded-full p-1 text-8px font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="my-2 mx-auto flex w-11/12 flex-col items-start justify-between">
        <div className="mb-2 flex">
          <p
            className={`mr-3 text-sm font-semibold ${
              item.onSale === "yes" ? "line-through" : ""
            }`}
          >{`₹ ${item.price}`}</p>
          {item.onSale === "yes" ? (
            <p className="mr-2 text-sm font-semibold text-red-700">{`₹ ${(
              item.price -
              item.price * (item.priceDrop / 100)
            ).toFixed(2)}`}</p>
          ) : null}
          {item.onSale === "yes" ? (
            <p className="text-sm font-semibold">{`(-${item.priceDrop})% off`}</p>
          ) : null}
        </div>
        <h3 className="mb-2 text-secondary text-xs">{item.name}</h3>
      </div>
    </div>
  );
}
