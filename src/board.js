// import Player from "./player";
// import extractCoordinates from "./extractCoordinates";

// function createPlayer(nameElement, isComputerElement) {
//   const isComputer = isComputerElement.value === "true";
//   return new Player(nameElement.value, isComputer);
// }

// function turnLoops(initialPlayer, secondPlayer, chooseAttack) {
//   let currentPlayer = initialPlayer;
//   let enemy = secondPlayer;
//   while (!enemy.getGameboard().allShipsSunk()) {
//     let attack;
//     if (currentPlayer.getIsComputer()) {
//       attack = currentPlayer.getComputerPlay(enemy.getGameboard().getCells());
//     } else {
//       attack = chooseAttack();
//     }
//     enemy.getGameboard().receiveAttack(attack);
//     if (enemy.getGameboard().allShipsSunk()) {
//       return currentPlayer.getName();
//     }
//     const temp = currentPlayer;
//     currentPlayer = enemy;
//     enemy = temp;
//   }
//   return null;
// }

console.log(sessionStorage.getItem("clicks"));

// export { createPlayer, turnLoops };
