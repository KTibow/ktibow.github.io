function getBarcodeURL(number) {
  return `https://bwipjs-api.metafloor.com/?bcid=interleaved2of5&text=${number}`;
}
if (localStorage.getItem("card") == null) {
  document.getElementById("cardPromo").style.display = "block";
} else {
  var cardData = localStorage.getItem("card").split(":");
  document.getElementById("useTheCard").style.display = "block";
  document.getElementById("cardNumberImage").src = getBarcodeURL(cardData[0]);
  document.getElementById("cardPinImage").src = getBarcodeURL(cardData[1]);
}
function setupCard() {
  document.getElementById("cardPromo").style.display = "none";
  document.getElementById("cardSetup").style.display = "block";
  document.getElementById("useTheCard").style.display = "none";
}
function saveCard() {
  console.log(is_first);
  var validRegex = /^\d{4,12}$/;
  var cardNumber = document.getElementById("cardNumber").value;
  var cardPin = document.getElementById("cardPin").value;
  if (!cardNumber.match(validRegex) || !cardPin.match(validRegex)) {
    alert("Check your card details. Max 12 digits, min 4 digits.");
  } else {
    localStorage.removeItem("card");
    localStorage.setItem("card", `${cardNumber}:${cardPin}`);
    document.getElementById("useTheCard").style.display = "block";
    document.getElementById("cardNumberImage").src = getBarcodeURL(cardNumber);
    document.getElementById("cardPinImage").src = getBarcodeURL(cardPin);
    document.getElementById("cardSetup").style.display = "none";
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
  var cardData = localStorage.getItem("card").split(":");
  alert(`Card number: ${cardData[0]}
Card PIN: ${cardData[1]}`);
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
