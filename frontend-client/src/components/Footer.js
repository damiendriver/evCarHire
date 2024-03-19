import React from "react";

function Footer() {
  const emailAddress = "rentals@evcarhireireland.ie";

  return (
    <footer>
      <p>Contact us at: <a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
    </footer>
  );
}

export default Footer;
