export default function Facts() {
  return (
    <section className="my-14 px-8 font-heading bg-secondary/90 rounded-md py-10">
      <h2 className="font-heading max-w-2xl mb-10 text-4xl font-bold tracking-tight leading-none md:text-5xl text-primary">
        Why choose Green Products?
      </h2>
      <div className="relative w-full md:h-96 rounded-md hover:scale-[1.02] transition-custom">
        <img
          src="https://images.pexels.com/photos/1549528/pexels-photo-1549528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full h-full bg-contain rounded-md"
        ></img>
        <p className="absolute bottom-0 bg-gradient-to-t from-black/80 to to-black/20 h-full w-full lg:text-4xl pt-16 md:pt-56 md:px-10 px-6 text-white rounded-md">
          Between 1950 and 2015, an estimated 7,800 million tonnes of plastics
          were manufactured, and half of this was produced in the last 13 years
          alone.{" "}
          <span className="text-red-600 block font-bold text-lg lg:text-4xl">
            Out of which only 9% is recycled.
          </span>
        </p>
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap gap-4 mt-5">
        <div className="relative md:h-[17.5rem] hover:scale-[1.02] transition-custom">
          <img
            src="https://images.unsplash.com/photo-1520869578617-557561d7b114?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-md"
          ></img>
          <p className="absolute top-0 bg-gradient-to-t from-black/90 to to-black/20 h-full w-full md:text-xl pt-24 md:pt-40 px-5 text-white rounded-md  hover:to-black/40 transition-custom cursor-default">
            Microplastics have been reported in food for human consumption. The
            average person could be eating up to{" "}
            <span className="text-red-500 font-bold">5 grams</span> of plastic a
            week{" "}
          </p>
        </div>
        <div className="relative md:h-7[17.5rem] hover:scale-[1.02] transition-custom">
          <img
            src="https://images.unsplash.com/photo-1598542480973-51f8456286d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-md"
          ></img>
          <p className="absolute top-0 bg-gradient-to-t from-black/90 to to-black/20 h-full w-full md:text-xl pt-24 md:pt-40 px-5 text-white rounded-md  hover:to-black/40 transition-custom cursor-default">
            8 million tonnes of plastic pollution enters our oceans each year.
            By 2050, there will be
            <span className="text-red-500 font-bold">
              {" "}
              more plastic in our oceans than fish
            </span>
          </p>
        </div>
        <div className="relative md:h-[17.5rem] hover:scale-[1.02] transition-custom">
          <img
            src="https://plus.unsplash.com/premium_photo-1664013683829-b9fb1d79e5f3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-md"
          ></img>
          <p className="absolute top-0 bg-gradient-to-t from-black/90 to to-black/20 h-full w-full md:text-xl pt-24 md:pt-40 px-5 text-white rounded-md  hover:to-black/40 transition-custom cursor-default">
            Recycled plastics are mostly recycled into products of
            <span className="text-red-500 font-bold"> lesser quality</span>{" "}
            which are less likely to be further recycled.
          </p>
        </div>
      </div>
      <div className="flex justify-between flex-wrap md:flex-nowrap gap-4 mt-5 md:h-84">
        <div className="relative md:w-7/12 rounded-md hover:scale-[1.02] transition-custom">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-full rounded-md"
          ></img>
          <p className="absolute top-0 bg-gradient-to-t from-black/90 to to-black/25 h-full w-full md:text-2xl pt-14 md:pt-80 px-6 md:px-8 text-white rounded-md  hover:to-black/40 transition-custom cursor-default">
            Clothing is often made with synthetic fabric that does not compost
            and occupies 5% of all landfill space. The industry is responsible
            for up to 10% of total global carbon emissions, but it is estimated
            to increase by
            <span className="text-red-500 font-bold"> 50% till 2030</span>.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:w-5/12 md:h-72">
          <div className="relative h-56 hover:scale-[1.02] transition-custom">
            <img
              src="https://images.unsplash.com/photo-1552461536-6c6fed9d94a2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full rounded-md"
            ></img>
            <p className="absolute top-0 bg-gradient-to-t from-black/90 to to-black/30 h-full w-full md:text-xl pt-24 md:pt-28 px-5 text-white rounded-md hover:to-black/40 transition-custom cursor-default">
              Whilst sunscreen is very effective at absorbing UV rays and
              protecting your skin, it is a culprit in the massive
              <span className="text-red-500 font-bold">
                {" "}
                destruction of coral reefs
              </span>{" "}
              in the world's oceans.
            </p>
          </div>
          <div className="relative h-64 hover:scale-[1.02] transition-custom">
            <img
              src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full rounded-md"
            ></img>
            <p className="absolute top-0 bg-gradient-to-t from-black/90 to to-black/30 h-full w-full md:text-xl py-32 px-5 text-white rounded-md hover:to-black/40 transition-custom cursor-default">
              80% of countries still allow cosmetics to be tested on animals,
              subjecting
              <span className="text-red-500 font-bold">
                {" "}
                100 million animals
              </span>{" "}
              a year to possible allergens that often cause suffering and death.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
