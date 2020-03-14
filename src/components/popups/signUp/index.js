import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import InputField from "../../formComponents/inputField";
import { signUp, providerSignIn } from "../../../actions";

const SignUp = ({ signUp, providerSignIn }) => {
  const [values, setValues] = useState({});
  const [submitting, setSubmitting] = useState(0);
  const [formError, setFormError] = useState("");


  const handleSubmit = event => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setSubmitting(1);
    signUp(values.email, values.password, setSubmitting, setFormError);
  };

  const renderContent = (state, error) => {
    switch (state) {
      case 0:
        return (
          <>
            <div className="popup__title">Sign Up / Log In</div>
            <form onSubmit={handleSubmit}>
              <div className="small-margin-top">
                <InputField
                  type="text"
                  placeHolder="Full name"
                  value={values.name}
                  onChange={name => setValues({ ...values, name })}
                  label="Full name"
                />
                <InputField
                  type="email"
                  placeHolder="Email address"
                  value={values.email}
                  onChange={email => setValues({ ...values, email })}
                  label="Email"
                />
                <InputField
                  type="password"
                  placeHolder="Password"
                  value={values.password}
                  onChange={password => setValues({ ...values, password })}
                  label="Password"
                />
              </div>

              {error ? (
              <div className="form-error small-margin-top">{formError}</div>
            ) : null}

              <button
                type="submit"
                className="auth__button auth__button--direct small-margin-top"
              >
                Submit
              </button>

              <div
                className="auth__button auth__button--google  small-margin-top"
                onClick={() => {
                  providerSignIn("google");
                }}
              >
                google
              </div>
              <div
                className="auth__button auth__button--facebook small-margin-top"
                onClick={() => {
                  providerSignIn("facebook");
                }}
              >
                facebook
              </div>
            </form>
   
          </>
        );

      case 1:
        return (
          <div className="centered">
            <Loader type="Grid" color="#1472FF" height={100} width={100} />
          </div>
        );

      case 2:
        return (
          <div>
            Please check your email for our message and verify your account.
          </div>
        );

      case 3:
        return <div>Welcome back!</div>;

      case 4:
        return <div>Oh no! We're experincing issues signing you up.</div>;

      case 5:
        return <div>Oh no! We're experincing issues loging you in.</div>;
    }
  };

  return (
    <div className="popup" id="sign-up">
      <div className="popup__container">
        <a className="popup__close" href="#">
          <div />
          Close
        </a>
        {renderContent(submitting, formError)}
      </div>
    </div>
  );
};

export default connect(null, { signUp, providerSignIn })(SignUp);
