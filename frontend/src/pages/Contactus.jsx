import React from 'react';
import './Contactus.css';


function ContactUs() {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <div className="main">
        <div className="info-container">
          <h2>Get in touch</h2>
          <ul>
            <li><i className="fas fa-envelope"></i> hello@email.com</li>
            <li><i className="fab fa-instagram"></i> @instagram</li>
            <li><i className="fab fa-facebook"></i> @facebook</li>
          </ul>
        </div>
        <div className="contact-container">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
