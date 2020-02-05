import React, {useState} from "react";
import { connect } from "react-redux";

import InputField from "../../formComponents/inputField";
import { logIn } from "../../../actions";

const LogIn = ({ logIn }) => {
  const [values, setValues] = useState({});


  return (
    <div className="popup" id="log-in">
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        <div className="popup__title">Login</div>
        <form onSubmit={() => logIn(values.email, values.password)}>
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
          <div className="popup__button medium-margin-top">
            <button type="submit" className="boxed-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { logIn })(LogIn);
