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
class ClassroomShare extends HTMLElement {
	constructor() {
		super();
  }
	connectedCallback() {
		var currentPage = window.location;
		var myAttributes = Array.from(this.attributes);
		var mySharePage = "https://accounts.google.com/AccountChooser?continue=https%3A%2F%2Fclassroom.google.com%2Fshare%3Furl%3D"+currentPage;
		var attr;
		for (attr in myAttributes) {
			mySharePage += "%26"+encodeURIComponent(myAttributes[attr].name)+"%3D"+encodeURIComponent(myAttributes[attr].value)
		}
		this.innerHTML = `<a href="${mySharePage}" style="text-decoration: none; display: inline-block; margin: 35px 10px 20px 32px; position: relative;">
<img src="https://ktibow.github.io/classroom-logo.png" style="position: absolute; border-radius: 50%; height: 34px; top: -7px; left: -20px;" alt="">
<span style="padding: 5px 8px 5px 24px; background-color: green; border-radius: 6px; color: white; font-family: Open Sans;">Share to Google Classroom</span>
</a>`;
		this.onmouseenter = function() {
			this.style.filter = "brightness(92%)";
		}
		this.onmouseleave = function() {
			this.style.filter = "brightness(100%)";
		}
	}
}
customElements.define("gclass-share", ClassroomShare);
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
  if (document.getElementById("googwarn") == null) {
    var gawarn = document.createElement("div");
    gawarn.style.position = "sticky";
    gawarn.style.bottom = "0";
    gawarn.style.textAlign = "center";
    gawarn.style.backgroundColor = "rgba(240, 240, 240, 0.9)";
    gawarn.style.borderRadius = "6px";
    gawarn.style.padding = "4px";
    gawarn.style.margin = "3px";
    gawarn.style.fontSize = "0.9em";
    gawarn.id = "googwarn";
    gawarn.innerHTML = `<p>We (Or I guess me) use Google Analytics: <a href="https://www.google.com/policies/privacy/partners/">Google partner data use</a> | <a href="https://policies.google.com/privacy">Google privacy policy</a> | <a href="https://optout.aboutads.info/">Personalized ads opt-out</a> | <a href="https://myaccount.google.com/data-and-personalization">Google account data opt-out</a> | <a href="https://privacybadger.org/">Install EFF Privacy Badger to block analytics</a><button onClick="setCookie('cookieclose', 'yes', 365);" style="border-radius: 3px; background-color: white; margin: 10px; cursor: pointer; border-color: green; padding: 1px 4px; border-style: solid; color: green;">Close</button></p>`;
    document.getElementsByTagName('body')[0].appendChild(gawarn);
  }
  setInterval(cookcheck, 200);
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
   var sansall = document.createElement('style');
   sansall.innerHTML = `* {
font-family: Open Sans, Arial, sans-serif;
}`;
   document.getElementsByTagName('head')[0].appendChild(sansall);
  }
  var anny = document.createElement("script");
  anny.async = true;
  anny.src = "https://ktibow.github.io/analyze/ana.js";
  document.getElementsByTagName('head')[0].appendChild(anny);
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
    console.log("copied_"+selection.slice(0, 15)+"_on_"+document.location.href);
    gtag("event", "copied_"+selection.slice(0, 15)+"_on_"+document.location.href);
  }
  document.oncopy = addLink;
  
}
window.addEventListener("load", loadDataStuff);
