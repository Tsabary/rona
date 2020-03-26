import React from "react";
import Highlighter from "react-highlight-words";

export const MyHighlight = ({ body, items, style }) => {
  return (
    <div className={style}>
      <Highlighter
        searchWords={[
          "burning man",
          "burning ban’s",
          "Black Rock City",
          "frothin’ Weirdo",
          "frothin’ Weirdos",
          "frothin’",
          "weirdos",
          "frothers",
          "leave no trace",
          "leave no trace!",
          ...items
        ]}
        autoEscape={true}
        textToHighlight={body}
        highlightClassName="bold-700"
        highlightStyle={{ backgroundColor: "transparent" }}
      />
    </div>
  );
};

export const multipleParagraphs = (array, style) => {
  return array.map(paragraph => {
    return (
      <MyHighlight
      key={paragraph.body}
        body={paragraph.body}
        items={paragraph.items}
        style={style}
      />
    );
  });
};


export const addLineBreaks = string =>
  string.split("|").map((text, index) => (
    <div key={`${text}-${index}`}>
      {text}
      <br />
    </div>
  ));
 // calculate distance between two geopoints
 function calcDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  export function calcGeoDistance(post ,cb) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({coords:{latitude: lat, longitude:lng}}) => {
        cb(calcDistance(lat, lng, post._geoloc.lat, post._geoloc.lng, 'K').toFixed(1));
      })
    } else {
      cb(0);
    }
  }