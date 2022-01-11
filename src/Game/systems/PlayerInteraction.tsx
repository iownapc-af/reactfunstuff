import { store } from '../..';
import { Doors } from '../components/Door';
import { npcList, questList } from '../Entities/Lists';
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
        store.dispatch({ type: 'SET_DIALOG_TEXT', setDialogText: getDialog() });
        store.dispatch({ type: 'SET_DIALOG_VISIBILITY', setDialogVisibility: true });
        break;
      case 'M':
        break;
    }
  };

  const getDialog = () => {
    let num = 0;

    const npcId = npcList.filter((npc) => {
      return (
        npc.currentCoords.toString() === `${moveDirection[player.direction].coord},${player.map}`
      );
    })[0].id;

    const quest = questList.filter((t_quest) => {
      return t_quest.questGiverId === npcId && t_quest.playerProgress < t_quest.questSteps.length; // max number of steps
    })[0];

    num = quest.playerProgress;
    if (quest.questRequirements[quest.playerProgress].bool()) {
      quest.playerProgress += 1;
    }

    return quest.questSteps[num].dialog;
  };

  determineInteractionType();
};

export { PlayerInteraction };
