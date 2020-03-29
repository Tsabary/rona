import "./styles.scss";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ReactSVG } from "react-svg";

import history from "../../history";

import { setCurrentPage } from "../../actions";

import { AuthContext } from "../../providers/Auth";
import AuthOptions from "./authOptions";
import UserOptions from "./userOptions";
import AddressOptions from "./addressOptions";
import LangOptions from "./langOptions";

const Header = ({ setCurrentPage }) => {
  const { currentUser } = useContext(AuthContext);
  const myHistory = useHistory(history);

  const renderAuth = () => {
    switch (true) {
      case !!currentUser:
        return <UserOptions />;

      case !currentUser:
        return <AuthOptions />;
      default:
        return null;
    }
  };

  const handleChange = page => {
    setCurrentPage(page);
    myHistory.push(`/`);
  };

  return (
    <div className="header">
      <div className="header-with-logo">
        <div className="header__logo-container" onClick={handleChange}>
          <div className="header__title">Rona</div>
          <LangOptions/>
        </div>
        <AddressOptions address={''}/>
        <div className="header__auth">{renderAuth()}</div>
      </div>

      <div className="header-without-logo">
        <AddressOptions address={''}/>
        <div className="header__auth">{renderAuth()}</div>
      </div>

    </div>
  );
};

export default connect(null, { setCurrentPage })(Header);
