import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";

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
  const { currentUserProfile, currentUser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);

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
          address,
          address_lat: latLng.lat,
          address_lng: latLng.lng
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
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        <div className="popup__title">Update your profile</div>
        <form
          onSubmit={() => updateProfile(values, currentUser, imageObj)}
        >
          <label htmlFor="update-profile-image" className="new-event__label">
            <div className="round-image__container">
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
          />

          <InputField
            type="text"
            placeHolder="Full name"
            value={values.name}
            onChange={name => setValues({ ...values, name })}
            label="Full name"
          />

          <TextArea
            type="text"
            placeHolder="Longer input"
            value={values.longer_input}
            onChange={longer_input => setValues({ ...values, longer_input })}
            label="Longer input"
          />

          <PlacesAutocomplete
            value={values.address || ""}
            onChange={address => setValues({ ...values, address })}
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
                    placeholder: "Where are you from",
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

          <div className="popup__button medium-margin-top">
            <button type="submit" className="boxed-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { updateProfile })(UpdateProfile);
