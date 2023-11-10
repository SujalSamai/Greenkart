"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Facts from "@/components/HomePage/Facts";
import ShopByCategory from "@/components/HomePage/ShopByCategory";
import WhyUs from "@/components/HomePage/WhyUs";

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
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto  lg:gap-8 xl:gap-0 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="font-heading max-w-2xl mb-4 text-6xl font-bold tracking-tight leading-none md:text-7xl">
              Best eco-friendly collection.
            </h1>
            <p className="max-w-2xl mb-6 text-green-900 lg:mb-8 tracking-wide text-justify font-medium">
              Welcome to <b>GREENKART</b> – your one-stop destination for
              organic, sustainable and environmentally conscious shopping! In a
              world where our choices have a profound impact on the planet, we
              believe that e-commerce can be a force for good. Our mission is to
              provide you with a unique online shopping experience that not only
              caters to your needs but also champions the well-being of our
              planet.
              <br />
              <br />
              Introducing our latest eco-friendly collection, a testament to our
              commitment to sustainability and the planet. Crafted with the
              environment in mind, each item here is made from carefully
              selected, ethically sourced materials that minimize our carbon
              footprint. From organic cotton clothing to biodegradable cutlery,
              every item combines needs with eco-consciousness.
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="font-buttons mt-1.5 inline-block bg-secondary px-5 py-3 text-sm rounded-md lowercase font-medium tracking-wide text-white shadow-custom hover:bg-purple-600 hover:scale-105"
            >
              Explore Shop Collection
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-end">
            <img src="/3d.png" alt="Explore Shop Collection" />
          </div>
        </div>
        <WhyUs />
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900">
                  Diwali Sale Collection
                </h2>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-8 w-full md:w-9/12 inline-block bg-secondary px-5 py-3 text-xs rounded-md font-medium lowercase tracking-wide text-white shadow-custom hover:bg-purple-600 hover:scale-105"
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
        <Facts />
        <ShopByCategory />
      </section>
    </main>
  );
}
