import "./styles.scss";
import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import history from "../../../history";

import { setCurrentPage } from "../../../actions";

const Menu = ({ setCurrentPage, page }) => {
  const myHistory = useHistory(history);

  const turnToLowerCaseWithHyphen = string => {
    return string
      .toLowerCase()
      .split(" ")
      .join("-");
  };

  const handleChange = (page, path) => {
    setCurrentPage(page);
    myHistory.push(path);
  };

  const renderMenuItems = array => {
    return array.map(item => {
      const smallHyphenedItem = turnToLowerCaseWithHyphen(item);
      return (
        <div className="flex-group" key={smallHyphenedItem}>
          <input
            className="menu-item__radio"
            id={smallHyphenedItem}
            type="radio"
            name="menu-items"
            checked={page === smallHyphenedItem}
            onChange={() =>
              handleChange(smallHyphenedItem, `/${smallHyphenedItem}`)
            }
          />
          <label htmlFor={smallHyphenedItem} className="menu-item__label">
            {item}
          </label>
        </div>
      );
    });
  };

  const renderDropDownMenuItems = array => {
    return array.map(group => {
      return (
        <div className="menu-item menu__dropdown" key={group.title}>
          <input
            id={turnToLowerCaseWithHyphen(group.title)}
            className="menu-item__radio"
            type="radio"
            name="menu-items"
            checked={page === turnToLowerCaseWithHyphen(group.title)}
          />

          <label
            htmlFor={turnToLowerCaseWithHyphen(group.title)}
            className="menu__dropdown-title menu-item__label"
          >
            {group.title}
          </label>

          <div className="menu-item menu__dropdown-content">
            {group.pages.map(page => {
              return (
                <div
                  onClick={() =>
                    handleChange(
                      turnToLowerCaseWithHyphen(group.title),
                      `/${turnToLowerCaseWithHyphen(
                        group.title
                      )}/${turnToLowerCaseWithHyphen(page)}`
                    )
                  }
                  className="menu-item__label"
                  key={page}
                >
                  {page}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="menu">
      {renderMenuItems(["Feed", "Search"])}
      {renderDropDownMenuItems([
        { title: "Top category", pages: ["Page 1", "Page 2"] }
      ])}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    page: state.page
  };
};

export default connect(mapStateToProps, { setCurrentPage })(Menu);
