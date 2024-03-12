import React, { useState } from "react";

function NavBar() {
  const member = JSON.parse(localStorage.getItem("currentMember"));
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem("currentMember");
    window.location.href = "/login";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand">
            <a className="navbar-brand" href="/home">
              <i className="bi bi-plugin bi-2x"></i>&nbsp;&nbsp;&nbsp; EV Car Hire
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon">
              <i className="bi bi-list"></i>
            </span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
              <NavItem link="/home" text="Home" active />
              {member && (
                <NavItem link="/vehicle" text="Vehicle Options" />
              )}
              <NavItem link="/about" text="About EV Cars" />
              <NavItem link="/map" text="Charge Point Map" />
              <NavItem link="location" text="Hire Locations" />
              <NavItem link="terms" text="Terms" />
            </ul>

            <div className="ms-auto me-5">
              {member ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-fill"> </i> {member.data.name}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="/profile">
                        Profile
                        </a>
                      {member.data.isAdmin && (
                        <a className="dropdown-item" href="/admin">
                          Admin Area
                        </a>
                      )}
                      <a className="dropdown-item" href="/home" onClick={logout}>
                        Logout
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Login / Register
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <NavItem link="/login" text="Login" dropdownItem />
                      <NavItem link="/register" text="Register" dropdownItem />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

const NavItem = ({ link, text, active, dropdownItem }) => (
  <li
    className={`nav-item${active ? " active" : ""}${
      dropdownItem ? " dropdown-item" : ""
    }`}
  >
    <a className="nav-link" href={link}>
      {text}
    </a>
  </li>
);

export default NavBar;
