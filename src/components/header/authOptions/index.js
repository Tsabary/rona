import "./styles.scss";
import React from "react";

import TextButton from "../../formComponents/textButton";
import BoxedButton from "../../formComponents/boxedButton";

const AuthOptions = () => {
  return (
    <div className="auth-options">
    <a href="#log-in">
      <TextButton text="Log in" />
    </a>
    <a href="#sign-up">
      <BoxedButton text="Join now" />
    </a>
  </div>
  );
};

export default AuthOptions;
