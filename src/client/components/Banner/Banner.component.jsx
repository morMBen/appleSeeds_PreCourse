/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
import React from 'react';
import {Link} from "react-router-dom";

import './Banner.styles.css';

const Banner = () => (
  <div className="banner-container">
    <div className="banner-link"><a href="https://code.tutsplus.com/courses/javascript-fundamentals">link to js online course</a></div>
    <div className="banner-link"><a href="#.">link to js articles</a></div>
    {/*<div className="banner-link" onClick={() => history.push('/coding')}>Start Coding!</div>*/}
  </div>
);

export default Banner;
