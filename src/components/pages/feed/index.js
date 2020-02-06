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

  function createMarkup(content) {
    return { __html: content };
  }

  const renderItems = () => {
    return items.map(item => {
      return (
        <div className="item" key={item.id}>
          {/* <div className="round-image__container medium-margin-top small-margin-bottom">
            <img className="round-image" src={member.image} />
          </div> */}
          <div className="item__info">
            <div
              className="item__detail"
              dangerouslySetInnerHTML={createMarkup(item.actual_content)}
            />
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
