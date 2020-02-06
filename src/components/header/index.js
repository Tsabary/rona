import "./styles.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../providers/Auth";
import Menu from "./menu";
import AuthOptions from "./authOptions";
import UserOptions from "./userOptions";

const Header = () => {
  const { currentUserProfile, currentUser } = useContext(AuthContext);

  const renderAuth = () => {
    switch (true) {
      case !!currentUserProfile && !!currentUser:
        return <UserOptions />;

      case !currentUser:
        return <AuthOptions />;
      default:
        return null;
    }
  };

  return (
    <div className="header">
      <div className="header__logo-container">
        {/* <div className="header__logo" /> */}
        <Link to={"/"} className="header__title">
          Brand
        </Link>
      </div>

      <div className="header__menu">
        <Menu />
      </div>
      <div className="header__auth">{renderAuth()}</div>
    </div>
  );
};

export default Header;
