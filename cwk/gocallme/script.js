function call() {
  var telLink = document.createElement("a");
  telLink.href = "tel:+1-562-867-5309"
  telLink.id = "telly"
  document.body.appendChild(telLink)
  document.getElementById("telly").click();
}