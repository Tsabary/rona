// import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";

// import { AuthContext } from "../../../providers/Auth";

import { fetchSingleItem, newItem } from "../../../actions";
import Item from "../../forms/item";

const NewItem = ({ newItem }) => {

  //   const { currentUserProfile } = useContext(AuthContext);
  ///// Not sure if here - but needs to set a wal so only authorized users can edit listings
  const [values, setValues] = useState(null);
  const [imageObj, setImageObj] = useState(null);


  const handleSubmit = (event, is_public) => {
    event.preventDefault();
    newItem({ ...values, is_public }, imageObj, setValues);
  };

  return (
    <div>
      <h2>New Item</h2>
      <form onSubmit={e => handleSubmit(e, true)}>
        <Item values={values} setValues={setValues} setImageObj={setImageObj} />

        <div className="popup__button medium-margin-top">
          <button type="submit" className="boxed-button">
            Submit
          </button>
        </div>

        <div
          className="new-item__save centered small-margin-top"
          onClick={event => handleSubmit(event, false)}
        >
          Save for later
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

export default connect(mapStateToProps, { fetchSingleItem, newItem })(NewItem);
