import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
export default function Nav(props) {
  return (
    <div className="nav-bar">
      <div className="text-container">
        <div>
          <h1 style={{ fontSize: "2.5em" }}> REMINDER APP</h1>
        </div>
        <div>
          <h3 className="text">Welcome, {props.name}</h3>
        </div>
      </div>
      <div className="logout-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          Logout
        </Link>
      </div>
    </div>
  );
}
