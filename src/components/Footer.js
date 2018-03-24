import React from 'react';
import Facebook from './icons/Facebook';
import Instagram from './icons/Instagram';
import Twitter from './icons/Twitter';
import Email from './icons/Email';

const Footer = () => {
  return (
    <footer className="footer level">
      <div className="level-left">
        <div className="level-item">
          <p>&copy; 2018 Rocketpunch Labs</p>
        </div>
      </div>
      <div className="level-right footer-social">
        <div className="level-item">
          <a
            href="https://www.facebook.com/rocketpunchlabs/"
            className="footer-social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </a>
        </div>
        <div className="level-item">
          <a
            href="https://www.instagram.com/rocketpunchlabs/?hl=en"
            className="footer-social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
        </div>
        <div className="level-item">
          <a
            className="footer-social-link"
            href="https://twitter.com/rocketpunchlabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
        </div>
        <div className="level-item">
          <a
            className="footer-social-link"
            href="mailto:rocketpunchlabs@gmail.com?Subject=Hello%20from%20website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Email />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
