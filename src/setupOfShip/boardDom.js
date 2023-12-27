function showCurtain() {
  const curtain = document.getElementById("curtain");
  curtain.classList.remove("closed");
}

function hideCurtain() {
  const curtain = document.getElementById("curtain");
  curtain.classList.add("closed");
}

export { showCurtain, hideCurtain };
