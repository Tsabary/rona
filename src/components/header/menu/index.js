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

  const handleChange = page => {
    setCurrentPage(page);
    myHistory.push(`/${page}`);
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
            onChange={() => handleChange(smallHyphenedItem)}
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
          <div className="menu__dropdown-title">{group.title}</div>
          <div className="menu-item menu__dropdown-content">
            {group.pages.map(page => {
              return (
                <Link
                  to={
                    "/" +
                    turnToLowerCaseWithHyphen(group.title) +
                    "/" +
                    turnToLowerCaseWithHyphen(page)
                  }
                  className="menu-item__label"
                  key={page}
                >
                  {page}
                </Link>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="menu">
      {renderMenuItems(["Feed", "Search", "Contact us"])}
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
