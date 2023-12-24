const startLink = document.getElementById("start");

function setPlayersInfo(player) {
  let name = document.getElementById(`${player}`).value;
  name = name === "" ? player : name;
  const isComputer = document.getElementById(`${player}Ia`).checked;

  const playerObj = { name, isComputer };
  sessionStorage.setItem(player, JSON.stringify(playerObj));
}
startLink.addEventListener("click", (e) => {
  e.preventDefault();
  setPlayersInfo("player1");
  setPlayersInfo("player2");
  sessionStorage.setItem("setup", "player1");
  window.location.href = "shipSetup.html";
});
