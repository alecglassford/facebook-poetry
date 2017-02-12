// Inject main.js onto page
// Comparison of options for injecting: http://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script/9517879#9517879
// Need to observe page change or else won't re-inject when hitting back button to feed from another fb page

var domain = '???';

var serverRespJson;
function getHtmlToInsert(url,callback){
  var req=new XMLHttpRequest();
  req.open("GET",url,true);
  req.withCredentials = true;
  req.onreadystatechange=function(){
    if(req.readyState!=4||req.status!=200){
      return;
    }

    if (req.responseText != null && req.responseText != "") {
      serverRespJson = JSON.parse(req.responseText);
      console.log("knk: obtained html to insert");
      if(callback){
        callback();
      }
    } else {
      console.log("knk: no response");
    }
  }
  req.send();
}

if (window.location.href == "https://www.facebook.com/" || window.location.href.substring(0, 26) == "https://www.facebook.com/?") {
    // getHtmlToInsert(url, function() {
        var s = document.createElement('script');
        s.dataset.htmlToInsert = '<div>Hello world</div>';//serverRespJson.html;
        s.src = chrome.extension.getURL('main.js');
        s.onload = function() {
          this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
    // });
}
