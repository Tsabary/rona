import "./styles.scss";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAllItems } from "../../../actions";

const Feed = ({ items, fetchAllItems }) => {
  useEffect(() => {
    fetchAllItems();
  }, []);

  const createMarkup = content => {
    return { __html: content };
  };

  const renderItems = () => {
    return items
      .filter(item => {
        return item.is_public === true;
      })
      .map(item => {
        return (
          <Link to={`/item/${item.id}`} className="item" key={item.id}>
            <div className="cover-image__container">
              <img className="cover-image" src={item.image} />
            </div>
            <div className="item__info">
              <div className="item__title">{item.title}</div>
              <div className="item__summary">{item.summary}</div>

              <div
                className="item__detail"
                dangerouslySetInnerHTML={createMarkup(item.content)}
              />
            </div>
          </Link>
        );
      });
  };

  return (
    <div className="feed">
      <h2>feed</h2>
      {!!items.length ? (
        <div className="feed__feed medium-margin-top">{renderItems()}</div>
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
    items: state.items
  };
};

export default connect(mapStateToProps, { fetchAllItems })(Feed);
