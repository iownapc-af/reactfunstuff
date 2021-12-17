/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from '../..';
import { Doors } from '../components/Door';

export type PlayerDirection = 'north' | 'west' | 'south' | 'east';

// eslint-disable
const Movement = (entities: any, { input }: any) => {
  const { payload } = input.find((x: any) => x.name === 'onKeyDown') || {};
  const gameWorld = store.getState().overworld;

  let playerX = store.getState().player.xCoordinate;
  let playerY = store.getState().player.yCoordinate;
  let playerDirection = store.getState().player.direction;
  // eslint-disable-next-line prefer-destructuring
  let map = store.getState().player.map;

  const returnMapTile = (index: number, indexY: number, indexX: number) => {
    return gameWorld[index][indexY][indexX];
  };

  const isValidMove = (newPlayerX: number, newPlayerY: number) => {
    return gameWorld[map][newPlayerY][newPlayerX] === ' ';
  };

  const isMoveableObject = (objectDirection: string) => {
    switch (objectDirection) {
      case 'north':
        if (gameWorld[map][playerY - 1][playerX] === 'M') {
          moveObject(playerX, playerY - 1, playerX, playerY - 2);
        }
        break;
      case 'south':
        if (gameWorld[map][playerY + 1][playerX] === 'M') {
          moveObject(playerX, playerY + 1, playerX, playerY + 2);
        }
        break;
      case 'east':
        if (gameWorld[map][playerY][playerX + 1] === 'M') {
          moveObject(playerX + 1, playerY, playerX + 2, playerY);
        }
        break;
      case 'west':
        if (gameWorld[map][playerY][playerX - 1] === 'M') {
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
      updatedGameWorld[map][currentObjectY][currentObjectX] = ' ';
      updatedGameWorld[map][newObjectY][newObjectX] = 'M';

      store.dispatch({ type: 'UPDATE_MAP', updateMap: updatedGameWorld });
    }
  };

  const moveDirection: { [K in PlayerDirection]: { tile: string; coord: string } } = {
    north: {
      tile: returnMapTile(map, playerY - 1, playerX),
      coord: `${playerY - 1},${playerX}`,
    },
    south: {
      tile: returnMapTile(map, playerY + 1, playerX),
      coord: `${playerY + 1},${playerX}`,
    },
    west: {
      tile: returnMapTile(map, playerY, playerX - 1),
      coord: `${playerY},${playerX - 1}`,
    },
    east: {
      tile: returnMapTile(map, playerY, playerX + 1),
      coord: `${playerY},${playerX + 1}`,
    },
  };

  if (payload) {
    const updatedGameWorld = gameWorld;
    updatedGameWorld[map][playerY][playerX] = ' ';

    switch (payload.key) {
      case 'w':
      case 'ArrowUp':
        playerDirection = 'north';
        if (isValidMove(playerX, playerY - 1)) {
          playerY -= 1;
        }
        break;
      case 's':
      case 'ArrowDown':
        playerDirection = 'south';
        if (isValidMove(playerX, playerY + 1)) {
          // playerAction.y += 1;
          playerY += 1;
        }
        break;
      case 'a':
      case 'ArrowLeft':
        playerDirection = 'west';
        if (isValidMove(playerX - 1, playerY)) {
          playerX -= 1;
        }
        break;
      case 'd':
      case 'ArrowRight':
        playerDirection = 'east';
        if (isValidMove(playerX + 1, playerY)) {
          playerX += 1;
        }
        break;
      case ' ':
        if (moveDirection[playerDirection].tile === ':') {
          const door = Doors.filter((room) => {
            return room.currentCoords === `${moveDirection[playerDirection].coord},${map}`;
          });

          if (door[0] !== undefined) {
            map = door[0].newRoomIndex;
            store.dispatch({ type: 'UPDATE_PLAYER_MAP', updatePlayerMap: map });
          }
        }
        isMoveableObject(playerDirection);
        break;
      default:
        break;
    }

    updatedGameWorld[map][playerY][playerX] = 'p';

    store.dispatch({ type: 'UPDATE_PLAYER_DIRECTION', updatePlayerDirection: playerDirection });
    store.dispatch({
      type: 'UPDATE_PLAYER_COORDS',
      updatePlayerCoords: [playerX, playerY],
    });
    store.dispatch({ type: 'UPDATE_MAP', updateMap: updatedGameWorld });
  }

  return entities;
};

export { Movement };
