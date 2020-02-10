import React, { useState } from "react";
import { connect } from "react-redux";

import InputField from "../../formComponents/inputField";
import { logIn, providerSignIn } from "../../../actions";

const LogIn = ({ logIn, providerSignIn }) => {
  const [values, setValues] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    logIn(values.email, values.password);
  };

  return (
    <div className="popup" id="log-in">
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        <div className="popup__title">Login</div>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeHolder="Email address"
            value={values.email}
            onChange={email => setValues({ ...values, email })}
            label="Email"
          />
          <InputField
            type="password"
            placeHolder="password"
            value={values.password}
            onChange={password => setValues({ ...values, password })}
            label="Password"
          />
          <button
            type="submit"
            className="sign-up__button sign-up__button--direct small-margin-top"
          >
            Login with email
          </button>

          <div
            className="sign-up__button sign-up__button--google  small-margin-top"
            onClick={() => {
              providerSignIn("google");
            }}
          >
            google
          </div>
          <div
            className="sign-up__button sign-up__button--facebook small-margin-top"
            onClick={() => {
              providerSignIn("facebook");
            }}
          >
            facebook
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { logIn, providerSignIn })(LogIn);
