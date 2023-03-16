import React from "react";
import { NavLink } from "react-router-dom";

function LogoutButton({ setToken, setCarsList, setLoading }) {
  function logoutUser() {
    localStorage.removeItem("token");
    setToken(null);
    setCarsList(null);
    setLoading(false);
  }
  return (
    <NavLink to="/">    
      <button
        className="btn btn-outline-danger mx-2 px-2"
        onClick={() => logoutUser()}
      >
        Logout
      </button></NavLink>

  );
}

export default LogoutButton;
