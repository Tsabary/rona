import "./styles.scss";
import React, {useState} from "react";

import TextButton from "../../formComponents/textButton";
import {reactTranslateChangeLanguage} from 'translate-components'

const LangOptions = () => {
  const [currLang, setCurrLang] = useState('he');
  return (
    <div className="lang-options">
      {currLang}
      <div className="lang-drop-menu">
          <button onClick={() => { reactTranslateChangeLanguage('he'); setCurrLang('he'); }}>
            He
          </button>
          <button onClick={() => { reactTranslateChangeLanguage('en'); setCurrLang('en'); }}>
            En
          </button>
      </div>
    </div>
  );
};

export default LangOptions;