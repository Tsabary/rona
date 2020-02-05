import "./styles.scss";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchAllItems } from "../../../actions";

const Feed = ({ items, fetchAllItems }) => {
  useEffect(() => {
    fetchAllItems();
  }, []);

  const renderItems = () => {
    return items.map(item => {
      return (
        <div className="item" key={item.id}>
          {/* <div className="round-image__container medium-margin-top small-margin-bottom">
            <img className="round-image" src={member.image} />
          </div> */}
          <div className="item__info">
            <div className="item__detail">{item.input_field}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="feed">
      <h2>feed</h2>
      <div className="feed__feed medium-margin-top">{renderItems()}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

export default connect(mapStateToProps, { fetchAllItems })(Feed);
