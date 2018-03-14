import React, { Component } from 'react';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

class ContactForm extends Component {
  state = {
    fullName: '',
    email: '',
    message: '',
    organizationName: '',
    overview: '',
    budget: ''
  };
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
      .then(() => alert('Success!'))
      .catch(error => alert(error));

    e.preventDefault();
  };
  resetForm = () => {
    this.setState({
      budget: '',
      email: '',
      fullName: '',
      organizationName: '',
      overview: ''
    });
  };
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
                type="text"
                placeholder="Full Name"
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
                type="text"
                placeholder="Organization Name"
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
                type="email"
                placeholder="Email"
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
                onChange={this.handleInputChange}
                rows="5"
                placeholder="Overview"
                className="textarea"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Estimated Budget</label>
            <div className="control">
              <input
                className="input"
                onChange={this.handleInputChange}
                name="budget"
                type="text"
                placeholder="Estimated Budget"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
        {this.state.alertVisible ? this.renderAlert() : ''}
      </div>
    );
  }
}

export default ContactForm;
