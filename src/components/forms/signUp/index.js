import React, { useState } from "react";
import { connect } from "react-redux";
import InputField from "../../formComponents/inputField";
import { signUp } from "../../../actions";

const SignUp = ({ signUp }) => {
  const [values, setValues] = useState({});

  return (
    <div className="popup" id="sign-up">
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        <div className="popup__title">Create an account</div>
        <form onSubmit={() => signUp(values.email, values.password)}>
          <InputField
            type="text"
            placeHolder="Full name"
            value={values.name}
            onChange={name => setValues({ ...values, name })}
            label="Business name"
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
          <div className="popup__button medium-margin-top">
            <button type="submit" className="boxed-button">
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { signUp })(SignUp);
