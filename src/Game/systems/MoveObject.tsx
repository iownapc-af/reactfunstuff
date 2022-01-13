import { store } from '../..';

const MoveObject = () => {
  const gameWorld = store.getState().overworld;

  const playerX = store.getState().player.xCoordinate;
  const playerY = store.getState().player.yCoordinate;
  const playerDirection = store.getState().player.direction;
  // eslint-disable-next-line prefer-destructuring
  const currentGameWorld = store.getState().player.map;

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

  return () => {
    isMoveableObject(playerDirection);
  };
};

export { MoveObject };
