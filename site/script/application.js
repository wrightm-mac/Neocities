/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


/**
  Add some stuff to jQuery top-level.
  
*/
$.extend({
  log: function(message, args) {
    console.log(message);
  },
  
  loadFragments: function(callback, scope) {
    
    $("[fragment]").each(function(index, element) {
      let $target = $(element);
      
      $target.load($target.attr("fragment"), null, function() {
        if (callback) {
          callback.call(scope || this, element);
        }
      });
    });
    
    return this;
  },
  
  map: function(array, callback, scope) {
    let mapped = [];
    
    if (array) {
      for (let index = 0; index < array.length; ++index) {
        let item = array[index];
        
        let mappedItem = callback.call(scope || this, item, index);
        if (mappedItem) {
          mapped.push(mappedItem);
        }
      }
    }
    
    return mapped;
  },
  
  where: function(array, callback, scope) {
    let matched = [];
    
    if (array) {
      for (let index = 0; index < array.length; ++index) {
        let item = array[index];
        
        if (callback.call(scope || this, item)) {
          matched.push(item);
        }
      }
    }
    
    return matched;
  },
  
  capitalise: function(banner) {
    return banner.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  },
  
  showWaiting: function() {
    if (! $("body .waitGraphic").exists()) {
      $("body").append("<div class='waitGraphic'></div>");
    }
  },
  
  hideWaiting: function() {
    $("body .waitGraphic").remove();
  },
  
  urlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  
  urlVar: function(name){
    return $.urlVars()[name];
  },
  
  table: function(template, dataset) {
    $(this).each(function(index, element) {
      $(element).table(template, dataset);
    });
  }
});


/**
  Add some stuff to jQuery selectors.
  
*/$.fn.extend({
  exists: function() {
    return this.length > 0;
  },
  
  showing: function() {
    return $(this).css("display") !== "none";
  },
  
  hiding: function() {
    return $(this).css("display") === "none";
  },
  
  toggle: function() {
    let $this = $(this);
    
    if ($this.showing()) {
      $this.hide();
    }
    else {
      $this.show();
    }
  },
  
  enterkey: function(callback) {
    $(this).keypress(function (even) {
      if (event.which == 13) {
        callback.call(this, event);
        return false;
      }
    });
  },
  
  appendTable: function(headerCells, cssClass) {
    let $table = $("<table></table>");
    if (cssClass) {
      $table.attr("class", cssClass);
    }
    
    if (headerCells) {
      let $headerRow = $("<tr></tr>");
      
      $.each(headerCells, function(index, cell) {
        let $cell = $("<th></th>");
        if (cell.cssClass) {
          $cell.attr("class", cell.cssClass);
        }
        if (cell.style) {
          $cell.attr("style", cell.style);
        }
        if (cell.colspan) {
          $cell.attr("colspan", cell.colspan);
        }
        if (cell.html) {
          $cell.html(cell.html);
        }
        
        $headerRow.append($cell);
      });
      
      $table.append($headerRow);
    }
    
    $(this).append($table);
    return $table;
  },
  
  appendRow: function(cells, cssClass) {
    let $this = $(this);
    
    let $row = $("<tr></tr>");
    if (cssClass) {
      $row.attr("class", cssClass);
    }

    $.each(cells, function(index, cell) {
      let $cell = $("<td></td>");
      if (cell.cssClass) {
        $cell.attr("class", cell.cssClass);
      }
      if (cell.style) {
        $cell.attr("style", cell.style);
      }
      if (cell.colspan) {
        $cell.attr("colspan", cell.colspan);
      }
      if (cell.html) {
        $cell.html(cell.html);
      }
      
      $row.append($cell);
    });
    
    $(this).append($row);
    
    return $row;
  },
  
  /**
    Appends a table to selected element.
    
    The table is constructed from a template, and populated from a
    dataset. The dataset is an array of objects. Each element/object
    in the array represents a row in the table. Each column in the
    table can be populated from a field of the row's object.
    
    Structure of the template -- most fields are optional:
    
      {
        id: "myTable",        // ID given to the table being created.
        css: ["one", "two"],  // Single string, or array of strings containing a css class.
        style: [{}],          // Single, or array, name/value pair of css style.
        header: {             // Header specifix settings.
          css: [],
          style: [{}],
          click: function() {},     // jQuery events for header -- scope is $element.
          dblclick: function() {},
          mouseenter: function() {},
          mouseleave: function() {}
        },
        row: {                // Settings for each (non-header) row.
          id: "",
          css: [],
          style: [{}],
          altcss: [],         // CSS to be applied to alternating rows of the table.
          altstyle: [{}],
          transform: function(rowdata, index) { return rowdata; }    // Called pre-column generation -- use to change structure of row  object.
          before: function(rowdata, index) {}   // Called for each row before any columns are created.
          after: function(row, index) {}        // Called for each row after all columns are created.
          click: function() {},                 // jQuery events for the row -- scope is $element.
          dblclick: function() {},
          mouseenter: function() {},
          mouseleave: function() {}
        },
        columns: [{           // Array of column definitions.
          header: {
            id: "",
            text: "Abc        // Column header text.
            css: [],          // CSS classes for column's header.
            style: [],        // CSS styles for column's header.
            hidden: false,    // Flag to indicate whether element is displayed -- defaults to false.
            click: function() {},       // jQuery events for the header -- scope is $element.
            dblclick: function() {},
            mouseenter: function() {},
            mouseleave: function() {}
          },
          html: "Pqr",            // HTML for the column. (Precedence -- html || text || tranform(data) || data)
          text: "Xyz",            // Text for the column.
          datafield: "FieldName", // Name of row object's field that contains the text for the column.
          hidden: false,          // Flag to indicate whether element is displayed -- defaults to false.
          transform: function(datafield, rowdata) { return datafield; }   // Data transformation function.
          before: function(rowdata, index) {}   // Called before the column is populated -- scope is $cell.
          after: function(rowdata, index) {}    // Called after the column is populated -- scope is $cell.
          click: function() {},       // jQuery events for the cell -- scope is $element.
          dblclick: function() {},
          mouseenter: function() {},
          mouseleave: function() {}
          panel: [{               // Single, or array of, panel to append to the cell.
            id: "",
            css: [],
            style: [{}],
            hidden: true || false,
          }],
          image: [{               // Single, or array of, image to append to the cell.
            id: "",
            css: [],
            style: [{}],
            hidden: true || false,
            path: "",             // Path to image.
            datafield: "",        // Field containing path to image.
            transform: function(datafield, rowdata) { return datafield},   // Path transformation function.
            click: function() {},       // jQuery events for the cell -- scope is $element.
            dblclick: function() {},
            mouseenter: function() {},
            mouseleave: function() {}
          }]
        }]
      }
  */
  table: function(template, dataset) {
    let $this = $(this);
    
    function forArray(values, callback) {
      if (values) {
        $.each(Array.isArray(values) ? values : [values], function(index, value) {
          callback(value);
        });
      }
    }
    
    function createCommon(html, template, useAltStyling) {
      let $element = $(html);

      if (template) {          
        forArray(useAltStyling ? template.altcss : template.css, function(css) { $element.addClass(css); });
        
        let styling = useAltStyling ? (template.altstyle || template.style) : template.style;
        if (styling) {
          if (typeof(styling) === "string") {
            $element.attr("style", styling);
          }
          else if (Array.isArray(styling)) {
            $.each(styling, function(index, item) {
              for (let name in item) {
                $element.css(name, item[name]);
              }
            });
          }
          else {
            $element.css(styling);
          }
        }
        if (template.id) { $element.attr("id", template.id); }
        if (template.hidden) { $element.css({display: "none"}); }
        if (template.colspan) { $element.attr("colspan", template.colspan); }
        if (template.title) { $element.attr("title", template.title); }
        
        if (template.click) { $element.click(template.click); }
        if (template.dblclick) { $element.click(template.dblclick); }
        if (template.mouseenter) { $element.click(template.mouseenter); }
        if (template.mouseleave) { $element.click(template.mouseleave); }
      }
      
      return $element;
    }
    
    function getElementData(element, template, rowdata, dataIndex, dataset) {
      var value;
      if (template.datafield) {
        if (typeof(template.datafield) === "string") {
          value = rowdata[template.datafield];
        }
        else if (Array.isArray(template.datafield)) {
          value = [];
          $.each(template.datafield, function(index, datafield) {
            value.push(rowdata[datafield]);
          });
        }
      }
      else {
        value = template.html || template.text;
      }
      
      if (template.transform) {
        value = template.transform.call(element, value, rowdata, dataIndex, dataset);
      }
      
      return value;
    }
    
    let rowTemplate = template.row || {};
    
    let $table = createCommon("<table></table>", template);
    let $headerRow = createCommon("<tr></tr>", template.header);
    
    $.each(dataset, function(dataIndex, data) {
      let $row = createCommon("<tr></tr>", rowTemplate, ((dataIndex % 2) === 0));
      $row.data("index", dataIndex);
      
      if (rowTemplate.transform) {
        data = rowTemplate.transform.call($row, data, dataIndex);
      }
      
      var addRow = true;
      if (rowTemplate && rowTemplate.before) {
        addRow = (rowTemplate.before.call($row, data, dataIndex, dataset) !== false);
      }
      
      if (addRow) {
        $.each(template.columns, function(columnIndex, column) {
          if (dataIndex === 0) {
            if (column.header) {
              let $headerCell = createCommon("<th></th>", column.header);
              $headerCell.html(column.header.html || column.header.text || "");
              $headerRow.append($headerCell);
            }
          }
          // end of header cell setup.
          
          let $cell = createCommon("<td></td>", column);
          
          if (column.before) {
            column.before.call($cell, data, dataIndex, dataset);
          }
          
          $cell.html(getElementData($cell, column, data, dataIndex, dataset));
          
          forArray((dataIndex % 2 === 0) ? rowTemplate.css : rowTemplate.altcss, function(css) { $cell.addClass(css); });
          
          forArray(column.panel, function(panel) {
            let $panel = createCommon("<div></div>", panel);
            $panel.html(panel.html || panel.text ||  "");
            $cell.append($panel);
          });
          
          forArray(column.link, function(link) {
            let $link = createCommon("<a></a>", link);
            let fields = getElementData($link, link, data, dataIndex, dataset);
            if (fields) {
              $link.html(fields[1]);
              $link.attr("href", fields[0]);
              $cell.append($link);
            }
          });
          
          forArray(column.image, function(image) {
            let $image = createCommon("<img></img>", image);
            let path = image.transform ? image.transform.call($image, image.path || data[image.datafield], data, dataIndex, dataset) : image.path;
            $image.attr("src", path);
            $image.html(image.html || image.text || "");
            $cell.append($image);
          });
  
          $row.append($cell);
          
          if (column.after) {
            column.after.call($cell, data, dataIndex, dataset);
          }
        });
        // end of column loop.
        
        if (rowTemplate && rowTemplate.after) {
          addRow = (rowTemplate.after.call($row, data, dataIndex, dataset) !== false);
        }
        
        if (addRow) {
          $table.append($row);
        }
      }
    });
    // end of dataset loop.
    
    if ($headerRow.find("th").exists()) {
      $table.prepend($headerRow);
    }
    
    $this.append($table);
    
    return $table;
  }
});

 
/**
  Ready.
  
*/
$(function() {

  // Load the contents of all fragments on the page...  
  $.loadFragments();
  
  // Show a graphic whilst waiting for ajax calls to finish...
  $(document)
    .ajaxStart(function () {
      $.showWaiting();
    })
    .ajaxStop(function () {
      $.hideWaiting();
    })
});
