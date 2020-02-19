import "./styles.scss";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../history";

import { setCurrentPage } from "../../actions";


import { AuthContext } from "../../providers/Auth";
import Menu from "./menu";
import AuthOptions from "./authOptions";
import UserOptions from "./userOptions";

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
      <div className="header__logo-container">
        <div className="header__logo-container" onClick={handleChange}>
          {/* <div className="header__logo" /> */}
          <div className="header__title">Brand</div>
        </div>
      </div>

      <div className="header__menu">
        <Menu />
      </div>
      <div className="header__auth">{renderAuth()}</div>
    </div>
  );
};

export default connect(null, { setCurrentPage })(Header);
