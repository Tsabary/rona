import "./styles.scss";
import React from "react";

import TextButton from "../../formComponents/textButton";
import Translate from 'translate-components'

const AuthOptions = () => {
  return (
    <div className="auth-options">
      <a href="#sign-up">
        <TextButton>
          <Translate>
            signIn
          </Translate>
        </TextButton>
      </a>
    </div>
  );
};

export default AuthOptions;
