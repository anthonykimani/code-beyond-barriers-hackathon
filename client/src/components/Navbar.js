import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { utils } from "ethers";
import  erc20  from "../components/contractJsonFiles/ierc20.json";

import { AppContext } from "../contexts/AppContext";
const BigNumber = require("bignumber.js");

const Navbar = ({ onShow }) => {
  // const cUSDContract = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  // const inuasautiContract ="0xF17153bedBe9D979485c16BaC1adDc5d60b84622";
  //Todo
  const ushahidiAdd = "0xC877733b142f44AF7e2FA8d29A7065e56FF851fa";
  const [isExpanded, setIsExpanded] = useState(false);
  const {userAccount, contract,cUSDContract , connectWallet,kit,notification,inuasautiContract} = useContext(AppContext);
 //todo
 const joinCommunity = async ()=>{
  try{
    await contract.methods.joinInuaSautiCommunity().send({from: kit.defaultAccount});
  }catch(error){
    alert("join error", error);
  }
 }
  //setUshahidi address
  const setUshahidiAddress = async ()=>{
    try{
      await contract.methods.setUshahidiAddress(ushahidiAdd).send({from : kit.defaultAccount});
    }catch(error){
      notification(error);
    }
  }
  
  //donate to ushahidi
  const donateToUshahidi = async ()=>{
    //amount will be passed from the function
    const balance =   new BigNumber(2).times(new BigNumber(10).pow(18));
    
    
   
    const cusdContract = new  kit.web3.eth.Contract(erc20,cUSDContract);
   
    await cusdContract.methods.approve(inuasautiContract,balance.toString()).send({from : kit.defaultAccount});
    
    try{
      await contract.methods. contributeToUshadi(balance.toString()).send({from : kit.defaultAccount});
      alert("done");
    }catch(error){
      notification(error);
    }
  }


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
          <button  onClick={()=>connectWallet()} className="flex items-center bg-button text-white rounded-3xl font-bold text-md py-2 px-4 w-fit">
            {userAccount != null?"Connected":"Connect Wallet"}
          </button>
          <h2>{userAccount}</h2>
          <button
            onClick={onShow}
            className="flex items-center bg-[#213139] text-white rounded-3xl font-bold text-md py-2 px-4 w-fit"
          >
            Donate
          </button>
          <button className="bg-blue-400" onClick={()=>joinCommunity()}>join</button>
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
            <div>
              <ul className=" absolute top-0 left-0 bg-button text-white text-center rounded-b-1xl w-full space-y-10 p-10 z-20">
                <div className="flex justify-start" onClick={expand}>
                  {" "}
                  <i className="bx bx-x bx-md text-white"></i>
                </div>
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
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default Navbar;
