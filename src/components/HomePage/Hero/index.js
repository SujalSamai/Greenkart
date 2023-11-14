import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto  lg:gap-8 xl:gap-0 lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
        <h1 className="font-heading max-w-2xl mb-4 text-6xl font-bold tracking-tight leading-none md:text-7xl">
          Best eco-friendly collection.
        </h1>
        <p className="max-w-2xl mb-6 text-green-900 lg:mb-8 tracking-wide text-justify font-medium">
          Welcome to <b className="font-heading text-xl font-bold">Greenkart</b>{" "}
          – your one-stop destination for organic, sustainable and
          environmentally conscious shopping! In a world where our choices have
          a profound impact on the planet, we believe that e-commerce can be a
          force for good. Our mission is to provide you with a unique online
          shopping experience that not only caters to your needs but also
          champions the well-being of our planet.
          <br />
          <br />
          Introducing our latest eco-friendly collection, a testament to our
          commitment to sustainability and the planet. Crafted with the
          environment in mind, each item here is made from carefully selected,
          ethically sourced materials that minimize our carbon footprint. From
          organic cotton clothing to biodegradable cutlery, every item combines
          needs with eco-consciousness.
        </p>
        <button
          type="button"
          onClick={() => router.push("/product/listing/all-products")}
          className="font-buttons mt-1.5 inline-block bg-secondary px-5 py-3 text-sm rounded-md font-medium tracking-wide text-white shadow-custom hover:bg-hover hover:scale-105"
        >
          Explore Shop Collection
        </button>
      </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-end">
        <img src="/3d.png" alt="Explore Shop Collection" />
      </div>
    </div>
  );
}
