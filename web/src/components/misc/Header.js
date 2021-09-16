import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">
      <div className="container-fluid">
        <Link className="navbar-brand" exact="true" to="/">
          <img
            alt="Mindfulness app logo"
            src="logo.png"
            className="img-fluid app-logo ms-2"
          />
        </Link>
        <form className="d-flex">
          <Link
            exact="true"
            to="/search"
            className="btn"
            role="button"
            type="submit"
          >
            <i className="fa fa-search" aria-hidden="true" />
          </Link>
        </form>
      </div>
    </nav>
  );
}

export default Header;
