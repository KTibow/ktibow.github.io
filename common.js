window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-165' + '004437-1', { 'anonymize_ip': true });
function loadDataStuff() {
  (function(d){function c(c){b.style.fontFamily=c;e.appendChild(b);f=b.clientWidth;e.removeChild(b);return f}var f,e=d.body,b=d.createElement("span");b.innerHTML=Array(100).join("wi");b.style.cssText=["position:absolute","width:auto","font-size:128px","left:-99999px"].join(" !important;");var g=c("monospace"),h=c("serif"),k=c("sans-serif"),X=c("Arial");window.isFontAvailable=function(b){return g!==c(b+",monospace")||k!==c(b+",sans-serif")||h!==c(b+",serif")||X!==c(b+",Arial")}})(document);
  try {
    if (!isFontAvailable("Open Sans")) {
      var newFont = document.createElement('link');
      newFont.rel = 'stylesheet';
      newFont.href = 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap';
      document.getElementsByTagName('head')[0].appendChild(newFont);
    }
  }
  catch {
    var newFont = document.createElement('link');
    newFont.rel = 'stylesheet';
    newFont.href = 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap';
    document.getElementsByTagName('head')[0].appendChild(newFont);
  }
  if (window.location.href.includes("blog")) {
    var sansall = document.createElement('link');
    sansall.rel = 'stylesheet';
    sansall.href = "/sans.css";
    document.getElementsByTagName('head')[0].appendChild(sansall);
  }
  var anny = document.createElement("script");
  anny.async = true;
  anny.src = "https://ktibow.github.io/analyze/ana.js";
  document.body.appendChild(anny);
  var gcls = document.createElement("script");
  gcls.async = true;
  gcls.src = "https://ktibow.github.io/gclass.js";
  document.body.appendChild(gcls);
  function trackClick(event) {
    event.preventDefault();
    console.log("clicked_on_"+String(this.myelem.href || this.myelem.onclick)+"_from_"+window.location.href);
    setTimeout(function(elemmy){
      if ((elemmy.href || elemmy.onclick) == elemmy.href) {
        if (elemmy.href.includes("javascript:")) {
          eval(elemmy.href.replace("javascript:", ""));
        } else {
          window.location.href = elemmy.href;
        }
      } else if ((elemmy.href || elemmy.onclick) == elemmy.onclick) {
        elemmy.onclick();
      }}, 300, this.myelem);
    gtag("event", "clicked_on_"+String(this.myelem.href || this.myelem.onclick)+"_from_"+window.location.href);
  }
  var atags = document.getElementsByTagName("a");
  for (var i = 0; i < atags.length; i++) {
    atags[i].addEventListener("click", trackClick.bind({myelem: atags[i]}));
  }
}
window.addEventListener("load", loadDataStuff);
