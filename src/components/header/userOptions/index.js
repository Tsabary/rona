import "./styles.scss";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../providers/Auth";

import { logOut, resendVerification } from "../../../actions";

import TextButton from "../../formComponents/textButton";

const UserOptions = ({ logOut, resendVerification }) => {
  const { currentUserProfile, currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="user-options ">
      <div className="flex-group">
        <div className="user-options__name tiny-margin-right">
          {!!currentUserProfile ? currentUserProfile.name : currentUser.email}
        </div>
        <div className="user-options__image-container ">
          <img
            className="user-options__image"
            src={
              (currentUserProfile && currentUserProfile.avatar) ||
              "../../../imgs/logo.jpeg"
            }
          />
        </div>
      </div>
      <div className="user-options__options">
        {!!currentUserProfile &&
        currentUserProfile.roles &&
        currentUserProfile.roles.includes("admin") ? (
          <Link to="/admins" className="user-options__option">
            <TextButton text="Option for admins" />
          </Link>
        ) : null}

        {currentUser.emailVerified ? (
          <a className="user-options__option" href="#update-profile">
            <TextButton text="Edit profile" />
          </a>
        ) : (
          <TextButton
            text="Resend email verification"
            onClick={resendVerification}
          />
        )}

        <div className="user-options__option" onClick={() => logOut()}>
          <TextButton text="Logout" />
        </div>
      </div>
    </div>
  );
};
export default connect(null, { logOut, resendVerification })(UserOptions);
