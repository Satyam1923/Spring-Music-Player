import React, { useState } from 'react';
import "./signin.css"

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNextClick = () => {
    if (formStep === 1) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(email)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
        setFormStep(2);
      }
    } else if (formStep === 2) {
      // Add your validation for the three inputs here
      setFormStep(3);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    
    <div className="create-account-container">
      <div className="create-account-form">
        <h2>Create an account</h2>
        <p><span>Already have an account?</span> Log in</p>
        <div className="form-steps flex-container">
          <div className={`step ${formStep === 1 ? 'active step-1' : 'step-2'}`} data-step="1">
            <span>Enter your email address</span>
          </div>
          <div className={`step ${formStep === 2 ? 'active step-2' : 'step-3'}`} data-step="2">
            <span>Provide your basic info</span>
          </div>
          <div className={`step ${formStep === 3 ? 'active step-3' : ''}`} data-step="3">
            <span>Create your password</span>
          </div>
        </div>
        {formStep === 1 ? (
          <>
            <label className="email" htmlFor="email-input">What's your email?</label>
            <input
              className="input-field" 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {emailError && <p className="error-message">{emailError}</p>}
            <button className="next-btn" onClick={handleNextClick}>Next</button>
            <div className="separator">
                <hr />
                <span>or</span>
                <hr />
              </div>
              <div className="signup-options">
                <button className="facebook-btn">
                  <i className="fab fa-facebook-f"></i> Sign up with Facebook
                </button>
                <button className="google-btn">
                  <i className="fab fa-google"></i> Sign up with Google
                </button>
              </div>
          </>
        ) : null}
        {formStep === 2 ? (
          <>
            <label className="email" htmlFor="first-name-input">First Name</label>
            <input className="input-field" type="text" placeholder="Enter your first name" required />

            <label className="email" htmlFor="last-name-input">Last Name</label>
            <input className="input-field" type="text" placeholder="Enter your last name" required />

            <label className="email" htmlFor="username-input">Username</label>
            <input className="input-field" type="text" placeholder="Enter your username" required />

            <button className="next-btn" onClick={handleNextClick}>Next</button>
          </>
        ) : null}
{formStep === 3 ? (
  <>
    <label className="email" htmlFor="Password">Password</label>
   
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <input
        className="input-field1"
        type={showPassword ? "text" : "password"}
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ flex: 1}}
      />
       <button 
    
        onClick={togglePasswordVisibility} 
        style={{ 
          color: '#fff',
          marginBottom: '3vw', 
          marginRight: '8vw',
          background: 'transparent', 
          border: 'none', 
          cursor: 'pointer' 
        }}
      >
        {showPassword ? "👁️ Hide" : "👁️ Show"}
      </button>
    </div>
    <p style={{ color: '#ffbdf1', fontSize: '1.2rem', fontFamily: 'Poppinslight', listStyleType: 'none', padding: 0 }}>
      • Use 8 or more characters
      • One Uppercase character
      • One lowercase character<br/>
      • One special character
      • One number
    </p>
    <button className="next-btn" onClick={handleNextClick}  style={{ color: formStep === 3 ? '#87fc93' : 'defaultColor' }}>Create an Account</button>
  </>
) : null}

      </div>
    </div>
  );
};

export default SignIn;