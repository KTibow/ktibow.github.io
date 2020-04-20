var newFont = document.createElement('link');
newFont.rel = 'stylesheet';
newFont.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
document.getElementsByTagName('head')[0].appendChild(newFont);
class ClassroomShare extends HTMLElement {
	constructor() {
		super();
  }
	connectedCallback() {
		var currentPage = window.location;
		var myAttributes = Array.from(this.attributes);
		var mySharePage = "https://accounts.google.com/AccountChooser?continue=https%3A%2F%2Fclassroom.google.com%2Fshare%3Furl%3D"+currentPage;
		for (attr in myAttributes) {
			console.log(myAttributes[attr]);
		}
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
customElements.define("gclass-share", ClassroomShare);
