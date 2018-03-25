import React from 'react';
import Link, { navigateTo } from 'gatsby-link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Facebook from './icons/Facebook';
import Instagram from './icons/Instagram';
import Twitter from './icons/Twitter';
import logo from '../img/rpl-text.svg';

const Nav = styled.nav.attrs({
  className: 'navbar is-transparent'
})`
  z-index: 1;
  .logo {
    width: 215px;
  }
  background-color: ${props =>
    props.path === '/' ? 'rgba(0, 0, 0, 0) !important' : 'white !important'};
  a {
    color: ${props => (props.path === '/' ? 'white' : 'black')};
    cursor: pointer;
    font-size: 1.25rem;
    &:hover {
      color: ${props =>
        props.path === '/' ? '#d8d8d8 !important' : 'black!important'};
    }
  }
  .navbar-brand > a {
    background-color: rgba(0, 0, 0, 0);
    &:hover {
      background-color: rgba(0, 0, 0, 0);
    }
  }
  .navbar-burger {
    color: white;
  }
  .is-active {
    color: black;
  }
  @media screen and (max-width: 1022px) {
    .navbar-burger {
      color: ${props => (props.path === '/' ? 'white' : 'black')};
    }
    .is-active {
      color: black;
    }
    a {
      color: black !important;
      &:hover {
        color: black !important;
      }
    }
    .logo {
      width: 145px;
    }
  }
`;

class Navbar extends React.Component {
  state = {
    active: false
  };
  componentDidMount() {
    const { pathname } = this.props;
    this.setState({
      path: pathname
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pathname !== this.props.pathname) {
      this.setState({
        path: this.props.pathname
      });
    }

    if (prevProps.hash !== this.props.hash) {
      this.setState({
        active: false
      });
    }
  }

  onHamburgerClick = () => {
    this.setState({
      active: !this.state.active
    });
  };
  render() {
    return (
      <Nav path={this.state.path}>
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <img src={logo} alt="Rocketpunch" className="logo" />
              </figure>
            </Link>
            <div
              className={
                this.state.active ? 'navbar-burger is-active' : 'navbar-burger'
              }
              data-target="navMenu"
              onClick={this.onHamburgerClick}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            className={
              this.state.active ? 'navbar-menu is-active' : 'navbar-menu'
            }
          >
            {this.state.path === '/' ? (
              <div className="navbar-end">
                <a href="#work" className="navbar-item link">
                  Work
                </a>
                <a href="#about" className="navbar-item link">
                  About
                </a>
                <a href="#contact" className="navbar-item link">
                  Contact
                </a>
              </div>
            ) : (
              <div className="navbar-end">
                <a
                  onClick={() => {
                    navigateTo('/#work');
                    this.setState({
                      active: false
                    });
                  }}
                  className="navbar-item link"
                >
                  Work
                </a>
                <a
                  onClick={() => navigateTo('/#about')}
                  className="navbar-item link"
                >
                  About
                </a>
                <a
                  onClick={() => navigateTo('/#contact')}
                  className="navbar-item link"
                >
                  Contact
                </a>
              </div>
            )}
          </div>
        </div>
      </Nav>
    );
  }
}

Navbar.PropTypes = {
  path: PropTypes.string,
  hash: PropTypes.string
};

export default Navbar;
