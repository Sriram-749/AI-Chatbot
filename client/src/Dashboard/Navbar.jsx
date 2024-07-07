import React, { useState } from "react";
import Cookies from "js-cookie";
// import axios from "axios";
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

  const uid = Cookies.get("uid");
  const name = Cookies.get("name");
  const Logout = () => {
    Cookies.remove("uid");
    Cookies.remove("name");
    window.location.href = "/login";
    // const response = axios.post("http://localhost:4000/logout", { uid });
    // console.log(response.data);
  };

  return (
    <div className="navbar">
      <img src="/logo.png" alt="logo"></img>
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
        onClick={() => (window.location.href = "/createBot")}
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
                  transition: "display 0.3s",
                  transform: "translateY(-30px)",
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
