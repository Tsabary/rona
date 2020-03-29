import "./styles.scss";
import React, {useContext} from "react";

import {reactTranslateChangeLanguage} from 'translate-components';
import { AuthContext } from "../../../providers/Auth";

const LangOptions = () => {
  const { lang, setLang } = useContext(AuthContext);
  const changeLang = lng => { 
    reactTranslateChangeLanguage(lng);
    setLang(lng);
  }
  return (
    <div className="lang-options">
      {lang}
      <div className="lang-drop-menu">
          <button onClick={() => changeLang('he')}>
            He
          </button>
          <button onClick={() => changeLang('en')}>
            En
          </button>
          <button onClick={() => changeLang('ru')}>
            Ru
          </button>          
      </div>
    </div>
  );
};

export default LangOptions;