import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './all.sass';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + Netlify CMS">
      <script src="https://www.google.com/recaptcha/api.js" async defer />
      <link
        href="https://fonts.googleapis.com/css?family=Work+Sans:400,700"
        rel="stylesheet"
      />
    </Helmet>
    <Navbar />
    <div>{children()}</div>
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
