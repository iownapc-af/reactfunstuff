// import { PlayerDirection } from './InputHandler';

// const isNpcContact = (newPlayerX: number, newPlayerY: number) => {
//   return gameWorld[currentGameWorld][newPlayerY][newPlayerX] === 'x';
// };

// const sendPlayerToCombat = () => {
//   [playerX, playerY] = [2, 2];
//   playerDirection = 'east';
//   currentGameWorld = 3;
// };

// const movePlayer = (xChange: number, yChange: number, direction: PlayerDirection) => {
//   playerDirection = direction;
//   if (isNpcContact(playerX + xChange, playerY + yChange)) {
//     sendPlayerToCombat();
//     return;
//   }

//   if (isValidMove(playerX + xChange, playerY + yChange)) {
//     playerX += xChange;
//     playerY += yChange;
//   }
// };

// // const startAnimation = () => {
// //   const player = document.querySelector('.player-image');
// //   player?.classList.add('moving');
// // };

// // const stopAnimation = () => {
// //   const player = document.querySelector('.player-image');
// //   player?.classList.remove('moving');
// // };

// export { movePlayer, isNpcContact, sendPlayerToCombat };
export {};
