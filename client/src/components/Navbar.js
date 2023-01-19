import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ onShow }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expand = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  return (
    <main className=" w-full">
      <section className="container mx-auto py-5  flex items-center justify-between">
        <article className="flex items-center">
          <h1 className="text-orange font-bold text-3xl cursor-pointer">
            <span className="text-text">Inua</span> Sauti
          </h1>
        </article>
        <article className="hidden md:block">
          <ul className="flex items-center md:gap-4 gap-10  font-bold text-md cursor-pointer">
            <NavLink to="/">
              <li className="text-text">Home</li>
            </NavLink>
            <NavLink to="/posts">
              <li className="hover:text-textHeavy">Platform</li>
            </NavLink>
            <NavLink to="/about">
              <li className="hover:text-textHeavy">About</li>
            </NavLink>
          </ul>
        </article>
        <article className="hidden md:flex gap-4 ">
          <button className="flex items-center bg-button text-white rounded-3xl font-bold text-md py-2 px-4 w-fit">
            Connect Wallet
          </button>
          <button
            onClick={onShow}
            className="flex items-center bg-[#213139] text-white rounded-3xl font-bold text-md py-2 px-4 w-fit"
          >
            Donate
          </button>
        </article>
        <article className="md:hidden">
          <div
            onClick={expand}
            className="space-y-1 p-1.5 bg-white md:hidden cursor-pointer z-50"
          >
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </div>
          {isExpanded && (
            <ul className=" absolute top-0 left-0 bg-button text-white text-center rounded-b-3xl w-full space-y-10 p-10 z-20">
              <li
                className="cursor-pointer hover:text-textLight"
                onClick={expand}
              >
                <a href={`#home`}>Home</a>
              </li>
              <li
                className="cursor-pointer hover:text-textLight"
                onClick={expand}
              >
                <a href={`#about`}>Platform</a>
              </li>
              <li
                className="cursor-pointer hover:text-textLight"
                onClick={expand}
              >
                <a href={`#skills`}>About</a>
              </li>
            </ul>
          )}
        </article>
      </section>
    </main>
  );
};

export default Navbar;
