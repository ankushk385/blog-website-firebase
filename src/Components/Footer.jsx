// Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} BlogByYou. All rights reserved.</p>
    <div className="footer-links">
      {/* <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="#">Contact</a> */}
    </div>
  </footer>
);

export default Footer;
