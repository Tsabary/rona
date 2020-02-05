import "./styles.scss";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AuthContext } from "../../providers/Auth";
import { logOut } from "../../actions";
import Menu from "./menu";
import TextButton from "../formComponents/textButton";
import BoxedButton from "../formComponents/boxedButton";

const Header = ({ logOut }) => {
  const { currentUserProfile, currentUser } = useContext(AuthContext);

  const renderAuth = () => {
    switch (true) {
      case !!currentUserProfile && !!currentUser:
        return (
          <div className="header__user ">
            <div className="header__user-name">

              <TextButton text={currentUserProfile.name} />
            </div>
            <div className="header__user-options">
              {currentUserProfile.roles.includes("admin") ? (
                <Link to="/admins" className="header__user-option">
                  <TextButton text="Option for admins" />
                </Link>
              ) : null}

              <a className="header__user-option" href="#update-profile">
                <TextButton text="Edit profile" />
              </a>

              <div className="header__user-option" onClick={() => logOut()}>
                <TextButton text="Logout" />
              </div>
            </div>
          </div>
        );

      case !currentUser:
        return (
          <div className="header__logged-out">
            <a href="#log-in">
              <TextButton text="Log in" />
            </a>
            <a href="#sign-up">
              <BoxedButton text="Join now" />
            </a>
          </div>
        );
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

export default connect(null, { logOut })(Header);
