import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  return (
    <div className="signup">
      
      <p class='signuptospring'>Sign up to start <br/>listening</p>

      <form>
          <p class='EmailAddress'> Email address</p>
          <input type="text" placeholder="name@domain.com"/> <br />

          <input type={"button"} value={"Sign Up"}/>
      </form>

      <p class='or'>--------------  Or  --------------</p>
      
      <button class='buttonSignUp SignUpWithbutton'> <span> Sign Up With Google </span></button> <br />
      

      <p class='alreadyhaveaccount'> Already have an account? <Link to="/login">Log in here.</Link></p>
    </div>
  );
}

export default SignUp;