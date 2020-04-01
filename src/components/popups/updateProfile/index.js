import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";

import firebase from "firebase/app";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { AuthContext } from "../../../providers/Auth";

import { updateProfile } from "../../../actions";

import InputField from "../../formComponents/inputField";
import TextArea from "../../formComponents/textArea";


const UpdateProfile = ({ updateProfile }) => {
  const [values, setValues] = useState({});
  const { currentUserProfile, setCurrentUserProfile, currentUser } = useContext(
    AuthContext
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [address, setAddress] = useState(null);

  const handleImageChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setSelectedImage(URL.createObjectURL(image));
      setImageObj(image);
    }
  };

  const handleSelect = address => {
    setValues({ ...values, address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setValues({
          ...values,
          address_text: address,
          address_coords: new firebase.firestore.GeoPoint(
            latLng.lat,
            latLng.lng
          )
        });
      })
      .catch(error => console.error("Error", error));
  };

  useEffect(() => {
    if (!!currentUserProfile) {
      setValues(currentUserProfile);
    }
  }, [currentUserProfile]);

  return (
    <div className="popup" id="update-profile">
      <div className="popup__container">
        <a className="popup__close" href="#">
          <div />
          סגירה
        </a>
        <div className="popup__title">עדכון פרופיל</div>
        <form
          onSubmit={() =>
            updateProfile(values, currentUser, imageObj, () =>
              setCurrentUserProfile({
                ...values,
                avatar: selectedImage || currentUserProfile.avatar
              })
            )
          }
        >
          {/* <label htmlFor="update-profile-image" className="new-event__label">
            <div className="round-image__container round-image__container--profile-form">
              <img
                className="round-image clickable"
                src={
                  selectedImage ||
                  (currentUserProfile && currentUserProfile.avatar) ||
                  "../../imgs/logo.jpeg"
                }
              />
            </div>
          </label>
          <input
            id="update-profile-image"
            className="update-profile__upload"
            type="file"
            onChange={handleImageChange}
          /> */}

          <InputField
            type="text"
            placeHolder="First name"
            value={values.name}
            onChange={name => setValues({ ...values, name })}
            label="שם פרטי"
          />

          <div className="small-margin-bottom">
            <PlacesAutocomplete
              value={
                address ||
                (currentUserProfile && currentUserProfile.address_text) ||
                ""
              }
              onChange={address => setAddress(address)}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "What's your address?",
                      className: "input-field__input"
                    })}
                  />
                  <div className="places-autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#ebecf4", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className: "places-autocomplete",
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          <InputField
            type="text"
            placeHolder="Phone Number"
            value={values.phone_number}
            onChange={phone_number => setValues({ ...values, phone_number })}
            label="טלפון"
          />

          <div className="popup__button medium-margin-top">
            <button type="submit" className="boxed-button">
              עדכון
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { updateProfile })(UpdateProfile);
