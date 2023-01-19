import Data from "../components/Data";

const Platform = () => {
  return (
    <main className="bg-section">
      <section className="container mx-auto">
        <article>Dashboard</article>
        <article className="flex flex-col gap-5 p-2">
          <Data />
          <Data />
          <Data />
          <Data />
          <Data />
        </article>
      </section>
    </main>
  );
};

export default Platform;
