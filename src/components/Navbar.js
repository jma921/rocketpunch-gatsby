import React from 'react';
import Link from 'gatsby-link';

// import github from '../img/github-icon.svg';
// import facebook from '../img/facebook.svg';
import Facebook from './icons/Facebook';
import Instagram from './icons/Instagram';
import Twitter from './icons/Twitter';
// import instagram from '../img/instagram.svg';
// import twitter from '../img/twitter.svg';
import logo from '../img/logo.svg';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      active: true
    };
  }
  onMenuClick = () => {
    this.setState({
      active: !this.state.active
    });
  };
  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <img src={logo} alt="Rocketpunch" style={{ width: '88px' }} />
              </figure>
            </Link>
            <div
              className={
                this.state.active ? 'navbar-burger' : 'navbar-burger is-active'
              }
              data-target="navMenu"
              onClick={this.onMenuClick}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            className={
              this.state.active ? 'navbar-menu' : 'navbar-menu is-active'
            }
          >
            <div className="navbar-end">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/work">
                Work
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
