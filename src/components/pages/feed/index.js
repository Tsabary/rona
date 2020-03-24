import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { fetchAllPosts } from "../../../actions";
import Post from "./post";
import { AuthContext } from "../../../providers/Auth";
import TextButton from "../../formComponents/textButton";

const Feed = ({ posts, fetchAllPosts }) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const renderItems = () => {
    return posts.map(post => {
      return <Post post={post} />;
    });
  };

  return (
    <div className="feed">  
      <Link className="post-button" to={currentUser && currentUser.emailVerified ? "/new-request" : "/sign-up"}>
        ...צריך עזרה עם
      </Link>

      {!!posts.length ? (
        renderItems()
      ) : (
        <div className="empty-feed small-margin-top centered">
          Nothing to see here
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(mapStateToProps, { fetchAllPosts })(Feed);
