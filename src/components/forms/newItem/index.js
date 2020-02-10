// import "./styles.scss";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";

import { AuthContext } from "../../../providers/Auth";

import { newItem } from "../../../actions";
import Item from "../item";

const NewItem = ({ newItem }) => {
  const { currentUserProfile } = useContext(AuthContext);
  const [values, setValues] = useState({});
  // const [selectedImage, setSelectedImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);

  useEffect(() => {
    if (!!currentUserProfile)
      setValues({
        author_uid: currentUserProfile.uid,
        author_name: currentUserProfile.name,
        author_avatar: currentUserProfile.avatar
      });
  }, [currentUserProfile]);

  // const handleImageChange = e => {
  //   if (e.target.files[0]) {
  //     const image = e.target.files[0];
  //     setSelectedImage(URL.createObjectURL(image));
  //     setImageObj(image);
  //   }
  // };

  // const onSubmit = is_public => {

  // };

  const handleSubmit = (event, is_public) => {
    event.preventDefault();
    newItem({ ...values, is_public }, imageObj, setValues);
  };

  return (
    <div className="popup" id="new-item">
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        <div className="popup__title">Create a new item</div>
        <form onSubmit={event => handleSubmit(event, true)}>
          <Item
            values={values}
            setValues={setValues}
            // handleImageChange={handleImageChange}
            // selectedImage={selectedImage}
            setImageObj={setImageObj}
          />

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
    </div>
  );
};

export default connect(null, { newItem })(NewItem);
