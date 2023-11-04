"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-20 ">
      <section>
        <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="font-heading max-w-2xl mb-4 text-6xl font-bold tracking-tight leading-none md:text-7xl">
              Best eco-friendly collection.
            </h1>
            <p className="max-w-2xl mb-6 text-green-900 lg:mb-8 tracking-wide text-justify font-medium">
              Introducing our latest eco-friendly collection, a testament to our
              commitment to sustainability and the planet. Crafted with the
              environment in mind, each piece in this collection is made from
              carefully selected, ethically sourced materials that minimize our
              carbon footprint. From organic cotton clothing to biodegradable
              accessories, every item combines style with eco-consciousness. We
              believe in fashion that doesn't cost the Earth, and this
              collection is a beautiful step in that direction. Join us in
              making a difference and choose eco-friendly fashion that makes you
              feel good inside and out.
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="font-buttons mt-1.5 inline-block bg-secondary px-5 py-3 text-sm lowercase font-medium tracking-wide text-white"
            >
              Explore Shop Collection
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-end">
            <img src="/3d.png" alt="Explore Shop Collection" />
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900">
                  Diwali Sale Collection
                </h2>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-8 w-full md:w-9/12 inline-block bg-secondary px-5 py-3 text-xs font-medium lowercase tracking-wide text-white"
                >
                  Shop ALL
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
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer"
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
                            <h3 className="font-medium text-gray-900">
                              {productItem.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-800">
                              ${productItem.price}{" "}
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
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-4xl font-bold text-gray-950">
              SHOP BY CATEGORY
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://images.pexels.com/photos/2398375/pexels-photo-2398375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6 bg-white/10">
                  <h3 className="text-xl font-medium text-white">
                    Home & Kitchen
                  </h3>
                  <button
                    onClick={() => router.push("/product/listing/kitchen")}
                    className="mt-1.5 inline-block lowercase bg-secondary px-5 py-3 text-xs font-medium tracking-wide text-white "
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://images.pexels.com/photos/2557039/pexels-photo-2557039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6 bg-black/30">
                  <h3 className="text-xl font-medium text-white">Bags</h3>
                  <button
                    onClick={() => router.push("/product/listing/bags")}
                    className="mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium lowercase tracking-wide text-white backdrop-brightness-50"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">Fashion</h3>
                  <button
                    onClick={() => router.push("/product/listing/fashion")}
                    className="mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium lowercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
