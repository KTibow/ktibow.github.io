if (localStorage.getItem("card") == null) {
  document.getElementById("cardpromo").style.display = "unset";
} else {
  var cardstuff = localStorage.getItem("card").split(":");
  document.getElementById("usecard").style.display = "unset";
  document.getElementById("cardidimg").src = `https://bwipjs-api.metafloor.com/?bcid=interleaved2of5&text=${cardstuff[0]}`;
  document.getElementById("cardpinimg").src = "https://barcodes4.me/barcode/i2of5/" + cardstuff[1] + ".png?resolution=4";
}
function setupcard() {
  document.getElementById("cardpromo").style.display = "none";
  document.getElementById("cardsetup").style.display = "unset";
  document.getElementById("usecard").style.display = "none";
}
function savecard() {
  var testreg = /^\d{4,12}$/;
  var cardnum = document.getElementById("cardnum").value;
  var cardpin = document.getElementById("cardpin").value;
  if (!cardnum.match(testreg) || !cardpin.match(testreg)) {
    alert("Check your card details. Max 12 digits, min 4 digits.");
  } else {
    localStorage.removeItem("card");
    localStorage.setItem("card", cardnum + ":" + cardpin);
    document.getElementById("usecard").style.display = "unset";
    document.getElementById("cardidimg").src = "https://barcodes4.me/barcode/i2of5/" + cardnum + ".png?resolution=4";
    document.getElementById("cardpinimg").src = "https://barcodes4.me/barcode/i2of5/" + cardpin + ".png?resolution=4";
    document.getElementById("cardsetup").style.display = "none";
  }
}
function runcard() {
  document.getElementById("cardidimg").style.opacity = "1";
  document.getElementById("cardidimg").style.display = "unset";
  setTimeout(window.scrollBy, 40, 0, 1000);
  setTimeout(function() {
    setTimeout(window.scrollBy, 40, 0, 1000);
    document.getElementById("cardidimg").style.opacity = "0";
    document.getElementById("cardidimg").style.display = "none";
    document.getElementById("cardpinimg").style.opacity = "1";
    document.getElementById("cardpinimg").style.display = "unset";
    setTimeout(function() {
       setTimeout(window.scrollBy, 40, 0, -1000);
      document.getElementById("cardpinimg").style.opacity = "0";
      document.getElementById("cardpinimg").style.display = "none";
    }, 670);
  }, 670);
}
function showdetails() {
  var cardstuff = localStorage.getItem("card").split(":");
  alert(`Card number: ${cardstuff[0]}
Card PIN: ${cardstuff[1]}`);
}
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
function updatepromo() {
  document.getElementById("promoheader").innerHTML = choose(["Simplify checkout at the library.",
                                                             "Forget about carrying your library card.",
                                                             "Sign in to checkout with one tap.",
                                                             "Turn library checkout from 1-2-3-4-5-6-7-8 to 1-2-3.",
                                                             "Sign in to the library in just a couple seconds.",
                                                             "You're wasting more time than you think finding your card."]);
}
setInterval(updatepromo, 2000);
document.getElementById("setupcardbutton").addEventListener("click", () => {setTimeout(setupcard, 400)}, true);
document.getElementById("setupcardbutton2").addEventListener("click", () => {setTimeout(setupcard, 400)}, true);
document.getElementById("savecardbutton").addEventListener("click", () => {setTimeout(savecard, 400)}, true);
document.getElementById("showdetailsbutton").addEventListener("click", () => {setTimeout(showdetails, 400)}, true);
document.getElementById("runcardbutton").addEventListener("click", () => {setTimeout(runcard, 400)}, true);
