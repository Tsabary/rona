import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import InputField from "../../formComponents/inputField";
import { signUp, providerSignIn, togglePopup } from "../../../actions";

const SignUp = ({ signUp, providerSignIn, togglePopup }) => {
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
            <div className="popup__title">הרשמה \ התחברות</div>
            <form onSubmit={handleSubmit}>
              <div
                className="auth__button auth__button--google  small-margin-top"
                onClick={() => {
                  togglePopup();
                  providerSignIn("google");
                }}
              >
                google
              </div>
              <div
                className="auth__button auth__button--facebook small-margin-top"
                onClick={() => {
                  togglePopup();
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
            בבקשה בדקו את האימייל שלכם להודעה אישור.
          </div>
        );

      case 3:
        return <div>ברועים השבים!</div>;

      case 4:
        return <div>אופס, יש לנו כמה בעיות בהרשמה כרגע.</div>;

      case 5:
        return <div>אופס, יש לנו כמה בעיות בחיבור כרגע.</div>;
    }
  };

  return (
    <div className="popup" id="sign-up">
      <div className="popup__container">
        <a className="popup__close" href="#" onClick={togglePopup}>
          <div />
          סגירה
        </a>
        {renderContent(submitting, formError)}
      </div>
    </div>
  );
};

export default connect(null, { signUp, providerSignIn, togglePopup })(SignUp);
