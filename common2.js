/* Google analytics warning */
var wrapper = document.createElement("div");
wrapper.innerHTML = `
<div id="analyticsWarning" style="
    background: rgb(230, 115, 0);
    color: white;
    padding: 10px;
    position: fixed;
    width: 100vw;
    left: 0;
    bottom: 0;
"><p>I use Google Analytics because I don't want to make stuff nobody looks at. (Yes I hate cookie consent too) <button style="
    margin: 5px 15px;
    padding: 5px;
    font-size: 1em;
    background: transparent;
    color: white;
    box-shadow: -5.5px -5.5px 5.5px 0 rgb(255 128 0 / 50%), 5.5px 5.5px 5.5px 0 rgb(0 0 0 / 3%);
    border: none;
" onclick='
window.localStorage.setItem("closeit", "yup"); document.getElementById("analyticsWarning").style.display = "none";
'>Close</button><button style="
    margin: 5px 15px;
    padding: 5px;
    font-size: 1em;
    background: transparent;
    color: white;
    box-shadow: -5.5px -5.5px 5.5px 0 rgb(255 128 0 / 50%), 5.5px 5.5px 5.5px 0 rgb(0 0 0 / 3%);
    border: none;
" onclick="window.open('/blog/2021/1/14/');">Details + opt out</button></p></div>
`;
if (window.localStorage.getItem("closeit") != "yup") {
    document.body.appendChild(wrapper);
}
/* Actually load Google Analytics */
var gaTag = document.createElement("script");
gaTag.src = "https://www.googletagmanager.com/gtag/js?id=G-8ZRE2X4NSL";
document.body.appendChild(gaTag);
window.dataLayer = window.dataLayer || [];
function addConfig() {
    window.dataLayer.push(arguments);
}
addConfig('js', new Date());
addConfig('config', 'G-8ZRE2X4NSL');
/* Fonts */
var openSans = document.createElement('link');
openSans.rel = 'stylesheet';
openSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap';
document.head.appendChild(openSans);
if (window.location.href.includes("/blog/")) {
    var openSansUser = document.createElement('style');
    openSansUser.innerHTML = "* { font-family: Open Sans, sans-serif; }";
    document.head.appendChild(openSansUser);
}
/* Viewport */
var newViewport = document.createElement("meta");
newViewport.name = "viewport";
newViewport.content = "width=device-width, initial-scale=1";
document.head.appendChild(newViewport);
