/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from '../..';
import { Doors } from '../components/Door';

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

  const returnMapTile = (index: number, indexY: number, indexX: number) => {
    return gameWorld[index][indexY][indexX];
  };

  const isValidMove = (newPlayerX: number, newPlayerY: number) => {
    return gameWorld[currentGameWorld][newPlayerY][newPlayerX] === ' ';
  };

  const isNpcContact = (newPlayerX: number, newPlayerY: number) => {
    return gameWorld[currentGameWorld][newPlayerY][newPlayerX] === 'x';
  };

  const sendPlayerToCombat = () => {
    [playerX, playerY] = [2, 2];
    playerDirection = 'east';
    currentGameWorld = 3;
  };

  const isMoveableObject = (objectDirection: string) => {
    switch (objectDirection) {
      case 'north':
        if (gameWorld[currentGameWorld][playerY - 1][playerX] === 'M') {
          moveObject(playerX, playerY - 1, playerX, playerY - 2);
        }
        break;
      case 'south':
        if (gameWorld[currentGameWorld][playerY + 1][playerX] === 'M') {
          moveObject(playerX, playerY + 1, playerX, playerY + 2);
        }
        break;
      case 'east':
        if (gameWorld[currentGameWorld][playerY][playerX + 1] === 'M') {
          moveObject(playerX + 1, playerY, playerX + 2, playerY);
        }
        break;
      case 'west':
        if (gameWorld[currentGameWorld][playerY][playerX - 1] === 'M') {
          moveObject(playerX - 1, playerY, playerX - 2, playerY);
        }
        break;
      default:
        break;
    }

    return false;
  };

  const moveObject = (
    currentObjectX: number,
    currentObjectY: number,
    newObjectX: number,
    newObjectY: number
  ) => {
    if (isValidMove(newObjectX, newObjectY)) {
      const updatedGameWorld = gameWorld;
      updatedGameWorld[currentGameWorld][currentObjectY][currentObjectX] = ' ';
      updatedGameWorld[currentGameWorld][newObjectY][newObjectX] = 'M';

      store.dispatch({ type: 'UPDATE_MAP', updateMap: updatedGameWorld });
    }
  };

  const moveDirection: { [K in PlayerDirection]: { tile: string; coord: string } } = {
    north: {
      tile: returnMapTile(currentGameWorld, playerY - 1, playerX),
      coord: `${playerY - 1},${playerX}`,
    },
    south: {
      tile: returnMapTile(currentGameWorld, playerY + 1, playerX),
      coord: `${playerY + 1},${playerX}`,
    },
    west: {
      tile: returnMapTile(currentGameWorld, playerY, playerX - 1),
      coord: `${playerY},${playerX - 1}`,
    },
    east: {
      tile: returnMapTile(currentGameWorld, playerY, playerX + 1),
      coord: `${playerY},${playerX + 1}`,
    },
  };

  // const startAnimation = () => {
  //   const player = document.querySelector('.player-image');
  //   player?.classList.add('moving');
  // };

  // const stopAnimation = () => {
  //   const player = document.querySelector('.player-image');
  //   player?.classList.remove('moving');
  // };

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
        if (currentGameWorld === 3) {
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
        if (moveDirection[playerDirection].tile === ':') {
          const door = Doors.filter((room) => {
            return (
              room.currentCoords === `${moveDirection[playerDirection].coord},${currentGameWorld}`
            );
          });

          if (door[0] !== undefined) {
            currentGameWorld = door[0].newRoomIndex;
            [playerX, playerY] = door[0].newPlayerCoords;

            break;
          }
        }
        isMoveableObject(playerDirection);
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

  // stopAnimation();

  return entities;
};

export { InputHandler };
