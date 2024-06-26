// import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Dashboard/Home";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
