/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

let weatherUrl = "//api.openweathermap.org/data/2.5/";
let weatherImageUrl = "https://openweathermap.org/img/w/";

let weatherParams = {
  appid: "84e878d22eb1e9c8651d019cdf9a8c0c",
  units: "metric"
};


// ------------------------------ //


function getOpenWeather(serviceName, params, callback, scope) {
  
  $.ajax({
    url: weatherUrl + serviceName,
    data: $.extend(params, weatherParams),
    cache: false,
  }).done(function(data, textStatus, jqXHR) {
      if (callback) {
        callback.call(scope || this, true, data);
      }
  }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log("getOpenWeather: fail! [" + errorThrown + "]");
      
      if (callback) {
        callback.call(scope || this, false, errorThrown);
      }
  });
}

function getWeather16Day(location, callback, scope) {
  getOpenWeather("forecast/daily", {q: location, cnt: 16}, callback, scope);
}