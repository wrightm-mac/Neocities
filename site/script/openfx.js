/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

 
let openExchangeBaseUrl = " https://openexchangerates.org/api/";
let openExchangeServiceId = "c59bdb29598649a98ee9e14c755315b5";
 
 
function getOpenExchangeData(endpoint, params, callback, scope) {
   
  $.ajax({
    url: openExchangeBaseUrl + endpoint,
    dataType: "jsonp",
    crossDomain: true,
    data: $.extend(params || {}, {
      app_id: openExchangeServiceId,
      prettyprint: false,
      show_alternative: false
    }),
    cache: false,
  }).done(function(data, textStatus, jqXHR) {
      console.log("getOpenExchangeData: done [" + data + "]");
      
      if (callback) {
        callback.call(scope || this, true, data);
      }
  }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log("getOpenExchangeData: fail [" + errorThrown + "]");
      
      if (callback) {
        callback.call(scope || this, false, errorThrown);
      }
  });
 }
  
  function getOpenExchangeRates(currency, callback, scope) {
    getOpenExchangeData("latest.json", {base: currency || "USD"}, callback, scope);
  }
  
  function getOpenExchangeHistory(currency, callback, scope) {
    let now = new Date();
    now.setDate(now.getDate() - 7);
    let prevWeekIso = now.toISOString().substring(0, 10);

    getOpenExchangeData("historical/" + prevWeekIso + ".json", {base: currency || "USD"}, callback, scope);
  }
  
  function getOpenExchangeCurrencies(callback, scope) {
    getOpenExchangeData("currencies.json", null, callback, scope);
  }
  
  function getOpenExchangeUsage(callback, scope) {
    getOpenExchangeData("usage.json", null, callback, scope);
  }
 
 
  $(function() {
    $("#fxButton").click(function() {
      console.log("fx button clicked!");
    });
      
    getOpenExchangeRates("USD", function(success, dataRates) {
     console.log("fx-rates [success=" + success + "][data=" + dataRates + "]");

      if (success) {
        getOpenExchangeCurrencies(function(success, dataCurrencies) {
          console.log("fx-currencies [success=" + success + "][data=" + dataCurrencies + "]");
          
          if (success) {
            let $fxTable = $("#fxCurrencies");
            var row = 0;
            for (let symbol in dataRates.rates) {
              let $currencyRow = $("<tr></tr>")
              $currencyRow.append("<td class='currencySymbol'>" + symbol + "</td>");
              $currencyRow.append("<td class='currencyName'>" + dataCurrencies[symbol] + "<div id='info' style='display:none;'></div>" + "</td>");
              $currencyRow.append("<td class='currencyRate'>" + + dataRates.rates[symbol] + "</td>");
              
              $currencyRow.attr("id", "currency_" + symbol);
              $currencyRow.attr("class", (row++ % 2) == 0 ? "currencyRowEven" : "currencyRowOdd");
              $currencyRow.data("symbol", symbol);
              $currencyRow.click(function(event) {
                let symbol = $(this).data("symbol");
                
                console.log("clicked [data=" + symbol + "]" );
                let $info = $(this).find("#info");
                $info.toggle();
                
                getOpenExchangeHistory("USD", function(success, dataHistory) {
                  console.log("history [success=" + success + "]");
                  let historyRate = dataHistory.rates[symbol];
                  $info.append("<div> historical: " + historyRate + "</div>");
                });
              })
              
              $fxTable.append($currencyRow);
            }
            
            $fxTable.show();
          }
        });
      }
    });
    
    getOpenExchangeUsage(function(success, usage) {
      if (success) {
        let $fxUsageTable = $("#fxServiceUsage");
        $fxUsageTable.append("<tr><td class='currencyServiceUsageName'>Plan</td><td>" + usage.data.plan.name + "</td></tr>)");
        $fxUsageTable.append("<tr><td class='currencyServiceUsageName'>Quota</td><td>" + usage.data.plan.quota + "</td></tr>)");
        $fxUsageTable.append("<tr><td class='currencyServiceUsageName'>Updates</td><td>" + usage.data.plan.update_frequency + "</td></tr>)");
        $fxUsageTable.append("<tr><td class='currencyServiceUsageName'>Requests</td><td>"
                                                                            + usage.data.usage.requests + " / "
                                                                            + usage.data.usage.requests_quota
                                                                            + "</td></tr>)");
        $fxUsageTable.append("<tr><td class='currencyServiceUsageName'>Remaining</td><td>"
                                                                            + usage.data.usage.requests_remaining
                                                                            + "</td></tr>)");
        $fxUsageTable.append("<tr><td class='currencyServiceUsageName'>Daily Average</td><td>" + usage.data.usage.daily_average + "</td></tr>)");
        $fxUsageTable.append("<tr><td class='currencyServiceUsageName'>Days Elapsed</td><td>" + usage.data.usage.days_elapsed + "</td></tr>)");
        $fxUsageTable.append("<tr><td class='currencyServiceUsageName'>Days Remaining</td><td>" + usage.data.usage.days_remaining + "</td></tr>)");
        
        $fxUsageTable.show();
      }
    });
  });