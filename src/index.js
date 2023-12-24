console.log("hola");
const startLink = document.getElementById("start");
const form = document.getElementById("nameForm");
let a = 0;
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
startLink.addEventListener("click", (e) => {
  e.preventDefault();
  a += 1;
  sessionStorage.setItem("clicks", a);
  window.location.href = "waitingPage.html";
});
