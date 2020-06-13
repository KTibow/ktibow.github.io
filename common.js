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
  var evnt = document.createElement("script");
  evnt.async = false;
  evnt.src = "https://cdn.jsdelivr.net/gh/colxi/getEventListeners/src/getEventListeners.min.js";
  document.body.appendChild(evnt);
  function trackClick(event) {
    event.preventDefault();
    console.log("clicked_on_"+String(this.myelem.href || this.myelem.onclick)+"_from_"+window.location.href);
    setTimeout(function(listy, elemmy) {
      var me = listy;
      console.log(listy);
      elemmy.removeEventListener("click", listy);
      setTimeout(function(elemmy) {
        elemmy.click();
      }, 50, elemmy);
    }, 250, this, this.myelem);
    gtag("event", "clicked_on_"+String(this.myelem.href || this.myelem.onclick)+"_from_"+window.location.href);
  }
  var atags = document.getElementsByTagName("a");
  for (var i = 0; i < atags.length; i++) {
    atags[i].addEventListener("click", trackClick.bind({myelem: atags[i]}));
  }
  function addLink() {
    var body_element = document.getElementsByTagName('body')[0];
    var selection;
    selection = window.getSelection();
    if (selection.toString().length > 50) {
      var pagelink = "<br /><br /> Read more at: <a href='"+document.location.href+"'>"+document.location.href+"</a><br /> (&copy; Kendell R. You have permission to use, copy, publish, and distribute this with clear attribution, to the extent allowed by law.)";
    } else {
      var pagelink = "";
    }
    var copytext = selection + pagelink;
    var newdiv = document.createElement('div');
    newdiv.style.position='absolute';
    newdiv.style.left='-99999px';
    body_element.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);
    window.setTimeout(function() {
      body_element.removeChild(newdiv);
    },0);
  }
  document.oncopy = addLink;
}
window.addEventListener("load", loadDataStuff);
