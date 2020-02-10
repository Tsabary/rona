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
  // const [selectedImage, setSelectedImage] = useState(null);
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

  // const handleImageChange = e => {
  //   if (e.target.files[0]) {
  //     const image = e.target.files[0];
  //     setSelectedImage(URL.createObjectURL(image));
  //     setImageObj(image);
  //   }
  // };

  const onSubmit = event => {
    event.preventDefault();
    updateItem(values, imageObj, setValues);
    // newItem({ ...values, is_public }, imageObj, setValues);
  };

  return (
    <div>
      <h2>Edit your item</h2>
      <form onSubmit={onSubmit}>
        {!!values ? (
          <Item
            values={values}
            setValues={setValues}
            // handleImageChange={handleImageChange}
            // selectedImage={selectedImage}
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
