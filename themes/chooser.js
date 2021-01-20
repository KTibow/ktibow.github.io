/* main.css */
var mainStyle = document.createElement("link");
mainStyle.rel = "stylesheet";
mainStyle.href = "/themes/main.css";
document.head.appendChild(mainStyle);
/* Base styling */
var baseStyle = document.createElement("link");
baseStyle.rel = "stylesheet";
baseStyle.href = "/themes/3d.css";
if (localStorage.getItem("theme") !== null) {
  baseStyle.href = `/themes/${localStorage.getItem("theme")}.css`;
}
document.head.appendChild(baseStyle);
/* Color styling */
var colorStyle = document.createElement("link");
colorStyle.rel = "stylesheet";
var styleHref = "/themes/";
if (localStorage.getItem("theme") === null) {
  styleHref += "glassmorphism_";
} else {
  styleHref += `${localStorage.getItem("theme")}_`;
}
if (localStorage.getItem("dark") === null) {
  styleHref += "light.css";
} else {
  styleHref += `${localStorage.getItem("dark")}.css`;
}
colorStyle.href = styleHref
document.head.appendChild(colorStyle);
