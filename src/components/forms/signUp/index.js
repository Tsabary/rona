import "./styles.scss";
import React, { useState } from "react";
import { connect } from "react-redux";
import InputField from "../../formComponents/inputField";
import { signUp, providerSignIn } from "../../../actions";

const SignUp = ({ signUp, providerSignIn }) => {
  const [values, setValues] = useState({});
  
  return (
    <div className="popup" id="sign-up">
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        <div className="popup__title">Create an account</div>
        <form onSubmit={() => signUp(values.email, values.password)}>
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
            className="sign-up__button sign-up__button--direct"
          >
            Sign up with email
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

export default connect(null, { signUp, providerSignIn })(SignUp);
