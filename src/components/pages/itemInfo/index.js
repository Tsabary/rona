// import "./styles.scss";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleItem } from "../../../actions";

const ItemInfo = ({ match, items, fetchSingleItem }) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    if (!!items.length) {
      items.map(element => {
        if (element.id === match.params.id) setItem(element);
      });
    } else {
      fetchSingleItem(match.params.id, setItem);
    }
    window.scrollTo(0, 0);
  }, []);

  const createMarkup = content => {
    return { __html: content };
  };

  return (
    <div className="item" key={item.id}>
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

export default connect(mapStateToProps, { fetchSingleItem })(ItemInfo);
