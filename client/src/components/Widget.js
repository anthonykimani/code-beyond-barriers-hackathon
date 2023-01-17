const Widget = ({ data }) => {
  return (
    <main className="shadow-xl lg:shadow-none w-[90%] md:w-[48%] lg:w-[30%] p-4] ">
      <section className="flex justify-center py-4">
        <img src={data.image} alt="widget" />
      </section>
      <section className="text-center py-4 text-white">
        <h1 className="font-semibold text-xl xl:text-2xl py-2 xl:py-5">
          {data.title}
        </h1>
        <p className="text-base py-2 xl:text-lg">{data.content}</p>
      </section>
    </main>
  );
};

export default Widget;
