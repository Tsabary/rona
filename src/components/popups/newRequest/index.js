import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";

import { useToasts } from 'react-toast-notifications'
import firebase from "firebase";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { AuthContext } from "../../../providers/Auth";

import { newRequest } from "../../../actions";

import InputField from "../../formComponents/inputField";
import TextArea from "../../formComponents/textArea";
import IconOption from "../../formComponents/iconOption";

const NewRequest = ({ newRequest }) => {
  const [values, setValues] = useState({});
  const { currentUserProfile, currentUser } = useContext(AuthContext);
  const [address, setAddress] = useState(null);
  const { addToast } = useToasts();
  useEffect(() => {
    if (!!currentUserProfile) {
      setValues({
        user_ID: currentUserProfile.uid,
        user_name: currentUserProfile.name,
        user_avatar: currentUserProfile.avatar,
        address_text: currentUserProfile.address_text,
        address_coords: currentUserProfile.address_coords,
        phone_number: currentUserProfile.phone_number
      });
      if (currentUserProfile.address_text)
        setAddress(currentUserProfile.address_text);
    }
  }, [currentUserProfile]);

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

  return (
    <div className="popup" id="new-request">
 
        <div className="popup__container">
          <a className="popup__close" href="#">
            <div />
          Close
        </a>
          <div className="popup__title">Make a Request</div>
          <form
            onSubmit={() =>
              newRequest(values, () => {
                addToast('בקשה נשלחה', {
                  appearance: 'success',
                  autoDismiss: true,
                })
                setValues({ ...values, title: "", body: "" })
              })
            }
          >
            I need help with:
          <InputField
              type="text"
              placeHolder="Title"
              value={values.title}
              onChange={title => setValues({ ...values, title })}
              label="Title"
            />

            <TextArea
              type="text"
              placeHolder="Can you add some more details that will help others wanting to assist?"
              value={values.body}
              onChange={body => setValues({ ...values, body })}
              label="Extra details"
            />

            <InputField
              type="text"
              placeHolder="First name"
              value={values.user_name}
              onChange={user_name => setValues({ ...values, user_name })}
              label="First name"
            />

            <div className="small-margin-bottom">
              <PlacesAutocomplete
                value={address || ""}
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
              label="Phone Number"
            />



            <div className="popup__button medium-margin-top">
              <button type="submit" className="boxed-button">
                שליחה
            </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default connect(null, { newRequest })(NewRequest);
