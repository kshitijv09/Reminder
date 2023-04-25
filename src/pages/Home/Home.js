import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Animation from "../../components/Animation/Animation";
export default function () {
  return (
    <div className="home-container">
      {/* <Animation /> */}
      <div className="heading">
        <div className="rem">REMINDER APP</div>
      </div>
      <div className="text">
        <p>Do you keep forgetting important thing on a daily basis?</p>
        <p>Has this caused you to lose a lot of opportunites recently?</p>
        <p>
          This Reminder App is the solution to all your problems. Sign Up to
          fiind out how
        </p>
      </div>
      <div className="nav-links">
        <Link to="/signup">
          <div> Sign Up</div>
        </Link>
        <Link to="/login">
          <div>Log In </div>
        </Link>
      </div>
    </div>
  );
}
