"use client";

export default function ProductTile({ item }) {
  return (
    <div>
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
          <p className="text-sm font-semibold">{`₹ ${item.price}`}</p>
        </div>
        <h3 className="mb-2 text-secondary text-xs">{item.name}</h3>
      </div>
    </div>
  );
}
