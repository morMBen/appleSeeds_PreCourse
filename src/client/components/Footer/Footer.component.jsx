/* eslint-disable linebreak-style */
import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.styles.css';

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo">
      <Link to="/">
        <img
          height="150"
          src="https://static.wixstatic.com/media/37decd_854c0ab57444449ea6ce31fb63c5ca55~mv2.png/v1/fill/w_450,h_179,al_c,q_85,usm_0.66_1.00_0.01/Appleseeds%20horizontal%20blue%20white%403x.webp"
          alt="Logo"
        />
      </Link>
      <div className="footer-links">
      <a
        className="small-link"
        href="https://www.linkedin.com/company/614273/"
        target="_blank"
      >
        <img
          alt="White LinkedIn Icon"
          src="https://static.wixstatic.com/media/7528824071724d12a3e6c31eee0b40d4.png/v1/fill/w_50,h_50,al_c,q_85,usm_0.66_1.00_0.01/7528824071724d12a3e6c31eee0b40d4.webp"
        />
      </a>
      <a
        className="small-link"
        href="https://www.facebook.com/Appleseeds.Tapuah/"
        target="_blank"
      >
        <img
          alt="White Facebook Icon"
          src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_50,h_50,al_c,q_85,usm_0.66_1.00_0.01/23fd2a2be53141ed810f4d3dcdcd01fa.webp"
        />
      </a>
      <a
        className="small-link"
        href="https://www.youtube.com/user/TheAppleseedsAcademy"
        target="_blank"
      >
        <img
          alt="White YouTube Icon"
          src="https://static.wixstatic.com/media/203dcdc2ac8b48de89313f90d2a4cda1.png/v1/fill/w_50,h_50,al_c,q_85,usm_0.66_1.00_0.01/203dcdc2ac8b48de89313f90d2a4cda1.webp"
        />
      </a>
      <a
        className="small-link"
        href="https://www.instagram.com/appleseeds.tapuah/"
        target="_blank"
      >
        <img
          alt="White Instagram Icon"
          src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_50,h_50,al_c,q_85,usm_0.66_1.00_0.01/81af6121f84c41a5b4391d7d37fce12a.webp"
        />
      </a>
      </div>
    </div>
    <div className="copy-rights">
      <p>&copy; 2021 by AppleSeed's</p>
    </div>
  </div>
);

export default Footer;
