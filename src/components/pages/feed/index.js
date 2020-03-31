import "./styles.scss";
import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";

import algoliasearch from "algoliasearch/lite";
import Translate from 'translate-components';
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
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude: lat, longitude: lng}}) => {
       
        var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries`;
        fetch(url).then(d => d.json()).then(data => {
            let addr = data.results &&  data.results.length ? data.results[0].formatted_address : '';
            changeAddress({
              text: addr,
              coords: [lat, lng]
            });  

        });

      },
      fail => {
        if (currentUserProfile && currentUserProfile.address_coords)
          changeAddress({
            text: currentUserProfile.address_text,
            coords: [
              currentUserProfile.address_coords.latitude,
              currentUserProfile.address_coords.longitude
            ]
          });
      }
    );
  }, [currentUserProfile]);

  useEffect(() => {
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
        className="post-button"
        href={
          currentUser && currentUser.emailVerified ? "#new-request" : "#sign-up"
        }
      >
       <Translate>helpRequest</Translate>
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
