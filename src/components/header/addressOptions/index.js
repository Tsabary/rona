import React, { useContext, useState} from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import { AuthContext } from "../../../providers/Auth";

export default () => {

  const { setCurrentUserProfile, currentUserProfile } = useContext(AuthContext);
  const [profileAddress, setProfileAddress] = useState(null);

  const handleSelect = address => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
       setCurrentUserProfile({address: {text: address, latLng} ,...currentUserProfile});
    })
  }

  if (!currentUserProfile) return null; // show nothing when not authenticated

  return (
    <div className="address-options">
        <PlacesAutocomplete
              value={profileAddress || ""}
              onChange={addr => setProfileAddress(addr)}
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
  );
};
