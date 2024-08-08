import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAngleDown,
  faRightFromBracket,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "./css/navbar.css";

const Navbar = () => {
  const [displayList, setDisplayList] = useState(false);
  // const [msgTrigger, setMsgTrigger] = useState(false);

  const uid = Cookies.get("uid");
  const name = Cookies.get("name");
  const token = Cookies.get("token");

  const Logout = () => {
    Cookies.remove("uid");
    Cookies.remove("name");
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="/logo.png" alt="logo" />
      </Link>
      <div style={{ position: "relative" }}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{
            color: "#00bfff",
            position: "absolute",
            top: "25px",
            left: "20px",
          }}
        />
        <input
          type="text"
          style={{
            width: "500px",
            height: "50px",
            paddingLeft: "50px",
          }}
          placeholder="Search for a bot"
        />
      </div>
      <button
        id="button"
        type="button"
        style={{ width: "150px", height: "40px", marginTop: "10px" }}
        onClick={async () => {
          try {
            console.log(token);
            await axios.get("http://localhost:4000/createbot", {
              headers: { Authorization: `Bearer ${token}` },
            });
            window.location.href = "/createbot";
          } catch (err) {
            window.location.href = "/login";
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
        Create new
      </button>
      <div>
        <ul>
          <li>Home</li>
          <li>About</li>
          {uid ? (
            <li>
              <div
                id="button"
                style={{
                  padding: "10px",
                  transform: "translateY(-10px)",
                  width: "130px",
                  textAlign: "center",
                  backgroundColor: displayList && "#00bfff",
                  color: displayList && "white",
                }}
                onMouseEnter={() => setDisplayList(true)}
                onMouseLeave={() => setDisplayList(false)}
              >
                <FontAwesomeIcon icon={faUser} /> {name.split(" ")[0]}{" "}
                <span id="arrow">
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{
                      transition: "transform 0.3s",
                      transform: displayList && "rotate(180deg)",
                    }}
                  />
                </span>
              </div>
              <ul
                style={{
                  display: displayList ? "block" : "none",
                  position: "fixed",
                  transition: "display 0.3s",
                  // transform: "translateY(-30px)",
                  top: "40px",
                  width: "150px",
                }}
                onMouseEnter={() => setDisplayList(true)}
                onMouseLeave={() => setDisplayList(false)}
              >
                <li>
                  <span>Your bots</span>
                </li>
                <li
                  onClick={Logout}
                  type="button"
                  style={{ cursor: "pointer" }}
                >
                  <span>
                    Logout <FontAwesomeIcon icon={faRightFromBracket} />
                  </span>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button id="button" type="button">
                  Login
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
