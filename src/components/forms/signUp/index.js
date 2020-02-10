// import "./styles.scss";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InputField from "../../formComponents/inputField";
import { signUp, providerSignIn } from "../../../actions";

const SignUp = ({ signUp, providerSignIn }) => {
  const [values, setValues] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setValues({});
  }, [sent]);

  const handleSubmit = event => {
    event.preventDefault();
    signUp(values.email, values.password, setSent);
  };

  return (
    <div className="popup" id="sign-up">
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        {!sent ? (
          <>
            <div className="popup__title">Create an account</div>
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

              <button
                type="submit"
                className="auth__button auth__button--direct small-margin-top"
              >
                Sign up with email
              </button>

              <div
                className="auth__button auth__button--google small-margin-top"
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
        ) : (
          <div>
            Please check your email for our message and verify your account
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(null, { signUp, providerSignIn })(SignUp);
