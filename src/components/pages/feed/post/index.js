import "./styles.scss";
import React, { useContext } from "react";
import Moment from "react-moment";
import "moment/locale/he";

import { connect } from "react-redux";

import { AuthContext } from "../../../../providers/Auth";

import { removePost } from "../../../../actions";

const Post = ({ post, removePost, postID }) => {
  const { currentUser } = useContext(AuthContext);

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
            <div className="post__author-name">{post.user_name}</div>
            <span className="post__timestamp">
              <Moment fromNow locale="he">
                {post.timestamp}
              </Moment>
            </span>
          </div>
          {currentUser && post.user_ID === currentUser.uid ? (
            <label className="text-button" htmlFor={`post-checkbox` + postID}>
              מחיקה
            </label>
          ) : null}
        </div>

        {/* <details>
          <summary>
            <div className="post__title">{post.title}</div>
          </summary>
          <div className="post__body tiny-margin-top">{post.body}</div>

          <div className="post__details tiny-margin-top"></div>
          {!currentUser ? (
            <a href="#sign-up">Show Details</a>
          ) : isDetailsVisible ? (
            <div>
              <a
                className="post__location"
                target="_blank"
                href={
                  "http://www.google.com/maps/place/" +
                  post.address_coords.latitude +
                  "," +
                  post.address_coords.longitude
                }
              >
                Location: {post.address_text}
              </a>
              <div className="post__number-visible">{post.phone_number}</div>
            </div>
          ) : (
            <div className="post_show-details" onClick={setIsDetailsVisible}>
              Show Details
            </div>
          )}
        </details> */}

        <div className="post__title">{post.title}</div>
        <div className="post__body tiny-margin-top">{post.body}</div>
        <div className="post__details tiny-margin-top">
          {/* <a
            className="post__location"
            target="_blank"
            href={
              "http://www.google.com/maps/place/" +
              post.address_coords.latitude +
              "," +
              post.address_coords.longitude
            }
          >
            Location: {post.address_text}
          </a> */}

          {/* {isNumberVisible ? (
            <div className="post__number-visible">{post.phone_number}</div>
          ) : (
            <div
              className="post__number-hidden text-button clickable"
              onClick={() => setIsNumberVisible(true)}
            >
              Show number
            </div>
          )} */}
        </div>
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
