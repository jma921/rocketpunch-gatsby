import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'styled-components';
import axios from 'axios';
import ContactForm from '../components/ContactForm';
const designLogo = require('../img/undraw_specs2_2jb3.svg');
const webLogo = require('../img/undraw_real-time_sync_o57k.svg');
const rocketLogo = require('../img/undraw_To_the_stars_qhyy.svg');

import './main.css';

const HeaderImg = styled(Img)`
  margin-top: -52px;
  display: inherit;
  height: 65vh;
`;

const Container = styled.figure`
  cursor: pointer;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const Overlay = styled.div`
  border: 8px solid #f40;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.2s ease;
  background-color: white; // Overlay background color
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;

const Text = styled.p`
  color: #333333;
  text-align: center;
  font-size: 2rem;
  font-weight: normal;
`;

const SubText = styled.p`
  color: #aaaaaa;
  text-align: center;
  font-size: 1rem;
  font-weight: 100;
  text-transform: uppercase;
`;

export default class IndexPage extends React.Component {
  state = {
    budget: '',
    email: '',
    fullName: '',
    organizationName: '',
    overview: '',
    processing: false,
    alertVisible: false,
    alertSuccess: false,
    alertError: false,
    errorText: ''
  };

  render() {
    console.log(this.props);
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
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
                  <div className="column is-one-third" key={post.id}>
                    <Link to={post.fields.slug}>
                      <div className="thumb">
                        <div className="card-image">
                          <Container>
                            <Image
                              src={post.frontmatter.image}
                              alt={post.frontmatter.title}
                            />
                            <Overlay>
                              <Text>{post.frontmatter.title}</Text>
                              <SubText>{post.frontmatter.description}</SubText>
                            </Overlay>
                          </Container>
                        </div>
                      </div>
                    </Link>
                  </div>
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
                    <p>
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
                    <p>
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
                    <p>
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
            image
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
