function getBarcodeURL(number) {
  var color = getComputedStyle(document.body).getPropertyValue("--bar-color").trim();
  return `https://bwipjs-api.metafloor.com/?bcid=interleaved2of5&text=${number}&barcolor=${color}`;
}
if (localStorage.getItem("card") == null) {
  document.getElementById("cardPromo").style.display = "block";
} else {
  var cardNumber = localStorage.getItem("cardNumber");
  var cardPin = localStorage.getItem("cardPin");
  document.getElementById("useTheCard").style.display = "block";
  document.getElementById("cardNumberImage").src = getBarcodeURL(cardNumber);
  document.getElementById("cardPinImage").src = getBarcodeURL(cardPin);
}
function setupCard() {
  document.getElementById("cardPromo").style.display = "none";
  document.getElementById("cardSetup").style.display = "block";
  document.getElementById("useTheCard").style.display = "none";
}
function saveCard() {
  var validRegex = /^\d{4,12}$/;
  var cardNumber = document.getElementById("cardNumber").value;
  var cardPin = document.getElementById("cardPin").value;
  if (!cardNumber.match(validRegex) || !cardPin.match(validRegex)) {
    alert("Check your card details. Max 12 digits, min 4 digits.");
  } else {
    localStorage.removeItem("card");
    localStorage.setItem("cardNumber", cardNumber);
    localStorage.setItem("cardPin", cardPin);
    document.getElementById("useTheCard").style.display = "block";
    document.getElementById("cardNumberImage").src = getBarcodeURL(cardNumber);
    document.getElementById("cardPinImage").src = getBarcodeURL(cardPin);
    document.getElementById("cardSetup").style.display = "none";
    if (is_first) {
      gTag("event", "sign_up", {
        method: "card_number",
      });
    }
  }
}
function useCard() {
  document.getElementById("cardNumberImage").style.opacity = "1";
  document.getElementById("cardNumberImage").style.display = "inline";
  setTimeout(() => {
    window.scrollBy(0, 1000);
  }, 40);
  setTimeout(() => {
    window.scrollBy(0, 1000);
  }, 710);
  setTimeout(() => {
    document.getElementById("cardNumberImage").style.opacity = "0";
    document.getElementById("cardNumberImage").style.display = "none";
    document.getElementById("cardPinImage").style.opacity = "1";
    document.getElementById("cardPinImage").style.display = "inline";
    setTimeout(() => {
      setTimeout(window.scrollBy, 40, 0, -1000);
      document.getElementById("cardPinImage").style.opacity = "0";
      document.getElementById("cardPinImage").style.display = "none";
    }, 670);
  }, 670);
}
function showDetails() {
  var cardNumber = document.getElementById("cardNumber").value;
  var cardPin = document.getElementById("cardPin").value;
  alert(`Card number: ${cardNumber}
Card PIN: ${cardPin}`);
}
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
function updatePromo() {
  document.getElementById("promoHeader").innerHTML = choose([
    "Simplify checkout at the library.",
    "Forget about carrying your library card.",
    "Sign in to checkout with one tap.",
    "Turn library checkout from 1-2-3-4-5-6-7-8 to 1-2-3.",
    "Sign in to the library in just a couple seconds.",
    "You're wasting more time than you think finding your card.",
  ]);
}
setInterval(updatePromo, 2000);
