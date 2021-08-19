const request = require("request");

const forecast = ({ latitude , longitude} = {}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=cbb7e843738a7ee4669ee7e2471c77c8&query=${latitude},${longitude}&units=f`;
  request({url, json: true }, (error, {body:response}) => {
    if (error) {
      callback("Unable to connect to weather api", undefined);
    } else if (response.error) {
      callback("Unable to find location", undefined);
    } else {
      const currdata = response.current;
      const msg = `${currdata.weather_descriptions[0]} .It is currently ${currdata.temperature} degrees farhenheit but it feels like it is ${currdata.feelslike}`;
      callback(undefined, msg);
    }
  });
};

module.exports = forecast;
