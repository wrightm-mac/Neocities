/*















*/

let transportApiBaseUrl = "https://transportapi.com/v3/uk/";

let transportApiParams = {
  app_id: "ebb8b4d3",
  app_key: "ade6f42571e03f5b26302a3b3214bbbe"
};


let transportServices = {
  places: function(values) {
    return "places.json"
  },
  
  station: function(values) {
    return "train/station/" + values.station_code + "/live.json";
  },
  
  journey: function(values) {
    return "public/journey/from/" + values.from + "/to/" + values.to + ".json";
  }
};


// -------------------------------------------------- //


function rawTransportSearch(url, params, callback, scope) {
  $.ajax({
    url: url,
    data: $.extend(params, transportApiParams),
    cache: false,
    crossDomain: true,
  }).done(function(data, textStatus, jqXHR) {
      if (callback) {
        callback.call(scope || this, true, data);
      }
  }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log("searchEventful: fail! [" + errorThrown + "]");
      
      if (callback) {
        callback.call(scope || this, false, errorThrown);
      }
  });
}

function searchTransport(serviceName, params, callback, scope) {
  rawTransportSearch(transportApiBaseUrl + transportServices[serviceName](params), params, callback, scope);
}

/**
  Get all stations that match the given station name.
  
  Only places that have a 'station_code' field are considered
  to be stations.
*/
function getTrainStations(stationName, callback, scope) {
  searchTransport("places", {query: stationName}, function(success, data) {
    if (success) {
      callback.call(scope || this, true, $.where(data.member, function(place) { return place.station_code; }));
    }
    else {
      callback.call(scope || this, false);
    }
  });
}

/**
  Iterates through all stations that match the given name.
  
  Only places that have a 'station_code' field are considered
  to be stations.
*/
function eachTrainStation(stationName, callback, scope) {
  let stations = getTrainStations(stationName, function(success, stations) {
    if (success) {
      $.each(stations, function(index, station) {
        callback.call(scope || this, true, station);
      });
    }
    else {
      callback.call(scope || this, false);
    }
  });
}


/**
  Gets departures from a station identified by 'station code'.
  
*/
function getTrainDeparturesByCode(stationCode, callback, scope) {
  searchTransport("station", {station_code: stationCode, to_offset: "PT12:00:00"}, function(success, departures) {
    if (success) {
      callback.call(scope || this, true, departures);
    }
    else {
      callback.call(scope || this, false);
    }
  });
}

/**
  Format the coordinates for a location.
  
*/
function getLocationCoordinateString(location) {
  if (location.longitude && location.latitude) {
    return "lonlat:" + location.longitude + "," + location.latitude;
  }
}

/**
  Format the coordinates for a location.
  
*/
function getLocationDisplayName(location) {
  var displayName;

  if (location.description) {
    displayName = location.description;
  }
  if (location.name) {
    displayName = (displayName ? (displayName + " - ") : "") + location.name;
  }
  
  return displayName;
}


// -------------------------------------------------- //



$(function() {
  console.log("transportapi!");
  
});