import React from "react";

function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand">
            <a className="navbar-brand" href="/home">
            <i className="bi bi-plugin bi-2x"></i>
            </a>
          </div>

          <div className="navbar-nav mx-auto">
            <NavItem link="/home" text="Home" active />
            <NavItem link="/about" text="About EV Cars" />
            <NavItem link="/map" text="Charge Point Map" />
            <NavItem link="location" text="Hire Locations" />
            <NavItem link="terms" text="Terms" />
          </div>

          <div className="ms-auto me-5">
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login / Register
              </a>
              <ul className="dropdown-menu">
                <NavItem link="/login" text="Login" dropdownItem />
                <NavItem link="/register" text="Register" dropdownItem />
              </ul>
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
