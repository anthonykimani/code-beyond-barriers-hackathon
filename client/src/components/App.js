import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "../pages/Home";
import Posts from "../pages/Posts";
import SinglePost from "../pages/SinglePost";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;
