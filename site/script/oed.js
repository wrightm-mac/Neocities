/*












*/

let oedBaseUrl = "https://od-api.oxforddictionaries.com/api/v1/"

let oedBaseParams = {
  //Accept: "application/json",
  app_id: "811b0d64",
  app_key: "dda907c10dd5e9657251f81962379ae2",
};

function getOedDefinition(word, callback, scope) {
  
  var endpoint = oedBaseUrl + "entries/en/" + word;
    
  console.log("getOedDefinition [endpoint=" + endpoint + "]");
  
  $.ajax({
    url: endpoint,
    method: "GET",
    dataType: "jsonp",
    crossDomain: true,
    headers: {
      Accept: "application/json",
      app_id: "811b0d64",
      app_key: "dda907c10dd5e9657251f81962379ae2",
    },
    cache: false,
  }).done(function(data, textStatus, jqXHR) {
      console.log("getOedDefinition: done [" + data + "]");
      
      if (callback) {
        callback.call(scope || this, true, data);
      }
  }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log("getOedDefinition: fail [" + errorThrown + "]");
      
      if (callback) {
        callback.call(scope || this, false, errorThrown);
      }
  });
 }


$(function() {
  console.log("oed loaded!");
  
  $("#oedSearch").click(function() {
    
    let oedInput = $("#oedInput").val();
    
    console.log("oed [search=" + oedInput + "]");
    
    getOedDefinition(oedInput, function(success, data) {
      console.log("oed [success=" + success + "][data=" + data + "]");
    
    });
  });
});