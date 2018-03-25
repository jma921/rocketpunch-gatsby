import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactForm from '../components/ContactForm';
import HeaderImg from '../components/HeaderImg';
import PortfolioCard from '../components/PortfolioCard';
const designLogo = require('../img/undraw_specs2_2jb3.svg');
const webLogo = require('../img/undraw_real-time_sync_o57k.svg');
const rocketLogo = require('../img/undraw_To_the_stars_qhyy.svg');

export default class IndexPage extends React.Component {
  render() {
    console.log(this.props);
    const { data } = this.props;
    const { edges: portfolio } = data.allMarkdownRemark;

    return (
      <div>
        <HeaderImg sizes={data.bgImage.sizes} />
        <section className="section">
          <div className="container mt-3">
            {/*
              <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Our Work</h1>
            </div>
            */}
            <div id="work" className="columns is-multiline">
              {portfolio
                .filter(
                  post => post.node.frontmatter.templateKey === 'portfolio-item'
                )
                .map(({ node: post }) => (
                  <PortfolioCard key={post.id} post={post} />
                ))}
            </div>
            <div id="about" className="content mt-3">
              {/*
                <h1 className="has-text-weight-bold is-size-2">Our Services</h1>
              */}
              <div className="container">
                <div className="columns is-variable is-4">
                  <div className="column">
                    <img
                      src={designLogo}
                      alt="Design Logo"
                      style={{ padding: '3rem' }}
                    />
                    <p style={{ lineHeight: '1.7' }}>
                      How can graphic design help my business? Your business is
                      unique. You need to stand apart from the crowd. Here at
                      RPL we use our knowledge and creativity to help you do
                      just that.
                    </p>
                  </div>
                  <div className="column">
                    <img
                      src={webLogo}
                      alt="Web Logo"
                      style={{ padding: '3rem' }}
                    />
                    <p style={{ lineHeight: '1.7' }}>
                      We here at Rocketpunch Labs understand the importance of
                      having a quality website in todays technologically
                      inclined market place. We also understand how confusing it
                      can be when trying to get your business on the web.
                    </p>
                  </div>
                  <div className="column">
                    <img
                      src={rocketLogo}
                      alt="Rocket Logo"
                      style={{ padding: '3rem' }}
                    />
                    <p style={{ lineHeight: '1.7' }}>
                      We’ll help you tell your story and grow your business by
                      developing a compelling visual brand that aligns to your
                      vision and values, and elevates everything else that you
                      do.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="contact" className="content mt-3">
              <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                  <h1 className="has-text-weight-bold is-size-2">Let's Chat</h1>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

IndexPage.PropTypes = {
  data: PropTypes.object
};

export const pageQuery = graphql`
  query IndexQuery {
    bgImage: imageSharp(id: { regex: "/dark-bg.jpg/" }) {
      sizes(
        maxWidth: 1080
        duotone: { highlight: "#ff4400", shadow: "#2b2a2d", opacity: 100 }
        toFormat: PNG
      ) {
        ...GatsbyImageSharpSizes
      }
    }
    allMarkdownRemark(
      limit: 9
      filter: { frontmatter: { templateKey: { eq: "portfolio-item" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            image {
              childImageSharp {
                sizes(maxWidth: 480) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
