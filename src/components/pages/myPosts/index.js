import "./styles.scss";
import React, { useEffect,  useContext } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../../../providers/Auth";

import { fetchMyPosts } from "../../../actions";
import Post from "../feed/post";

const MyPosts = ({ myPosts, fetchMyPosts }) => {
  const {  currentUser } = useContext(AuthContext);

  useEffect(() => {
   if(currentUser) fetchMyPosts(currentUser.uid);
  }, [currentUser]);

  const renderItems = () => {
    return myPosts.map(post => {
      return <Post post={post} />;
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
