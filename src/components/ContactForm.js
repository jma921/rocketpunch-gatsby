import React, { Component } from 'react';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      message: '',
      organizationName: '',
      overview: '',
      processing: false,
      alertVisible: false,
      success: false,
      error: false,
      errorMessage: ''
    };
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    this.setState({
      processing: true
    });
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state })
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
      email: '',
      fullName: '',
      organizationName: '',
      overview: ''
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
      <div>
        <form
          name="contact"
          method="post"
          action="/thanks/"
          onSubmit={this.handleSubmit}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <div className="field">
            <label className="label">Full Name</label>
            <div className="control">
              <input
                className="input"
                onChange={this.handleInputChange}
                name="fullName"
                value={this.state.fullName}
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Organization Name</label>
            <div className="control">
              <input
                className="input"
                onChange={this.handleInputChange}
                name="organizationName"
                value={this.state.organizationName}
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                onChange={this.handleInputChange}
                name="email"
                value={this.state.email}
                type="email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Please provide a brief overview describing your work needed
            </label>
            <div className="control">
              <textarea
                name="overview"
                value={this.state.overview}
                onChange={this.handleInputChange}
                rows="5"
                className="textarea"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">{this.renderButton()}</div>
          </div>
        </form>
        {this.state.alertVisible ? this.renderAlert() : ''}
      </div>
    );
  }
}

export default ContactForm;
