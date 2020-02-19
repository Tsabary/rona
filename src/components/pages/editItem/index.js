// import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";

// import { AuthContext } from "../../../providers/Auth";

import { fetchSingleItem, updateItem } from "../../../actions";
import Item from "../../forms/item";

const EditItem = ({ match, items, fetchSingleItem, updateItem }) => {
  // {console.log("this whole thing")}

  //   const { currentUserProfile } = useContext(AuthContext);
  ///// Not sure if here - but needs to set a wal so only authorized users can edit listings
  const [values, setValues] = useState(null);
  const [imageObj, setImageObj] = useState(null);

  useEffect(() => {
    if (!!items.length) {
      items.map(element => {
        if (element.id === match.params.id) setValues(element);
      });
    } else {
      fetchSingleItem(match.params.id, setValues);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    updateItem(values, imageObj, setValues);
  };

  return (
    <div>
      <h2>Edit your item</h2>
      <form onSubmit={handleSubmit}>
        {!!values ? (
          <Item
            values={values}
            setValues={setValues}
            setImageObj={setImageObj}
          />
        ) : null}

        <div className="popup__button medium-margin-top">
          <button type="submit" className="boxed-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

export default connect(mapStateToProps, { fetchSingleItem, updateItem })(
  EditItem
);
