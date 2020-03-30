import "./styles.scss";
import React, { useContext, useState } from "react";
import Moment from "react-moment";
import Translate from 'translate-components';
import "moment/locale/ru";
import "moment/locale/he";

import { connect } from "react-redux";

import { AuthContext } from "../../../../providers/Auth";

import { removePost } from "../../../../actions";
import { calcGeoDistance } from "../../../../utils";

const Post = ({ post, removePost, postID }) => {
  const { currentUser, lang } = useContext(AuthContext);
  const [distance, setDistance] = useState(null);
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  calcGeoDistance(post, d => setDistance(d));

  return (
    <div className="post">
      <input
        className="post-checkbox"
        type="checkbox"
        id={`post-checkbox` + postID}
      />
      <span className="post__visible">
        <div className="max-fr-max tiny-margin-bottom">
          <div className="round-image__container round-image__container--small">
            <img
              className="round-image"
              src={`https://api.adorable.io/avatars/285/${post.user_ID}.png`}
            />
          </div>
          <div>
            <span className="post__author-name">{post.user_name}</span>
            <span className="post__timestamp">
              <Moment fromNow locale={lang}>
                {post.timestamp}
              </Moment>
            </span>
          </div>
          {currentUser && post.user_ID === currentUser.uid ? (
            <label className="text-button" htmlFor={`post-checkbox` + postID}>
              מחיקה
            </label>
          ) : (
            distance && (
              <div className="post__distance">
                <span>{distance}</span>
               <Translate>fromYourLocation</Translate>
              </div>
            )
          )}
        </div>

        <div className="post__content small-margin-bottom">
          <div className="post__title">{post.title}</div>
          <div className="post__body tiny-margin-top">{post.body}</div>
        </div>

        {isNumberVisible ? (
          post.phone_number
        ) : currentUser ? (
          <div  className="post__number" onClick={() => setIsNumberVisible(true)}><Translate>showPhoneNum</Translate></div>
        ) : (
          <a href="#sign-up" className="post__number"><Translate>showPhoneNum</Translate></a>
        )}
      </span>

      <span className="post__hidden">
        <div>בטוח שברצונך למחוק את הפוסט?</div>
        <div className="max-max small-margin-top">
          <label className="text-button" htmlFor={`post-checkbox` + postID}>
            ביטול
          </label>

          <label
            className="post__remove"
            htmlFor={`post-checkbox` + postID}
            onClick={() => removePost(post)}
          >
            מחיקה
          </label>
        </div>
      </span>
    </div>
  );
};

export default connect(null, { removePost })(Post);
