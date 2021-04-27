import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div id="footer-content">
        <ul>
          <li>
            <Link to="/models">Models</Link>
          </li>
        </ul>
        <div className="social-media">
          <a href="https://www.instagram.com/" target="blank">
            <i className="fab fa-instagram sm-icon"></i>
          </a>
          <a href="https://www.twitter.com/" target="blank">
            <i className="fab fa-twitter sm-icon"></i>
          </a>
          <a href="https://www.facebook.com/" target="blank">
            <i className="fab fa-facebook sm-icon"></i>
          </a>
          <a href="https://www.tiktok.com/" target="blank">
            <i className="fab fa-tiktok sm-icon"></i>
          </a>
        </div>
        <div id="copyright">&copy; 2021 ModBase</div>
      </div>
    </footer>
  );
}
