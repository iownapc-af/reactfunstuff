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

  const setTilePlacedOn = (indexY: number, indexX: number) => {
    store.dispatch({
      type: 'SET_PLAYER_TILE_PLACED',
      setPlayerTilePlaced: gameWorld[currentGameWorld][indexY][indexX],
    });
  };

  const movePlayer = (xChange: number, yChange: number, direction: PlayerDirection) => {
    playerDirection = direction;
    if (isNpcContact(playerX + xChange, playerY + yChange)) {
      sendPlayerToCombat();
    }

    if (isValidMove(playerX + xChange, playerY + yChange)) {
      const updatedGameWorld = gameWorld;

      updatedGameWorld[currentGameWorld][playerY][playerX] = tilePlayerPlacedOn;
      // setTilePlacedOn(playerY + yChange, playerX + xChange);
      playerX += xChange;
      playerY += yChange;

      // updatedGameWorld[currentGameWorld][playerY][playerX] = 'p';

      console.log(updatedGameWorld);

      store.dispatch({ type: 'UPDATE_PLAYER_MAP', updatePlayerMap: currentGameWorld });
      store.dispatch({
        type: 'UPDATE_PLAYER_COORDS',
        updatePlayerCoords: [playerX, playerY],
      });
      store.dispatch({ type: 'UPDATE_MAP', updateMap: updatedGameWorld });
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
