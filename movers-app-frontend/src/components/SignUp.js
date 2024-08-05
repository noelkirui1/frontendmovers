import React from 'react';
import './SignUp.css';

function SignUp() {
  return (
    <div className="sign-up-container">
      <h2 className="sign-up-header">Sign Up</h2>
      <form className="sign-up-form">
        <label>
          Name*
          <input type="text" name="name" placeholder="Name" required />
        </label>
        <label>
          Email*
          <input type="email" name="email" placeholder="Email" required />
        </label>
        <label>
          Password*
          <input type="password" name="password" placeholder="Password" required />
        </label>
        <label>
          Confirm Password*
          <input type="password" name="confirm-password" placeholder="Confirm Password" required />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="updates" />
          Get updates on our shop news and promotions
        </label>
        <button type="submit">Submit</button>
      </form>
      <p className="sign-in-link">
        Already have an account? <a href="/login">Sign in here</a>.
      </p>
    </div>
  );
}

export default SignUp;
