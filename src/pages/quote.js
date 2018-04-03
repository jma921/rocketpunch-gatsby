import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const Title = styled.h1.attrs({
  className: 'title'
})`
  margin-bottom: 3rem !important;
`;

class Quote extends Component {
  state = {
    processing: false,
    alertVisible: false,
    success: false,
    error: false,
    errorMessage: '',
    startDate: moment(),
    additionalInfo: '',
    additionalProducts: '',
    budget: '',
    dueDate: '',
    email: '',
    excludedDesigns: '',
    existingProject: '',
    howDidYouHearAboutUs: '',
    includedDesigns: '',
    likedDesigns: '',
    logoFirstImpressions: '',
    name: '',
    overview: '',
    phone: '',
    prefferedContactMethod: '',
    previousWork: ''
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleDateChange = date => {
    this.setState({
      startDate: date,
      dueDate: date.format('MMM Do YY')
    });
  };
  handleSubmit = e => {
    this.setState({
      processing: true
    });
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'quote', ...this.state })
    })
      .then(() => {
        this.setState({
          processing: false,
          success: true,
          alertVisible: true
        });
        this.resetForm();
      })
      .catch(error => {
        this.setState({
          error: true,
          errorMessage: error
        });
      });

    e.preventDefault();
  };
  renderButton = () => {
    const { processing } = this.state;
    if (processing) {
      return (
        <button className="button is-link is-loading" type="submit">
          Submit
        </button>
      );
    } else {
      return (
        <button className="button is-link" type="submit">
          Submit
        </button>
      );
    }
  };
  resetForm = () => {
    this.setState({
      additionalInfo: '',
      additionalProducts: '',
      budget: '',
      dueDate: '',
      email: '',
      excludedDesigns: '',
      existingProject: '',
      howDidYouHearAboutUs: '',
      includedDesigns: '',
      likedDesigns: '',
      logoFirstImpressions: '',
      name: '',
      overview: '',
      phone: '',
      prefferedContactMethod: '',
      previousWork: ''
    });
  };
  renderAlert = () => {
    const { success, error, alertVisible, errorMessage } = this.state;
    if (!alertVisible) {
      return null;
    }
    if (success) {
      return (
        <div className="notification is-success" style={{ marginTop: '1rem' }}>
          <strong>Thank You!</strong> We look forward to working with you.
        </div>
      );
    }
    if (error) {
      return (
        <div className="notification is-danger" style={{ marginTop: '1rem' }}>
          <strong>Error!</strong>{' '}
          {process.env.NODE_ENV === 'development'
            ? `Development error | ${errorMessage}`
            : 'Please try again later.'}
        </div>
      );
    }
    return;
  };
  render() {
    return (
      <div className="container">
        <div className="section">
          <Title>Design Questionnaire</Title>
          <h2 className="subtitle">
            Please fill out the following form to the best of your knowledge.
            This will help me in designing the perfect logo for you. Have fun
            and don't take it too seriously. If you do not have an answer for a
            question, just leave it blank.
          </h2>
        </div>
        <div className="section columns">
          <div className="column is-half is-offset-one-quarter">
            <form
              name="quote"
              method="post"
              action="/thanks/"
              onSubmit={this.handleSubmit}
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <h2 className="title">Contact Information</h2>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">Full Name</label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="name"
                    value={this.state.name}
                    type="text"
                  />
                </div>
                <div className="control is-expanded">
                  <label className="label">Email</label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="email"
                    value={this.state.email}
                    type="email"
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">Phone</label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="phone"
                    value={this.state.phone}
                    type="text"
                  />
                </div>
                <div className="control is-expanded">
                  <label className="label">Preffered Method of Contact</label>
                  <div className="select" style={{ width: '100%' }}>
                    <select
                      style={{ width: '100%' }}
                      name="prefferedContactMethod"
                      onChange={this.handleInputChange}
                    >
                      <option> </option>
                      <option>Email</option>
                      <option>Phone</option>
                      <option>Text</option>
                    </select>
                  </div>
                </div>
              </div>

              <h2 className="title is-spaced mt-2">Project Information</h2>
              <h3 className="subtitle">Tell us about your project</h3>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">
                    Is this a new design or a re-design of an existing logo
                  </label>
                  <div className="select" style={{ width: '100%' }}>
                    <select
                      style={{ width: '100%' }}
                      name="existingProject"
                      onChange={this.handleInputChange}
                    >
                      <option> </option>
                      <option>New Design</option>
                      <option>Redesign</option>
                    </select>
                  </div>
                </div>
                <div className="control is-expanded">
                  <label className="label">
                    What is your project completion date?{' '}
                  </label>
                  <DatePicker
                    className="input"
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">
                    What is your project's budget?
                  </label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="budget"
                    value={this.state.budget}
                    type="text"
                  />
                </div>
                <div className="control is-expanded">
                  <label className="label">
                    Are you interested in additional products to go with your
                    logo design?
                  </label>
                  <div className="select" style={{ width: '100%' }}>
                    <select
                      style={{ width: '100%' }}
                      name="additionalProducts"
                      onChange={this.handleInputChange}
                    >
                      <option> </option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
              </div>

              <h2 className="title is-spaced mt-2">
                Company / Organization Information
              </h2>
              <h3 className="subtitle">
                Tell us a little more about your company or non-profit
                organization
              </h3>

              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">Company/Organization Website</label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="companyWebsite"
                    value={this.state.companyWebsite}
                    type="text"
                  />
                </div>
                <div className="control is-expanded">
                  <label className="label">Company/Organization Name</label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="companyName"
                    value={this.state.companyName}
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <div className="label">
                    Give me a brief description of your company or organization.
                  </div>
                  <p>
                    For example your history, services you offer, products you
                    sell or any other information you may consider relevant in
                    allowing me to learn more about you.
                  </p>
                  <textarea
                    name="companyDescription"
                    value={this.state.companyDescription}
                    onChange={this.handleInputChange}
                    rows="5"
                    className="textarea"
                  />
                </div>
              </div>

              <h2 className="title is-spaced mt-2">Design Details</h2>
              <h3 className="subtitle">
                What do you want your logo to say about your company /
                organization?
              </h3>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    Spell your company / organization name exactly as you would
                    like it to appear on your logo.
                  </label>
                  <p>
                    It is very important that your name is displayed correctly.
                  </p>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="companyNameSpelling"
                    value={this.state.companyNameSpelling}
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    How did you come up with this name?
                  </label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="companyNameInspiration"
                    value={this.state.companyNameInspiration}
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    Is there a significant meaning behind this name? If so,
                    please elaborate.
                  </label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="companyNameMeaning"
                    value={this.state.companyNameMeaning}
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    Describe your company / organization in 5 words or less.
                  </label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="companyDescription"
                    value={this.state.companyDescription}
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    If there are any particular logos you have seen that you
                    really like, please list the company or organization here.
                  </label>
                  <p>You can also list website addresses if needed.</p>
                  <textarea
                    name="likedDesigns"
                    value={this.state.likedDesigns}
                    onChange={this.handleInputChange}
                    rows="5"
                    className="textarea"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    Please list any elements you would specifically like
                    INCLUDED in your design?
                  </label>
                  <p>
                    This could be a color scheme, symbol, slogan or text style
                  </p>
                  <textarea
                    name="includedDesigns"
                    value={this.state.includedDesigns}
                    onChange={this.handleInputChange}
                    rows="5"
                    className="textarea"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    Please list any elements you would specifically like
                    EXCLUDED in your design?
                  </label>
                  <p>
                    This could be a color scheme, symbol, slogan or text style
                  </p>
                  <textarea
                    name="excludedDesigns"
                    value={this.state.excludedDesigns}
                    onChange={this.handleInputChange}
                    rows="5"
                    className="textarea"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    When someone sees your logo, what is the first thing you
                    want them to think?
                  </label>
                  <input
                    className="input"
                    onChange={this.handleInputChange}
                    name="logoFirstImpressions"
                    value={this.state.logoFirstImpressions}
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">
                    Please provide any additional information you think might be
                    helpful.
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={this.state.additionalInfo}
                    onChange={this.handleInputChange}
                    rows="5"
                    className="textarea"
                  />
                </div>
              </div>

              <h2 className="title is-spaced mt-2">Almost Done</h2>
              <h3 className="subtitle">
                Answering these following questions is not required, but would
                be greatly appreciated as it helps me and my company.
              </h3>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">How did you hear about us?</label>
                  <div className="select" style={{ width: '100%' }}>
                    <select
                      style={{ width: '100%' }}
                      name="howDidYouHearAboutUs"
                      onChange={this.handleInputChange}
                    >
                      <option> </option>
                      <option>Social Media</option>
                      <option>Word of Mouth</option>
                      <option>Search Engine</option>
                      <option>Print Advertisement</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="control is-expanded">
                  <label className="label">
                    Have we previously done work for you or someone you know?
                  </label>
                  <div className="select" style={{ width: '100%' }}>
                    <select
                      style={{ width: '100%' }}
                      name="previousWork"
                      onChange={this.handleInputChange}
                    >
                      <option> </option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">{this.renderButton()}</div>
              </div>
            </form>
            {this.state.alertVisible ? this.renderAlert() : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Quote;
