function call() {
  var telLink = document.createElement("a");
  telLink.href = "tel:+"+document.getElementById("telfield").value
  telLink.id = "telly"
  telLink.style.display = "none"
  document.body.appendChild(telLink)
  document.getElementById("telly").click();
}