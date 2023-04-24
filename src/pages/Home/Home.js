import React from "react";
import { Link } from "react-router-dom";
export default function () {
  return (
    <div>
      <h1> This is the Landing Page</h1>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
