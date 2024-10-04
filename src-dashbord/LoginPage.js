import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ handleLogin }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isLoginActive) {
      // Assuming validation is successful
      handleLogin(); // Call handleLogin from App to log the user in
    } else {
      // Handle signup logic here if needed
      alert('Signup form submitted');
    }
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLoginActive ? 'login' : 'signup'}`}>
          {isLoginActive ? 'Login Form' : 'Signup Form'}
        </div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLoginActive}
            onChange={() => setIsLoginActive(true)}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLoginActive}
            onChange={() => setIsLoginActive(false)}
          />
          <label
            htmlFor="login"
            className="slide login"
            onClick={() => setIsLoginActive(true)}
          >
            Login
          </label>
          <label
            htmlFor="signup"
            className="slide signup"
            onClick={() => setIsLoginActive(false)}
          >
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          {isLoginActive ? (
            <form className="login" onSubmit={handleFormSubmit}>
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member? <a href="#" onClick={toggleForm}>Signup now</a>
              </div>
            </form>
          ) : (
            <form className="signup" onSubmit={handleFormSubmit}>
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Confirm password" required />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
