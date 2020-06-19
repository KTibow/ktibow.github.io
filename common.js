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
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function cookcheck() {
  if (getCookie("cookieclose") == "yes") {
    document.getElementById("googwarn").style.setProperty("display", "none", "important");
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
    background-color: ` + (window.location.href.includes("blog") ? "#D6D6EA;" : "#EEE;") + `
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
    console.log("copied_"+selection.slice(0, 10)+"_on_"+document.location.href);
    gtag("event", "copied_"+selection.slice(0, 10)+"_on_"+document.location.href);
  }
  document.oncopy = addLink;
  var gawarn = document.createElement("div");
  gawarn.style.position = "sticky";
  gawarn.style.bottom = "0";
  gawarn.style.textAlign = "center";
  gawarn.style.backgroundColor = "rgba(240, 240, 240, 0.9)";
  gawarn.style.borderRadius = "8px";
  gawarn.style.padding = "8px";
  gawarn.style.margin = "7px";
  gawarn.style.fontSize = "0.7em";
  gawarn.id = "googwarn";
  gawarn.innerHTML = `<p>We (Or I guess me) use Google Analytics: <a href="https://www.google.com/policies/privacy/partners/">Google partners data use</a> | <a href="https://policies.google.com/privacy">Full Google privacy policy</a> | <a href="https://optout.aboutads.info/">Opt out of personalized ads</a> | <a href="https://myaccount.google.com/data-and-personalization">Opt out of data use for your Google account</a> | <a href="https://privacybadger.org/">Install Privacy Badger from the EFF to block analytics</a><button onClick="setCookie('cookieclose', 'yes', 365);" style="border-radius: 3px; background-color: white; margin: 10px; cursor: pointer; border-color: green; padding: 1px 4px; border-style: solid; color: green;">Close</button></p>`;
  document.getElementsByTagName('body')[0].appendChild(gawarn);
  setInterval(cookcheck, 300);
}
window.addEventListener("load", loadDataStuff);
