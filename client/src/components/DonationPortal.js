import React, { useState } from "react";
import { createPortal } from "react-dom";
import Celo from "../assets/images/celo.png";


const DonationPortal = ({ showPortal, onClose }) => {
  const [ amount, setAmount] = useState(null);

  const handleChange = (event)=>{
    const value = event.target.value;
    setAmount(value);
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(amount);
  }

  if (!showPortal) return;
  


  return createPortal(
    <main className="w-full overflow-scroll  md:h-screen md:w-screen fixed top-0 bg-neutral-900 left-0 bg-opacity-50 flex items-center justify-center z-40 ">
      <section className="rounded-xl  bg-white w-[40%] p-5 h-[90%] ">
        <article className="relative bg-white py-10 px-5">
          <span
            className="text-2xl absolute cursor-pointer top-0 right-0 lg:-top-4 lg:-right-3 z-50  xl:-right-2"
            onClick={onClose}
          >
            <i className="bx bx-x bx-md text-black"></i>
          </span>
          <article className="flex justify-center p-5">
            <h1 className="text-3xl font-semibold text-gray-700">
              What to support us? Make a donation.
            </h1>
          </article>
          <article className="mt-5 p-5">
            <div className="flex rounded-2xl shadow-xl shadow-stone-400 px-3 py-5 overflow-hidden">
              <div className="w-8/12">
                <div className="flex items-center p-2">
                  <img className="w-14" src={Celo} alt="donate" />
                  <h2 className=" ml-2 font-semibold text-lg text-gray-800">
                    Celo coin (CELO)
                  </h2>
                </div>
                <div className="p-2">
                  <span className="font-semibold text-sm text-gray-500">
                    fjvbjbu776fvjbjnkji989lvygg5guf7302gryd27z6
                  </span>
                </div>
              </div>
              <div className="w-4/12">
                <img
                  className="w-full min-h-full"
                  src="https://docs.celo.org/assets/images/qr-code-b73e05aa2e75fd14fb7d1feb12fabc13.png"
                  alt="qrcode"
                />
              </div>
            </div>
          </article>
          <article className="mt-10">
            <form className="h-[200px] flex flex-col justify-around" onSubmit={handleSubmit}>
              <div className="m-2 flex flex-col gap-2">
                <label htmlFor="amount" className="font-mono">Amount to be Donated</label>
              <input type="text" name="amount" id="amount" className="border-2 border-slate-300 p-2 bg-transparent rounded-sm outline-none" onChange={handleChange} />
              </div>
              <button  className="flex items-center bg-button text-white rounded-sm font-bold text-md py-2 px-4 w-fit" >Donate</button>
            </form>
          </article>
        </article>
      </section>
    </main>,
    document.getElementById("modal")
  );
};

export default DonationPortal;
