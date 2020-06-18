window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-165' + '004437-1', { 'anonymize_ip': true });
function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}
setTimeout(function() {
  var styl = document.createElement("style");
  styl.innerHTML = `.padlink {
  padding: 5px 6px;
  margin: 3px;
  display: block;
  font-size: 1.04em;
  }
  @media all and (orientation: portrait) {
  .padlink {
    border-radius: 3px;
    background-color: #D6D6EA;
    margin: 15px;
  }
  }`;
  (document.body || document.getElementsByTagName('body')[0]).appendChild(styl);
}, 250);
function loadDataStuff() {
  var sansvail = false;
  for (var li = 0; li < document.querySelectorAll("link").length; li++) {
    if (document.querySelectorAll("link")[li].href.includes("https://fonts.googleapis.com/css?family=Open+Sans")) {
      sansvail = true;
    }
  }
 if (!sansvail) {
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
    var event = "clicked_on_" + (this.myelem.href || "");
    if (this.myelem.onclick) {
      event += (("_" + this.myelem.onclick.toString()) || "");
    }
    event += (("_" + this.myelem.target) || "");
    event += "_from_"+window.location.href;
    console.log(event);
    gtag("event", event);
    wait(250);
  }
  var atags = document.getElementsByTagName("a");
  for (var i = 0; i < atags.length; i++) {
    atags[i].addEventListener("click", trackClick.bind({myelem: atags[i]}));
  }
  function addLink(ev) {
    var body_element = document.getElementsByTagName('body')[0];
    var selection;
    selection = window.getSelection();
    if (selection.toString().length > 100) {
      var pagelink = "<!--// From "+document.location.href+". © Kendell R. Do not remove this attribution notice (except in code), but you can make your own one as long as it has the source and \"© Kendell R.\"-->";
    } else {
      var pagelink = "";
    }
    var copytext = selection + pagelink;
    ev.clipboardData.setData('text/plain', copytext);
    ev.preventDefault();
  }
  document.oncopy = addLink;
}
window.addEventListener("load", loadDataStuff);
