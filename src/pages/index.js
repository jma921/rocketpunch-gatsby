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

const testKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
const prodKey = '6Ld3mwcTAAAAAAT8mSIvlxiNOCAaIpVaTkmuIKPK';

// const validateRecaptcha = recaptchaResponse => {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: 'get',
//       headers: {
//         'Access-Control-Allow-Origin': '*'
//       },
//       url: `https://j01q67wvpg.execute-api.us-east-1.amazonaws.com/dev/validate/${recaptchaResponse}`
//     })
//       .then(response => {
//         resolve(response.data.success);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };
// const validateRecaptcha = recaptchaResponse => {
//   axios({
//     method: 'get',
//     headers: {
//       'Access-Control-Allow-Origin': '*'
//     },
//     url: `https://j01q67wvpg.execute-api.us-east-1.amazonaws.com/dev/validate/${recaptchaResponse}`
//   })
//     .then(response => {
//       return response.data.success;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

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
  color: black;
  text-align: center;
  font-size: 2rem;
  font-weight: normal;
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
  // handleInputChange = event => {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // };
  // submitForm = e => {
  //   e.preventDefault();
  //   this.setState({
  //     processing: true
  //   });

  //   const { fullName, email, budget, organizationName, overview } = this.state;

  //   fetch('/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body: encode({ 'form-name': 'contact', ...this.state })
  //   })
  //     .then(() => alert('Success!'))
  //     .catch(error => alert(error));

  //   e.preventDefault();

  // const recaptchaResponse = grecaptcha.getResponse();

  // if (!recaptchaResponse) {
  //   this.setState({
  //     errorText: 'Please complete the captcha.',
  //     alertError: true,
  //     alertVisible: true,
  //     processing: false
  //   });
  //   return;
  // }

  // validateRecaptcha(recaptchaResponse)
  //   .then(res => {
  //     const emailMarkup = `<p><strong>Name</strong>: <i>${fullName}</i></p>
  //                      <p><strong>Email</strong>: <i>${email}</i></p>
  //                      <p><strong>Organization Name</strong>: <i>${organizationName}</i></p>
  //                      <p><strong>Overview</strong>: <i>${overview}</i></p>
  //                      <p><strong>Budget</strong>: <i>${budget}</i></p>`;

  //     const emailObj = {
  //       subject: `Contact From ${name}`,
  //       email_to: ['jma921@gmail.com'],
  //       email_from: 'no-reply@rocketpunchlabs.com',
  //       html: emailMarkup
  //     };

  //     axios({
  //       method: 'post',
  //       headers: {
  //         'Access-Control-Allow-Origin': '*'
  //       },
  //       url:
  //         'https://4ag3is2966.execute-api.us-east-1.amazonaws.com/dev/mail/post',
  //       auth: {
  //         username: 'jma921',
  //         password: '96oxTnVyTULKTT'
  //       },
  //       data: emailObj
  //     })
  //       .then(res => {
  //         this.resetForm();
  //         this.setState({
  //           processing: false,
  //           alertSuccess: true,
  //           alertVisible: true
  //         });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         this.setState({ processing: false, error: true });
  //       });
  //   })
  //   .catch(err => {
  //     this.setState({
  //       errorText: 'You are a bot. Go away!',
  //       alertError: true,
  //       alertVisible: true,
  //       processing: false
  //     });
  //   });
  // if (!gRecaptchaResponse) {
  //   this.setState({
  //     errorText: 'You are a bot. Go away!',
  //     alertError: true,
  //     alertVisible: true,
  //     processing: false
  //   });
  //   return;
  // }

  // const validate = validateForm(name, email, message);
  // if (validate === 'name') {
  //   this.setState({
  //     errorMessage: 'Please enter your name.',
  //     processing: false
  //   });
  //   return;
  // } else if (validate === 'email') {
  //   this.setState({
  //     errorMessage: 'Please enter your email.',
  //     processing: false
  //   });
  //   return;
  // } else if (validate === 'message') {
  //   this.setState({
  //     errorMessage: 'Please enter your message.',
  //     processing: false
  //   });
  //   return;
  // }
  // };
  // resetForm = () => {
  //   this.setState({
  //     budget: '',
  //     email: '',
  //     fullName: '',
  //     organizationName: '',
  //     overview: ''
  //   });
  // };
  renderAlert = () => {
    const { alertSuccess, alertError, errorText } = this.state;
    if (alertSuccess) {
      return (
        <div className="notification is-success" style={{ marginTop: '1rem' }}>
          <button
            className="delete"
            onClick={() => this.setState({ alertVisible: false })}
          />
          <strong>Thank You!</strong> We look forward to working with you.
        </div>
      );
    }
    if (alertError) {
      return (
        <div className="notification is-danger" style={{ marginTop: '1rem' }}>
          <button
            className="delete"
            onClick={() => this.setState({ alertVisible: false })}
          />
          <strong>Error!</strong> {errorText}
        </div>
      );
    }
    return;
  };
  render() {
    console.log(this.props);
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { edges: portfolio } = data.allMarkdownRemark;

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Our Work</h1>
          </div>
          <div className="columns is-multiline">
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
                          </Overlay>
                        </Container>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Our Services</h1>
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
                    unique. You need to stand apart from the crowd. Here at RPL
                    we use our knowledge and creativity to help you do just
                    that.
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
                    having a quality website in todays technologically inclined
                    market place. We also understand how confusing it can be
                    when trying to get your business on the web.
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
                    vision and values, and elevates everything else that you do.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <h1 className="has-text-weight-bold is-size-2">Let's Chat</h1>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
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
            image
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
