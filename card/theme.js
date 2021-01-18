/* main.css */
var mainStyle = document.createElement("link");
mainStyle.rel = "stylesheet";
mainStyle.href = "themes/main.css";
document.head.appendChild(mainStyle);
/* Base styling */
var baseStyle = document.createElement("link");
baseStyle.rel = "stylesheet";
baseStyle.href = "themes/3d.css";
if (localStorage.getItem("theme") !== null) {
  baseStyle.href = `themes/${localStorage.getItem("theme")}.css`;
}
document.head.appendChild(baseStyle);
/* Color styling */
var colorStyle = document.createElement("link");
colorStyle.rel = "stylesheet";
if (localStorage.getItem("dark") !== null) {
  if (localStorage.getItem("theme") !== null) {
    colorStyle.href = `themes/${localStorage.getItem("theme")}_${localStorage.getItem("dark")}.css`;
  } else {
    colorStyle.href = `themes/3d_${localStorage.getItem("dark")}.css`;
  }
} else {
  if (localStorage.getItem("theme") !== null) {
    colorStyle.href = `themes/${localStorage.getItem("theme")}_light.css`;
  } else {
    colorStyle.href = `themes/3d_light.css`;
  }
}
document.head.appendChild(colorStyle);
