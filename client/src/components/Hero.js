import landingImg from "../assets/images/landingImg.svg";
const Hero = () => {
  return (
    <main className="py-10">
      <section className="container mx-auto flex flex-col md:flex-row items-center">
        <article className="w-full flex items-center flex-col p-2 md:w-6/12 text-center md:text-left md:block">
          <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl p-2 md:p-0 md:pb-5">
            Find verified data from the community autonomously
          </h1>
          <p className="font-semibold p-2  md:py-5 md:text-lg">
            Get access to accurate, factual reports from the people at the
            ground using a decentralised autonomous organisation that encourages
            the community to contribute through various initiatives.
          </p>
          <button className="flex items-center mt-5 bg-button text-white rounded-3xl font-bold  py-2 px-4 w-fit">
            See Reports
          </button>
        </article>
        <article className="w-full p-2 md:w-6/12">
          <img src={landingImg} alt="landing" />
        </article>
      </section>
    </main>
  );
};

export default Hero;
