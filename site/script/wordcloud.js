/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
 




var allWords = "quisque consectetur eget quam ac maximus nulla blandit dui ut vehicula consequat etiam quis leo eget tellus tristique placerat donec et rhoncus risus cras arcu nisi elementum in congue id dictum bibendum felis vivamus pharetra in nibh id congue duis ullamcorper odio sit amet ligula volutpat fermentum nullam sed vestibulum justo quis consectetur quam pellentesque pretium nunc a diam feugia non tempor eros tincidunt duis lacinia egestas viverra Fusce sit amet tempus purus pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas fusce maximus urna in nisl commodo faucibus tincidunt augue ornare curabitur scelerisque massa non arcu varius at cursus leo lacinia Donec hendrerit nunc eu elementum sodales dui lorem scelerisque leo nec cursus risus leo eu metus phasellus luctus lectus porta dignissim tellus a dapibus ex nulla accumsan ligula quis ligula bibendum hendrerit duis ac rhoncus diam in viverra lorem quisque sed rhoncus ante at eleifend lacus duis et consectetur odio eu luctus nunc donec suscipit mattis volutpat Ccrabitur ut placerat velit In in est non elit blandit mollis integer sed est euismod dictum nisl id auctor mauris vivamus blandit sapien sed arcu varius sit amet ornare risus venenatis proin in tincidunt nisl morbi in sapien eu mauris tincidunt fermentum nec eget lorem vivamus a nibh a erat gravida lobortis sit amet nec nulla nunc cursus mi nulla ac fringilla orci luctus sed nulla euismod neque commodo lectus tincidunt iaculis nam nec maximus lectus maecenas vitae iaculis mauris cras nisi orci pellentesque id purus vitae consequat accumsan diam mauris nulla odio placerat quis dictum ac sagittis et tellus nunc ultricies odio at lectus vehicula eleifend varius nibh ultricies";


function splitWords() {
  var distribution = [];
    
  var split = allWords.split(" ");
  for (var index = 0; index < split.length; index++) {
    
    distribution[index] = {
      word: split[index],
      factor: Math.floor(Math.random() * 100)
    };
  }
  
  return distribution;
}

function doWordCloud(target) {
  var words = splitWords();
  
  for (var index = 0; index < words.length; ++index) {
    var item = words[index];
    
    var span = $("<span></span>").text(item.word + " ");
    span.css("cursor", "pointer")
        .css("font-size", 30 + (item.factor * 3) + "%" )
        .css("margin", "3px")
        .mouseenter(function(element, a, b, c) {
          console.log("mouse-enter [" + $(this).html() + "]");
        })
        .mouseleave(function(element) {
          console.log("mouse-leave [" + $(this).html() + "]");
        });
    
    span.info = item;
    
    target.append(span);
  }
}
