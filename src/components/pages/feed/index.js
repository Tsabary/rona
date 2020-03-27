import "./styles.scss";
import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import { AuthContext } from "../../../providers/Auth";
import { fetchAllPosts, togglePopup, changeAddress } from "../../../actions";
import Post from "./post";

const searchClient = algoliasearch(
  "6URA2STDUH",
  "5b0755921dd19ee2aefa42d360ee0aab"
);
const index = searchClient.initIndex("posts");

const Feed = ({
  fetchAllPosts,
  togglePopup,
  popupShown,
  address,
  changeAddress
}) => {
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUserProfile)
      changeAddress({
        text: currentUserProfile.address_text,
        coords: [
          currentUserProfile.address_coords.latitude,
          currentUserProfile.address_coords.longitude
        ]
      });
  }, [currentUserProfile]);

  useEffect(() => {
    console.log(address);
    index
      .search("", {
        aroundLatLng: `${address.coords[0]}, ${address.coords[1]}`,
        aroundRadius: "all"
      })
      .then(({ hits }) => {
        setPosts(hits);
      });
  }, [address]);

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
        style={{ display: popupShown ? "none" : "" }}
        onClick={togglePopup}
        className="post-button"
        href={
          currentUser && currentUser.emailVerified ? "#new-request" : "#sign-up"
        }
      >
        בקשת עזרה
      </a>

      {!!posts.length ? renderItems(posts) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    address: state.address,
    popupShown: state.popupShown
  };
};

export default connect(mapStateToProps, {
  fetchAllPosts,
  togglePopup,
  changeAddress
})(Feed);
