import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../providers/Auth";

import { logOut, resendVerification } from "../../../actions";
import Translate from 'translate-components';
import TextButton from "../../formComponents/textButton";

const UserOptions = ({ logOut, resendVerification }) => {
  const { currentUserProfile, currentUser } = useContext(AuthContext);
  const [, setIsAdmin] = useState(false);

  useEffect(() => {
    if (
      !!currentUserProfile &&
      currentUserProfile.roles &&
      currentUserProfile.roles.includes("admin")
    )
      setIsAdmin(true);
  }, [currentUserProfile]);

  return (
    <div className="user-options ">
      <div className="user-options__container-full">
        <div className="user-options__name">
          {!!currentUserProfile ? currentUserProfile.name : currentUser.email}
        </div>
        <div className="user-options__image-container ">
          <img
            alt={'avatar'}
            className="user-options__image"
            src={
              (currentUserProfile && currentUserProfile.avatar) ||
              "../../../imgs/logo.jpeg"
            }
          />
        </div>
      </div>


      <div className="user-options__container-lean">
        <div className="user-options__image-container ">
          <img
            alt={'avatar'}
            className="user-options__image"
            src={
              (currentUserProfile && currentUserProfile.avatar) ||
              "../../../imgs/logo.jpeg"
            }
          />
        </div>
      </div>

      <div className="user-options__options">
        <a className="user-options__option" href="#update-profile">
          <TextButton>
             <Translate>profile</Translate>
          </TextButton>
        </a>

        <Link className="user-options__option" to="/my-posts">
           <Translate>myPosts</Translate>
        </Link>

        <Link className="user-options__option" to="/contact">
           <Translate>contact</Translate>
        </Link>

        <div className="user-options__option" onClick={() => logOut()}>
          <TextButton>
            <Translate>signout</Translate>
          </TextButton>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { logOut, resendVerification })(UserOptions);
