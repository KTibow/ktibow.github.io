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
<img src="https://ktibow.github.io/classroom-logo.png" style="position: absolute; border-radius: 50%; height: 34px; top: -7px; left: -20px;" alt="Share to Google Classroom">
<span style="padding: 5px 8px 5px 24px; background-color: green; border-radius: 6px; color: white; font-family: Open Sans;">Google Classroom share</span>
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
