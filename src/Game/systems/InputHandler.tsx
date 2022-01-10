/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from '../..';
import { MoveObject } from './MoveObject';

export type PlayerDirection = 'north' | 'west' | 'south' | 'east';

// eslint-disable
const InputHandler = (entities: any, { input }: any) => {
  const { payload } = input.find((x: any) => x.name === 'onKeyDown') || {};
  const gameWorld = store.getState().overworld;

  let playerX = store.getState().player.xCoordinate;
  let playerY = store.getState().player.yCoordinate;
  let playerDirection = store.getState().player.direction;
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
      return;
    }

    if (isValidMove(playerX + xChange, playerY + yChange)) {
      playerX += xChange;
      playerY += yChange;
    }
  };

  if (payload) {
    const updatedGameWorld = gameWorld;
    updatedGameWorld[currentGameWorld][playerY][playerX] = ' ';

    switch (payload.key) {
      case 'w' || 'W':
      case 'ArrowUp':
        movePlayer(0, -1, 'north');
        break;

      case 's' || 'S':
      case 'ArrowDown':
        movePlayer(0, 1, 'south');
        break;

      case 'a' || 'A':
      case 'ArrowLeft':
        movePlayer(-1, 0, 'west');
        break;

      case 'd' || 'D':
      case 'ArrowRight':
        movePlayer(1, 0, 'east');
        break;

      case '`':
        if (currentGameWorld === 4) {
          currentGameWorld = 0;
          playerX = 4;
          playerY = 8;
        }
        break;

      case 'b':
        store.dispatch({
          type: 'SET_INVENTORY_VISIBILITY',
          setInventoryVisibility: !store.getState().isInventoryVisible,
        });
        break;

      case ' ':
        MoveObject();
        break;
      default:
        break;
    }

    updatedGameWorld[currentGameWorld][playerY][playerX] = 'p';

    store.dispatch({ type: 'UPDATE_PLAYER_MAP', updatePlayerMap: currentGameWorld });
    store.dispatch({ type: 'UPDATE_PLAYER_DIRECTION', updatePlayerDirection: playerDirection });
    store.dispatch({
      type: 'UPDATE_PLAYER_COORDS',
      updatePlayerCoords: [playerX, playerY],
    });
    store.dispatch({ type: 'UPDATE_MAP', updateMap: updatedGameWorld });
  }

  return entities;
};

export { InputHandler };
