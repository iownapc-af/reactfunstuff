import { store } from '../..';
import { Doors } from '../components/Door';
import { groundItemsList, npcList, questList } from '../Entities/Lists';
import { PlayerDirection } from './InputHandler';
import { questCheckProgressible } from './QuestFunctions';

export const InteractableObjects = ['B', '1'];

const PlayerInteraction = () => {
  const [player, currentGameWorld] = [store.getState().player, store.getState().overworld];

  const moveDirection: { [K in PlayerDirection]: { tile: string; coord: string } } = {
    north: {
      tile: currentGameWorld[player.map][player.yCoordinate - 1][player.xCoordinate],
      coord: `${player.yCoordinate - 1},${player.xCoordinate},${player.map}`,
    },
    south: {
      tile: currentGameWorld[player.map][player.yCoordinate + 1][player.xCoordinate],
      coord: `${player.yCoordinate + 1},${player.xCoordinate},${player.map}`,
    },
    west: {
      tile: currentGameWorld[player.map][player.yCoordinate][player.xCoordinate - 1],
      coord: `${player.yCoordinate},${player.xCoordinate - 1},${player.map}`,
    },
    east: {
      tile: currentGameWorld[player.map][player.yCoordinate][player.xCoordinate + 1],
      coord: `${player.yCoordinate},${player.xCoordinate + 1},${player.map}`,
    },
  };

  const determineInteractionType = () => {
    switch (moveDirection[player.direction].tile) {
      case ':': {
        const door = Doors.filter((room) => {
          return room.currentCoords === moveDirection[player.direction].coord;
        });

        if (door[0] !== undefined) {
          const map = door[0].newRoomIndex;
          store.dispatch({ type: 'UPDATE_PLAYER_MAP', updatePlayerMap: map });
        }

        break;
      }

      case 'B' || '1':
        pickupItem(getItemToAddToInventory(moveDirection[player.direction]));
        break;

      case 'q':
        store.dispatch({
          type: 'SET_DIALOG_TEXT',
          setDialogSpeaker: getDialog().speaker,
          setDialogText: getDialog().text,
        });
        store.dispatch({ type: 'SET_DIALOG_VISIBILITY', setDialogVisibility: true });
        break;
      case 'M':
        break;
    }
  };

  const getItemToAddToInventory = (groundItem: { tile: string; coord: string }) => {
    const itemCoord: number[] = groundItem.coord.split(',').map((coord) => parseInt(coord, 10));

    const item = groundItemsList.filter((items) => {
      return items.coord.toString() === itemCoord.toString();
    })[0];

    if (item) return { id: item.id, amount: item.stackSize, groundItemCoord: itemCoord };
    return { id: -1, amount: 0, groundItemCoord: [] };
  };

  const pickupItem = (itemToAdd: { id: number; amount: number; groundItemCoord: number[] }) => {
    if (itemToAdd.id === -1) return;
    const newInventory = player.inventory;

    const index = newInventory.findIndex((item) => item.id === itemToAdd.id);

    if (index !== -1) {
      newInventory[index].amount += itemToAdd.amount;
    } else {
      newInventory.push({ id: itemToAdd.id, amount: itemToAdd.amount });
    }

    currentGameWorld[itemToAdd.groundItemCoord[2]][itemToAdd.groundItemCoord[0]][
      itemToAdd.groundItemCoord[1]
    ] = 'e';

    questCheckProgressible(null);
  };

  const getDialog = () => {
    const npcId = npcList.filter((npc) => {
      return npc.currentCoords.toString() === moveDirection[player.direction].coord;
    })[0].id;

    const quest = questList.filter((t_quest) => {
      return t_quest.questGiverId === npcId && t_quest.playerProgress < t_quest.questSteps.length;
    })[0];

    const num = quest.playerProgress;
    questCheckProgressible(quest.id);

    return {
      speaker: npcList[quest.questGiverId].name,
      text: quest.questSteps[num].dialog,
    };
  };

  determineInteractionType();
};

export { PlayerInteraction };
