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
		this.innerHTML = "<a href=\"https://accounts.google.com/SignOutOptions?hl=en&amp;continue=https://classroom.google.com/u/0/share%3Furl"+currentPage+"\" style=\"text-decoration: none; display: inline-block; margin: 10px 5px 10px 24px; position: relative;\"><img src=\"https://ktibow.github.io/classroom-logo.png\" style=\"position: absolute; border-radius: 50%; height: 32px; top: -6px; left: -18px;\"> <span style=\"padding: 3px 6px 3px 22px; background-color: green; border-radius: 3px; color: white; font-family: Open Sans;\">Share to Classroom</span></a>";
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
