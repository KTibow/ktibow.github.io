var themeChoice = "3d";
var darkMode = "light";
if (localStorage.getItem("theme") !== null) {
  themeChoice = localStorage.getItem("theme");
}
if (localStorage.getItem("dark") !== null) {
  darkMode = localStorage.getItem("dark");
}
var styler = document.createElement("link");
styler.rel = "stylesheet";
styler.href = `${themeChoice}_${darkMode}.css`;
document.head.appendChild(styler);
