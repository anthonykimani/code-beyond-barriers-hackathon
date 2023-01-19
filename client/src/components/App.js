import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "../pages/Home";
import Platform from "../pages/Platform";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
      </Routes>
    </Router>
  );
}

export default App;
