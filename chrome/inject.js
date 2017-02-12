'use strict';

var url = 'https://facebook-poetry.gomix.me/';

var serverRespJson;
function getHtmlToInsert(url,callback){
  var req=new XMLHttpRequest();
  req.open("GET",url,true);
  req.onreadystatechange=function(){
    if(req.readyState !== 4 || req.status !== 200){
      return;
    }

    if (req.responseText !== null && req.responseText !== "") {
      serverRespJson = JSON.parse(req.responseText);
      if (callback) {
        callback();
      }
    } else {
      console.log("Error loading poetry from server.");
    }
  };
  req.send();
}

if (window.location.href === "https://www.facebook.com/" || window.location.href.substring(0, 26) === "https://www.facebook.com/?") {
    getHtmlToInsert(url, function() {
        var s = document.createElement('script');
        s.dataset.htmlToInsert = serverRespJson.html;
        s.src = chrome.extension.getURL('main.js');
        s.onload = function() {
          this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
    });
}
