var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
document.getElementsByTagName('head')[0].appendChild(newScript);
class ClassroomShare extends HTMLElement {
	constructor() {
		super();
  }
	connectedCallback() {
		var currentPage = window.location;
		var myAttributes = Array.from(this.attributes);
		var attr;
		for (attr in myAttributes) {
			console.log(attr);
		}
		var mySharePage = "https://accounts.google.com/AccountChooser?continue=https%3A%2F%2Fclassroom.google.com%2Fshare%3Furl%3D"+currentPage;
		this.innerHTML = `<a href="${mySharePage}" style="text-decoration: none; display: inline-block; margin: 17px 5px 10px 24px; position: relative;">
<img src="https://ktibow.github.io/classroom-logo.png" style="position: absolute; border-radius: 50%; height: 32px; top: -6px; left: -18px;">
<span style="padding: 3px 6px 3px 22px; background-color: green; border-radius: 3px; color: white; font-family: Open Sans;">Share to Classroom</span>
</a>`;
		this.onmouseenter = function() {
			this.style.filter = "brightness(90%)";
		}
		this.onmouseleave = function() {
			this.style.filter = "brightness(100%)";
		}
	}
}
function start() {
onload = WebFont.load({
	google: {
			families: ['Open Sans']
		}
	});
customElements.define("gclass-share", ClassroomShare);
}
setTimeout(start, 300);
