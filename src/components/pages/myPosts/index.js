import "./styles.scss";
import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../../../providers/Auth";

import { fetchMyPosts } from "../../../actions";
import Post from "../feed/post";

const MyPosts = ({ myPosts, fetchMyPosts }) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) fetchMyPosts(currentUser.uid);
  }, [currentUser, fetchMyPosts]);

  const renderItems = () => {
    return myPosts.map(post => {
      console.log(post);
      return <Post post={post} postID={post.id} key={post.id} />;
    });
  };

  return (
    <div className="my-posts">
      {!!myPosts.length ? (
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
    myPosts: state.myPosts
  };
};

export default connect(mapStateToProps, { fetchMyPosts })(MyPosts);
