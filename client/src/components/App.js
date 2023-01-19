import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Posts from "../pages/Posts";
import SinglePost from "../pages/SinglePost";
import DonationPortal from "./DonationPortal";
import Navbar from "./Navbar";

function App() {
  const [showPortal, setShowPortal] = useState(false);

  const onShowPortal = () => {
    setShowPortal(true);
  };

  return (
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
  );
}

export default App;
