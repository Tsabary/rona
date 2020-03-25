import "./styles.scss";
import React from "react";

import TextButton from "../../formComponents/textButton";
import BoxedButton from "../../formComponents/boxedButton";

const AuthOptions = () => {
  return (
    <div className="auth-options">
    <a href="#sign-up">
      <BoxedButton text="התחברות" />
    </a>
  </div>
  );
};

export default AuthOptions;
