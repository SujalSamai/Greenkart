export default function WhyUs() {
  return (
    <section className="my-32 bg-secondary/90 text-primary py-10 px-6">
      <div className="text-center w-full">
        <h2 className="font-heading mb-5 text-4xl font-bold tracking-tight leading-none md:text-5xl ">
          products of the people, by the people and for the people.
        </h2>
        <p className="md:text-xl text-gray-300 tracking-wider">
          curated and handpicked products crafted with love from all around
          India.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-14 md:gap-5 mt-20">
        <div className="md:w-3/12 flex flex-col items-center justify-between">
          <div className="flex items-center justify-center p-4 h-96">
            <img src="/organic2.png" className="h-fit rounded-2xl"></img>
          </div>
          <p className="border-2 border-dashed rounded-full px-4 py-1 max-w-fit">
            authentic &amp; organic products.
          </p>
        </div>
        <div className="md:w-3/12 flex flex-col items-center justify-between">
          <div className="flex items-center justify-center p-5 h-96">
            <img src="/chemical2.png" className=" rounded-2xl"></img>
          </div>
          <p className="border-2 border-dashed rounded-full px-4 py-1 max-w-fit">
            no harmful chemicals.
          </p>
        </div>
        <div className="md:w-3/12 flex flex-col items-center justify-between">
          <div className="flex items-center justify-center p-7 h-96">
            <img src="/startup2.png" className="h-full rounded-2xl"></img>
          </div>
          <p className="border-2 border-dashed rounded-full px-4 py-1 max-w-fit">
            supporting local startups.
          </p>
        </div>
        <div className="md:w-3/12 flex flex-col items-center justify-between">
          <div className="flex items-center justify-center p-2 h-96">
            <img src="/middleman.png" className=" rounded-2xl"></img>
          </div>
          <p className="border-2 border-dashed rounded-full px-4 py-1 max-w-fit">
            straight from vendor to you.
          </p>
        </div>
      </div>
    </section>
  );
}
