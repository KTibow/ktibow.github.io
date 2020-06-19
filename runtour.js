var dagent;
document.getElementById("yesBut").style.display = "none";
document.getElementById("noBut").style.display = "none";

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

function show() {
    document.getElementById("yesBut").style.setProperty("display", "inline", "important");
    document.getElementById("noBut").style.setProperty("display", "inline", "important");
    dagent.moveTo(200, -10);
    dagent.gestureAt(0, 0);
}
if (getCookie("tourDone") != "yes") {
    clippy.load('Clippy', function(agent) {
        dagent = agent;
        agent.show();
        agent.moveTo(200, 200);
        agent.play('GetAttention');
        agent.speak('Hello there! Would you like to take a quick tour of my site that can be cancellable at any time?');
        setTimeout(show, 9000);
    });
}

function no() {
    dagent.hide();
    document.getElementById("yesBut").style.display = "none";
    document.getElementById("noBut").style.display = "none";
    setCookie("tourDone", "yes", 365);
}
if (window.location.href.includes("done")) {
    setInterval(no, 300);
    window.addEventListener("load", no);
}
function cookcheck() {
    if (getCookie("cookieclose") == "yes") {
        document.getElementById("googwarn").style.setProperty("display", "none", "important");
    }
}
setInterval(cookcheck, 300);
