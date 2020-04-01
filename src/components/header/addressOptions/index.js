import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { changeAddress } from "../../../actions";
import { connect } from "react-redux";

const AddressOptions = ({ address, changeAddress }) => {
  const [locAddr, setLocAddr] = useState('');

  useEffect(() => {
    setLocAddr(address.text);
  }, [address]);

  const handleSelect = addressText => {
    geocodeByAddress(addressText)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        changeAddress({
          text: addressText,
          coords: [latLng.lat, latLng.lng]
        });
      });
  };

  return (
    <div className="address-options">
      <PlacesAutocomplete
        value={locAddr}
        onChange={addr => setLocAddr(addr)}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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

const mapStateToProps = state => {
  return {
    address: state.address
  };
};

export default connect(mapStateToProps, { changeAddress })(AddressOptions);
