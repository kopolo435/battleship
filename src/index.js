import style from "./styles/index.css";

const startBtn = document.getElementById("start");

/**
 *
 * @param {string} player indica de que player se guardan los datos
 * player1 | player2
 */
function setPlayersInfo(player) {
  let name = document.getElementById(`${player}`).value;
  name = name === "" ? player : name; // Comprueba si colocar nombre default
  const isComputer = document.getElementById(`${player}Ia`).checked;

  const playerObj = { name, isComputer };
  sessionStorage.setItem(player, JSON.stringify(playerObj));
}
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setPlayersInfo("player1");
  setPlayersInfo("player2");
  sessionStorage.setItem("setup", "player1");
  window.location.href = "shipSetup.html";
});
