const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
      ${encodeURIComponent(address)} 
      .json?access_token=pk.eyJ1IjoiYmhzcmFtcGFnZSIsImEiOiJja29qeXhwbGswYmRqMnZsOHFqejluZnljIn0.UpdLazgbxv2X8yGARhh-Vw&limit=1`;

  request({ url, json: true }, (error, { body: response } = {}) => {
    if (error) {
      console.log("Error has Occured");
      callback("Unable to connect to location services", undefined);
    } else if (response.features.length === 0) {
      callback("Unable to find location try another search", undefined);
    } else {
      //console.log(response.features[0]);
      callback(undefined, {
        latitude: response.features[0].center[1],
        longitude: response.features[0].center[0],
        location: response.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
