import "./styles.scss";
import React from "react";

import TextBotton from "../../formComponents/textButton";

const AuthOptions = () => {
  return (
    <div className="auth-options">
      <a href="#sign-up">
        <TextBotton text="התחברות" />
      </a>
    </div>
  );
};

export default AuthOptions;
