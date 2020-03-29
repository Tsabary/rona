import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";

import { useToasts } from "react-toast-notifications";
import firebase from "firebase";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { AuthContext } from "../../../providers/Auth";

import { newRequest, togglePopup } from "../../../actions";

import InputField from "../../formComponents/inputField";
import TextArea from "../../formComponents/textArea";
import BoxedButton from "../../formComponents/boxedButton";


const NewRequest = ({ newRequest, togglePopup }) => {
  const [values, setValues] = useState({ title: "אני צריך עזרה ב" });

  const { currentUserProfile } = useContext(AuthContext);
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
        phone_number: currentUserProfile.phone_number,
        title: "אני צריך עזרה ב"
      });
      if (currentUserProfile.address_text)
        setAddress(currentUserProfile.address_text);
    }
  }, [currentUserProfile]);

  const handleSelect = address => {
    setValues({ ...values, address });
    setAddress(address);
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
        <a className="popup__close" href="#" onClick={togglePopup}>
          <div />
          סגירה
        </a>
        <div className="popup__title">בקשה חדשה</div>
        <form
          onSubmit={e => {
            if (!e.target.checkValidity()) {
              return;
            }

            newRequest(values, () => {
              addToast("בקשה נשלחה", {
                appearance: "success",
                autoDismiss: true
              });
              togglePopup()
              setValues({ ...values, title: "אני צריך עזרה עם", body: "" });
            });
          }}
        >
          <InputField
            type="text"
            placeHolder="כותרת"
            value={values.title}
            onChange={title => {
              if (title.length < 50) setValues({ ...values, title });
            }}
            label="כותרת"
            required={true}
          />
          <TextArea
            type="text"
            placeHolder="פרטים נוספים שיעזרו למסייעים להבין איך ניתן לעזור"
            value={values.body}
            onChange={body => {
              if (body.length < 300) setValues({ ...values, body });
            }}
            label="פרטים נוספים"
            required={true}
          />
          <InputField
            type="text"
            placeHolder="שם"
            value={values.user_name}
            onChange={user_name => setValues({ ...values, user_name })}
            label="שם"
            required={true}
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
                    required
                    {...getInputProps({
                      placeholder: "כתובת",
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
            placeHolder="טלפון"
            value={values.phone_number}
            onChange={phone_number => setValues({ ...values, phone_number })}
            label="טלפון"
            required={true}
            pattern={"[0-9]{10}"}
          />
          <div className="popup__button medium-margin-top">
            <BoxedButton>
              שליחה
            </BoxedButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { newRequest, togglePopup })(NewRequest);
