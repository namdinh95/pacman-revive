const PACMAN_LENGTH = 2;

function replacePacman() {
  var elements = document.getElementsByClassName('fbNubGroup clearfix videoCallEnabled')[0].getElementsByTagName("*");

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) { // Check text node type
        var text = node.nodeValue;
        if (text.search(":v") !== -1) {
          var newNode = document.createElement("span");

          // Keep trimming for pacman and add to new node
          var subText = text;
          while (subText.length !== 0) {
            // Append the rest of text if no pacman found
            if (subText.search(":v") === -1) {
              newNode.appendChild(document.createTextNode(subText));
              subText = "";
            }
            else {
              // Trim string until pacman
              var pacmanPos = subText.search(":v");
              var tempText = subText.slice(0, pacmanPos);

              // Add to new node
              var textSpan = document.createElement("span");
              textSpan.appendChild(document.createTextNode(tempText));
              newNode.appendChild(textSpan);

              var pacmanNode = createPacmanNode();
              newNode.appendChild(pacmanNode);

              // Update subtext for next pacman search
              var newPos = pacmanPos + PACMAN_LENGTH;
              subText = subText.slice(newPos, subText.length);
            }
          }
          // Replace original text with emoticon-ed text
          element.replaceChild(newNode, node);
        }
      }
    }
  }
}

function createPacmanNode() {
  var firstSpan = document.createElement("span");
  firstSpan.setAttribute("title", "pacman emoticon");
  firstSpan.setAttribute("class", "_lew");
  var firstChildSpan = document.createElement("span");
  firstChildSpan.setAttribute("class", "emoticon emoticon_pacman");
  firstChildSpan.setAttribute("aria-hidden", "true");
  var secondChildSpan = document.createElement("span");
  secondChildSpan.setAttribute("class", "_4mcd");
  secondChildSpan.setAttribute("aria-hidden", "true");
  secondChildSpan.appendChild(document.createTextNode("pacman"));

  firstSpan.appendChild(firstChildSpan);
  firstSpan.appendChild(secondChildSpan);

  return firstSpan;
}

/* Pacman Emoticon here
   <span title="pacman emoticon" class="_lew"><span class="emoticon emoticon_pacman" aria-hidden="true"></span><span class="_4mcd" aria-hidden="true">pacman</span></span>
   */

// Observe DOM for change aka incoming messages and loading of old ones
var observeDOM = (function() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function(obj, callback) {
    // define new observer
    var obs = new MutationObserver(function(mutations, observer) {
      if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
        callback();
    });
    // let the observer observe DOM obj for changes in children
    obs.observe(obj, {childList: true, subtree: true});
  }
})();

// Observe DOM for change to update replacement
observeDOM(document, replacePacman);
