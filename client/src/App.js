// import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Dashboard/Home";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ForgotPassword from "./Authentication/ForgotPassword";
import CreateBot from "./Chatbot/CreateBot";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/createbot" element={<CreateBot />} />
      </Routes>
    </Router>
  );
}

export default App;
