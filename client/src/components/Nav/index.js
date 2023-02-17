import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
<<<<<<< HEAD
            <Link to="/orderHistory">Order History</Link>
=======
            <Link to="/userProfile">
              User Profile
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
>>>>>>> 88bcd25a1857c9c73efc9c8085feb73832ba1654
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
<<<<<<< HEAD
          <span role="img" aria-label="shopping bag">
            🛍️
          </span>
=======
          <span role="img" aria-label="shopping bag">🛍️</span>
>>>>>>> 88bcd25a1857c9c73efc9c8085feb73832ba1654
          Flea Market Finds
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
