(function(d){function c(c){b.style.fontFamily=c;e.appendChild(b);f=b.clientWidth;e.removeChild(b);return f}var f,e=d.body,b=d.createElement("span");b.innerHTML=Array(100).join("wi");b.style.cssText=["position:absolute","width:auto","font-size:128px","left:-99999px"].join(" !important;");var g=c("monospace"),h=c("serif"),k=c("sans-serif"),X=c("Arial");window.isFontAvailable=function(b){return g!==c(b+",monospace")||k!==c(b+",sans-serif")||h!==c(b+",serif")||X!==c(b+",Arial")}})(document);
if (!isFontAvailable("Open Sans")) {
	var newFont = document.createElement('link');
	newFont.rel = 'stylesheet';
	newFont.href = 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap';
	document.getElementsByTagName('head')[0].appendChild(newFont);
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
		this.innerHTML = `<a href="${mySharePage}" style="text-decoration: none; display: inline-block; margin: 22px 10px 15px 29px; position: relative;">
<img src="https://ktibow.github.io/classroom-logo.png" style="position: absolute; border-radius: 50%; height: 34px; top: -7px; left: -20px;" alt="Share to Google Classroom">
<span style="padding: 5px 8px 5px 24px; background-color: green; border-radius: 6px; color: white; font-family: Open Sans;">Google Classroom share</span>
</a>`;
		this.onmouseenter = function() {
			this.style.filter = "brightness(90%)";
		}
		this.onmouseleave = function() {
			this.style.filter = "brightness(100%)";
		}
	}
}
customElements.define("gclass-share", ClassroomShare);
