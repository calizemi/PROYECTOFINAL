import React from "react";
import "./footer.css";
import logo from "../../assets/image/logo.png";
import { Contrast } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="content">
          <img className="logo-footer" src={logo} style={{ width: 180, margin:"auto", filter: "grayscale(100%)" }} ></img>

          <div className="social">
            <ul className="ul-footer">
                <li><a href="https://www.facebook.com/" target="__blank"><FacebookIcon sx={{fontSize:35}}/></a></li>
                <li><a href="https://www.facebook.com/" target="__blank"><TwitterIcon sx={{fontSize:35}}/></a></li>
                <li><a href="https://www.facebook.com/" target="__blank"><InstagramIcon sx={{fontSize:35}}/></a></li>

            </ul>
          </div>
          <div className="terms">
              <a href="#">Terminos / condiciones</a>
          </div>

          
        </div>
        <div>
            <p className="copyright">Copyright © 2022 Todos los derechos reservados Lima-Perú</p>
          </div>
      </footer>
    </div>
  );
};

export default Footer;
