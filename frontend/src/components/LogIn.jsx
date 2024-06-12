import React from "react";
import { Link } from 'react-router-dom';
import "./Login.css";

function Login() {
  return (
    <div className="login">
        <p class='logintospring'>Log in to Spring</p>
        
        <form>
            <p class='EmailOrUsername'> Email or username </p>
            <input type="text" placeholder="Email or username"/> <br />

            <p> Password </p>
            <input type="password" placeholder="Password"/> <br />

            <input type={"button"} value={"Log in"}/> <br />
        </form>

        <p class='or'>---------------Or---------------</p>

        <button class='button LoginWithbutton'> <span> Continue With Google </span></button> <br />
        <p class='alreadyhaveaccount'> Don't have an account? <Link to="/signup">Sign up here.</Link></p> 
    </div>
  );
}

export default Login;