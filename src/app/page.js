"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Facts from "@/components/HomePage/Facts";
import ShopByCategory from "@/components/HomePage/ShopByCategory";
import WhyUs from "@/components/HomePage/WhyUs";
import Hero from "@/components/HomePage/Hero";
import SaleCollection from "@/components/HomePage/SaleCollection";
import Marquee from "@/components/Marquee";
import Footer from "@/components/HomePage/Footer";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);

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
    <main className="flex min-h-screen flex-col items-center justify-between p-3 lg:p-20 ">
      <section>
        <Hero />
        <WhyUs />
        <Marquee
          text={["Organic", "Sustainable", "Trustworthy"]}
          className="text-2xl md:text-4xl bg-gradient-to-r from-teal-800 to-secondary text-neutral-50"
          separator="🪴"
        />
        <SaleCollection saleName="Diwali" products={products} />
        <Facts />
        <ShopByCategory />
        <Footer />
      </section>
    </main>
  );
}
