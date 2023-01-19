import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { newKitFromWeb3 } from "@celo/contractkit";
import inuasautiAbi from "../components/contractJsonFiles/inuasauti.json";
import Web3 from "web3";

import Home from "../pages/Home";
import Posts from "../pages/Posts";
import SinglePost from "../pages/SinglePost";
import DonationPortal from "./DonationPortal";
import Navbar from "./Navbar";
import { AppContext } from "../contexts/AppContext";
let kit;
let contract;
function App() {
 
const cUSDContract = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  const inuasautiContract ="0x93fe8f7A78A5D00296445d273d211583f8320523";
  const [userAccount,setUserAccount] = useState(null);
  const [showPortal, setShowPortal] = useState(false);

  const onShowPortal = () => {
    setShowPortal(true);
  };
  //connect to celo wallet
  const connectWallet  =  async function (){
   
    if (window.celo) {
      
      try {
        await window.celo.enable()
       
  
        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);
  
        const accounts = await kit.web3.eth.getAccounts();
        kit.defaultAccount = accounts[0];
        setUserAccount(kit.defaultAccount);
        contract = new kit.web3.eth.Contract(inuasautiAbi,inuasautiContract);
        
  
      } catch (error) {
        notification(`⚠️ ${error}.`)
      }
    } else {
      notification("⚠️ Please install the CeloExtensionWallet.")
    }
  }
  //alert notification
  const notification = (message)=>{
    alert(message);
  }

  return (
    <AppContext.Provider value={{userAccount,kit, contract, connectWallet,notification}}>
    <Router>
      <Navbar onShow={() => onShowPortal()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<SinglePost />} />
      </Routes>
      <DonationPortal
        showPortal={showPortal}
        onClose={() => setShowPortal(false)}
      />
    </Router>
    </AppContext.Provider>
  );
}

export default App;
