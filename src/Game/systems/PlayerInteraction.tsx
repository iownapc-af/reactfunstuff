import { store } from '../..';
import { Doors } from '../components/Door';
import { PlayerDirection } from './InputHandler';

const PlayerInteraction = () => {
  const [player, currentGameWorld] = [store.getState().player, store.getState().overworld];

  const moveDirection: { [K in PlayerDirection]: { tile: string; coord: string } } = {
    north: {
      tile: currentGameWorld[player.map][player.yCoordinate - 1][player.xCoordinate],
      coord: `${player.yCoordinate - 1},${player.xCoordinate}`,
    },
    south: {
      tile: currentGameWorld[player.map][player.yCoordinate + 1][player.xCoordinate],
      coord: `${player.yCoordinate + 1},${player.xCoordinate}`,
    },
    west: {
      tile: currentGameWorld[player.map][player.yCoordinate][player.xCoordinate - 1],
      coord: `${player.yCoordinate},${player.xCoordinate - 1}`,
    },
    east: {
      tile: currentGameWorld[player.map][player.yCoordinate][player.xCoordinate + 1],
      coord: `${player.yCoordinate},${player.xCoordinate + 1}`,
    },
  };

  const determineInteractionType = () => {
    switch (moveDirection[player.direction].tile) {
      case ':': {
        const door = Doors.filter((room) => {
          return room.currentCoords === `${moveDirection[player.direction].coord},${player.map}`;
        });

        if (door[0] !== undefined) {
          const map = door[0].newRoomIndex;
          store.dispatch({ type: 'UPDATE_PLAYER_MAP', updatePlayerMap: map });
        }

        break;
      }
      case 'q':
        break;
      case 'M':
        break;
    }
  };

  determineInteractionType();
};

export { PlayerInteraction };
