/*




*/


function getAllCategories(callback) {
  $.getJSON({
    url: "model/category.js",
    dataType: "json",
    success: function(data) {
      console.log("categories: success!");
      
      if (callback) {
        callback(true, data);
      }
    }
  }).fail(function(error) {
    console.log("categories: error!");
    
    if (callback) {
      callback(false, error);
    }
  });
}