import React from "react";
import Logo from "../img/logo1.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="Logo" style={{ width: "70px", height: "auto" }} />
      <span>
        Made with ❤️ and <b>React.js</b>.<br /> name : 이승진
        <br /> phone : 010-5954-3190
        <br />
        email : rntmdwlsrmf@gmail.com
      </span>
    </footer>
  );
};

export default Footer;
