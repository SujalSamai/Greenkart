import { useRouter } from "next/navigation";

export default function SaleCollection({ saleName, products }) {
  const router = useRouter();
  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
        <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
          <div className="max-w-md mx-auto text-center lg:text-left">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900">
              {saleName} Sale Collection
            </h2>
            <button
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-8 w-full md:w-9/12 inline-block bg-secondary px-5 py-3 text-xs rounded-md font-medium tracking-wide text-white shadow-custom hover:bg-hover hover:scale-105"
            >
              Shop All
            </button>
          </div>
        </div>
        <div className="lg:col-span-2 lg:py-8">
          <ul className="grid grid-cols-2 gap-4">
            {products && products.length
              ? products
                  .filter((item) => item.onSale === "yes")
                  .splice(0, 2)
                  .map((productItem) => (
                    <li
                      onClick={() => router.push(`/product/${productItem._id}`)}
                      className="cursor-pointer hover:scale-[1.02] transition-custom hover:border-2 border-dashed border-gray-600 px-3 py-2"
                      key={productItem._id}
                    >
                      <div>
                        <img
                          src={productItem.imageUrl}
                          alt="Sale Product Item"
                          className="object-cover w-full rounded aspect-square"
                        />
                      </div>
                      <div className="mt-3">
                        <h3 className="font-medium text-gray-900 text-xl">
                          {productItem.name}
                        </h3>
                        <h3 className="font-medium text-gray-900">
                          {productItem.brand}
                        </h3>
                        <p className="mt-1 text-sm text-gray-800">
                          ₹{productItem.price}{" "}
                          <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                        </p>
                      </div>
                    </li>
                  ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
