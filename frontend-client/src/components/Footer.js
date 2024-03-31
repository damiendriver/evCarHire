import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const emailAddress = "rentals@evcarhireireland.ie";

  return (
    <footer>
      <p>Email us at: <a className="emailLink" href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
      <p>Visit our <Link to="/contact" className="contactLink">contact page</Link> to reach us.</p>
    </footer>
  );
}

export default Footer;
