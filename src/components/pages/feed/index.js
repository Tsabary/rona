import "./styles.scss";
import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import { AuthContext } from "../../../providers/Auth";
import { fetchAllPosts, togglePopup } from "../../../actions";
import Post from "./post";

const searchClient = algoliasearch(
  "6URA2STDUH",
  "5b0755921dd19ee2aefa42d360ee0aab"
);
const index = searchClient.initIndex("posts");

const Feed = ({ fetchAllPosts, togglePopup, popupShown }) => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [coords, setCoords] = useState([31.832768, 34.826944]);

  useEffect(() => {
    index
      .search("", {
        aroundLatLng: `${coords[0]}, ${coords[1]}`,
        aroundRadius: "all"
      })
      .then(({ hits }) => {
        setPosts(hits);
      });
  }, [coords]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const renderItems = posts => {
    return posts.map(post => {
      return <Post post={post} postID={post.objectID} key={post.objectID} />;
    });
  };

  return (
    <div className="feed">
      <a
        style={{display: popupShown ? 'none' : ''}}
        onClick={togglePopup}
        className="post-button"
        href={
          currentUser && currentUser.emailVerified ? "#new-request" : "#sign-up"
        }
      >
        בקשת עזרה
      </a>


      {!!posts.length ? (
        renderItems(posts)
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
    // posts: state.posts
    popupShown: state.popupShown
  };
};

export default connect(mapStateToProps, { fetchAllPosts, togglePopup })(Feed);
