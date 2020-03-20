import "./styles.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchAllPosts } from "../../../actions";
import Post from "./post";

const Feed = ({ posts, fetchAllPosts }) => {

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
