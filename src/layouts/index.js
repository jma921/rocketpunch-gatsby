import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './all.sass';

const TemplateWrapper = props => {
  const { children, location } = props;
  return (
    <div>
      <Helmet title="Rocketpunch Labs | Graphic Design | Web Design">
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:400,700"
          rel="stylesheet"
        />
      </Helmet>
      <Navbar pathname={location.pathname} hash={location.hash} />
      <div>{children()}</div>
      <Footer />
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
