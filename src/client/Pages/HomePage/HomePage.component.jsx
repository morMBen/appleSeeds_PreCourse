/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Footer from '../../components/Footer/Footer.component';
import Greetings from '../../components/Greetings/Greetings.component';
import Banner from '../../components/Banner/Banner.component';
import Navbar from '../../components/NavBar/Navbar.component';
import './HomePage.styles.css';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const HomePage = () => {
  return (
    <Grid>
      
      <div className="homepage-container">
      <div className="mobile-message">please enter the site with larger screen (not mobile phone)</div>
        <div className="homepage-top">
          <Navbar />
          {/*<Banner/>*/}
          <Greetings />
        </div>
        <div className="homepage-bottom">
        <Footer />
        </div>
      </div>
    </Grid>
  );
};

export default HomePage;
