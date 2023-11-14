import { useRouter } from "next/navigation";

export default function ShopByCategory() {
  const router = useRouter();
  return (
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
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6 bg-gradient-to-t from-black/90 to-black/20">
              <h3 className="text-xl font-medium text-white">Home & Kitchen</h3>
              <button
                onClick={() => router.push("/product/listing/kitchen")}
                className="mt-1.5 inline-block bg-secondary px-5 py-3 text-xs rounded-md font-medium tracking-wide text-white shadow-custom hover:bg-hover hover:scale-105"
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
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6 bg-gradient-to-t from-black/90 to-black/20">
              <h3 className="text-xl font-medium text-white">Bags</h3>
              <button
                onClick={() => router.push("/product/listing/bags")}
                className="mt-1.5 inline-block bg-secondary px-5 py-3 text-xs rounded-md font-medium tracking-wide text-white backdrop-brightness-50 shadow-custom hover:bg-hover hover:scale-105"
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
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6 bg-gradient-to-t from-black/90 to-black/10">
              <h3 className="text-xl font-medium text-white">Fashion</h3>
              <button
                onClick={() => router.push("/product/listing/fashion")}
                className="mt-1.5 inline-block bg-secondary px-5 py-3 text-xs rounded-md font-medium tracking-wide text-white shadow-custom hover:bg-hover hover:scale-105"
              >
                Shop Now
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
