import { store } from '../..';
import { Doors } from '../components/Door';
import { PlayerDirection } from './InputHandler';

const MoveObject = () => {
  const gameWorld = store.getState().overworld;

  let playerX = store.getState().player.xCoordinate;
  let playerY = store.getState().player.yCoordinate;
  const playerDirection = store.getState().player.direction;
  // eslint-disable-next-line prefer-destructuring
  let currentGameWorld = store.getState().player.map;

  const returnMapTile = (index: number, indexY: number, indexX: number) => {
    return gameWorld[index][indexY][indexX];
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

  const isValidMove = (newPlayerX: number, newPlayerY: number) => {
    return (
      gameWorld[currentGameWorld][newPlayerY][newPlayerX] === ' ' ||
      gameWorld[currentGameWorld][newPlayerY][newPlayerX] === 'e'
    );
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

  return () => {
    if (moveDirection[playerDirection].tile === ':') {
      const door = Doors.filter((room) => {
        return room.currentCoords === `${moveDirection[playerDirection].coord},${currentGameWorld}`;
      });

      if (door[0] !== undefined) {
        currentGameWorld = door[0].newRoomIndex;
        [playerX, playerY] = door[0].newPlayerCoords;
      }
    }
    isMoveableObject(playerDirection);
  };
};

export { MoveObject };
