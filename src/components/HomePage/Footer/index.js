import { FaLongArrowAltRight, FaLocationArrow, FaGithub } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import { navOptions } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <section>
      <div className="flex md:flex-row flex-col md:justify-between items-center md:mx-20 md:mb-6 md:mt-5">
        <div className="md:my-6 mt-3 md:mr-20 flex flex-col md:w-1/3 w-4/5 p-5">
          <div className="flex justify-start">
            <Image
              src="/shopBag.png"
              width={80}
              height={60}
              priority
              className="drop-shadow-lg mr-2 my-1 md:-my-1 w-8 h-6 md:w-14 md:h-12"
            />
            <h1 className="md:text-4xl text-2xl text-secondary font-bold font-heading">
              GREENKART
            </h1>
          </div>
          <p className="md:mt-9 md:my-4 my-2 text-justify tracking-wide text-secondary font-medium md:text-sm text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus odit
            corporis, atque dolor quisquam minus aut veritatis eos totam sunt,
            voluptate officia ipsa ratione incidunt enim nemo! Nam esse placeat
            maxime dolores doloremque omnis voluptatibus ab ullam molestias
            architecto! Dignissimos, iste!
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                router.push("https://www.github.com/SujalSamai/Greenkart");
              }}
              className="my-2 md:mx-4 mx-2  p-2 border cursor-pointer border-secondary text-secondary rounded-md hover:-translate-y-1.5 transition-all duration-500 ease-in-out shadow-md shadow-secondary/40 drop-shadow-xl"
            >
              <FaGithub className="md:text-2xl text-xl" />
            </button>
            <button
              onClick={() => {
                router.push("https://www.github.com/");
              }}
              className="my-2 md:mx-4 mx-2 p-2 border cursor-pointer border-secondary text-secondary rounded-md hover:-translate-y-1.5 transition-all duration-500 ease-in-out shadow-md shadow-secondary/40 drop-shadow-xl"
            >
              <FaGithub className="md:text-2xl text-xl" />
            </button>
          </div>
        </div>
        <div className="md:flex md:flex-row md:justify-center">
          <div className="flex flex-col md:my-6 my-2 md:mr-20 mx-4 p-5">
            <h1 className="md:text-2xl text-xl text-secondary/90 font-bold flex font-heading mb-2">
              <GiShoppingBag className="mt-1 mr-1" />
              SHOP
            </h1>
            <ul className="">
              {navOptions.map((item) => {
                return (
                  <li
                    className="hover:underline hover:underline-offset-4 hover:scale-105 hover:duration-300 hover: ease-in-out hover:transition-all my-4 tracking-wide font-medium md:text-sm text-xs"
                    key={item.id}
                  >
                    <a href={item.path}>{item.label}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="md:my-6 my-2 mx-4 md:mr-20 p-5 flex flex-col">
            <h1 className="md:text-2xl text-xl text-secondary/90 font-bold flex font-heading mb-2">
              <MdMail className="mt-1.5 mr-1" />
              CONTACT US
            </h1>
            <div className="rounded-md text-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="md:h-10 h-4 p-4 placeholder-gray-400 border focus:outline-none focus:border-black w-full lg:p-4 my-4 ml-0 text-sm lg:text-base block bg-white border-gray-300 rounded-md md:placeholder:text-sm placeholder:text-xs"
              />
              <textarea
                placeholder="Enter your message"
                className="px-4 py-2 placeholder-gray-400 border focus:outline-none focus:border-black w-full my-2 text-sm lg:text-base block bg-white border-gray-300 rounded-md md:placeholder:text-sm placeholder:text-xs"
                rows={3}
              />
            </div>
            <button className="font-buttons mt-1.5 flex justify-center bg-secondary md:px-5 md:py-3 px-2 py-1 md:text-sm rounded-md font-medium tracking-wide text-white shadow-custom hover:bg-hover hover:scale-105">
              <p className="md:text-lg text-sm md:mt-0 mt-1">Send</p>
              <IoIosArrowRoundForward className="md:text-3xl text-2xl font-bold md:ml-1.5 ml-1 md:mt-0 mt-0.5" />
            </button>
          </div>
        </div>
      </div>
      <hr className="h-0.5 mt-4 mx-auto bg-secondary border-0 dark:bg-secondary" />
      <div className="flex justify-center mt-2 bottom-0">
        <p className=" text-xs md:text-lg">
          Copyright &copy;{" "}
          <a
            href="https://greenkart.vercel.app"
            className="hover:underline hover:underline-offset-2  tracking-wide font-medium"
          >
            GreenKart
          </a>
        </p>
      </div>
    </section>
  );
}
