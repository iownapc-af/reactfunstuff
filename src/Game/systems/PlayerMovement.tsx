import { store } from '../..';
import { Camera } from './Camera';
import { PlayerDirection } from './InputHandler';

const PlayerMovement = (
  xChangeProp: number,
  yChangeProp: number,
  directionProp: PlayerDirection
) => {
  const gameWorld = store.getState().overworld;

  let playerX = store.getState().player.xCoordinate;
  let playerY = store.getState().player.yCoordinate;
  let playerDirection = store.getState().player.direction;
  const tilePlayerPlacedOn = store.getState().player.tilePlacedOn;
  // eslint-disable-next-line prefer-destructuring
  let currentGameWorld = store.getState().player.map;

  const isValidMove = (newPlayerX: number, newPlayerY: number) => {
    return (
      gameWorld[currentGameWorld][newPlayerY][newPlayerX] === ' ' ||
      gameWorld[currentGameWorld][newPlayerY][newPlayerX] === 'e'
    );
  };

  const isNpcContact = (newPlayerX: number, newPlayerY: number) => {
    return gameWorld[currentGameWorld][newPlayerY][newPlayerX] === 'x';
  };

  const sendPlayerToCombat = () => {
    [playerX, playerY] = [2, 2];
    playerDirection = 'east';
    currentGameWorld = 4;
  };

  const movePlayer = (xChange: number, yChange: number, direction: PlayerDirection) => {
    playerDirection = direction;
    if (isNpcContact(playerX + xChange, playerY + yChange)) {
      sendPlayerToCombat();
    }

    if (isValidMove(playerX + xChange, playerY + yChange)) {

      playerX += xChange;
      playerY += yChange;

      store.dispatch({
        type: 'UPDATE_PLAYER_COORDS',
        updatePlayerCoords: [playerX, playerY],
      });
      Camera();
    }

    store.dispatch({ type: 'UPDATE_PLAYER_DIRECTION', updatePlayerDirection: playerDirection });
  };

  movePlayer(xChangeProp, yChangeProp, directionProp);
};

const resetPlayerPosition = () => {
  const [currentGameWorld, playerX, playerY] = [0, 4, 8];
  store.dispatch({ type: 'UPDATE_PLAYER_MAP', updatePlayerMap: currentGameWorld });
  store.dispatch({
    type: 'UPDATE_PLAYER_COORDS',
    updatePlayerCoords: [playerX, playerY],
  });
};

export { PlayerMovement, resetPlayerPosition };
