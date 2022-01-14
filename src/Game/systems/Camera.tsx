/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from '../..';

const Camera = () => {
  const gameWorld = store.getState().overworld;
  const player = store.getState().player;

  const renderedWorld = document.getElementById('gameworld');
  const renderedPlayer = document.getElementById('player');

  let [cameraX, cameraY] = [0, 0];

  const leftLimit = 14;
  const topLimit = 9;
  const rightLimit = gameWorld[player.map][0].length - 19;
  const bottomLimit = gameWorld[player.map][0].length - 10;

  if (player.xCoordinate < rightLimit && player.xCoordinate > leftLimit) {
    cameraX = (player.xCoordinate - leftLimit) * -10;
  } else if (player.xCoordinate >= rightLimit) cameraX = -1360;
  else cameraX = 0;

  if (player.yCoordinate < bottomLimit && player.yCoordinate > topLimit) {
    cameraY = (player.yCoordinate - topLimit) * -10;
  } else if (player.yCoordinate >= bottomLimit) cameraX = -1360;
  else cameraY = 0;

  if (renderedWorld) {
    renderedWorld.style.transform = `translate(${cameraX}px, ${cameraY}px)`;
  }
};

export { Camera };
