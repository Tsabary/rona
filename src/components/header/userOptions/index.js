import "./styles.scss";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../providers/Auth";

import { logOut } from "../../../actions";

import TextButton from "../../formComponents/textButton";

const UserOptions = ({ logOut }) => {
  const { currentUserProfile } = useContext(AuthContext);

  return (
    <div className="user-options ">
      <div className="flex-group">
          
        <div className="user-options__name tiny-margin-right">
          {currentUserProfile.name}
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
        {currentUserProfile.roles.includes("admin") ? (
          <Link to="/admins" className="user-options__option">
            <TextButton text="Option for admins" />
          </Link>
        ) : null}

        <a className="user-options__option" href="#update-profile">
          <TextButton text="Edit profile" />
        </a>

        <div className="user-options__option" onClick={() => logOut()}>
          <TextButton text="Logout" />
        </div>
      </div>
    </div>
  );
};
export default connect(null, { logOut })(UserOptions);
