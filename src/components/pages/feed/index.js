import "./styles.scss";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchAllItems } from "../../../actions";
// import '../../../../node_modules/draft-js-emoji-plugin/lib/plugin.css'
// import "../../../../node_modules/draft-js-hashtag-plugin/lib/plugin.css";
const Feed = ({ items, fetchAllItems }) => {
  useEffect(() => {
    fetchAllItems();
  }, []);

  /* 
  const  createMarkup = (content) => {
    return { __html: content };
  }         
  <div
    className="item__detail"
    dangerouslySetInnerHTML={createMarkup(item.title)}
  /> */

  const renderItems = () => {
    return items
      .filter(item => {
        return item.is_public === true;
      })
      .map(item => {
        return (
          <div className="item" key={item.id}>
            <div className="cover-image__container">
              <img className="cover-image" src={item.image} />
            </div>
            <div className="item__info">
              <div className="item__title">{item.title}</div>
              <div className="item__summary">{item.summary}</div>
            </div>
          </div>
        );
      });
  };

  return (
    <div className="feed">
      <h2>feed</h2>
      {!!items.length ? (
        <div className="feed__feed medium-margin-top">{renderItems()}</div>
      ) : (
        <div className="results__empty small-margin-top centered">
          Nothing to see here
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

export default connect(mapStateToProps, { fetchAllItems })(Feed);
