import { store } from '../..';
import { groundItemsList, itemList, questList } from '../Entities/Lists';

const removeItemsOfZeroQuantity = (playerInventory: { id: number; amount: number }[]) => {
  store.dispatch({
    type: 'UPDATE_PLAYER_INVENTORY',
    updatePlayerInventory: playerInventory.filter((items) => {
      return items.amount > 0;
    }),
  });
};

const questPlaceItemsOnMap = (groundItemId: number) => {
  const map = store.getState().overworld;

  groundItemsList.forEach((groundItem) => {
    if (groundItem.id === groundItemId) {
      map[groundItem.coord[2]][groundItem.coord[0]][groundItem.coord[1]] = itemList.filter(
        (item) => {
          return item.id === groundItem.itemId;
        }
      )[0].tileCharacter;
    }
  });

  store.dispatch({ type: 'UPDATE_MAP', updateMap: map });
};

const questCheckPlayerInventory = (requiredItemId: number, requiredItemAmount: number) => {
  const playerInventory = store.getState().player.inventory;

  const doesPlayerHaveRequiredItems = Object.values(playerInventory).filter(
    (item) => item.id === requiredItemId && item.amount >= requiredItemAmount
  ).length;

  if (doesPlayerHaveRequiredItems >= requiredItemAmount) {
    const inventoryItemIndex = playerInventory.findIndex((item) => item.id === 0);
    playerInventory[inventoryItemIndex].amount -= requiredItemAmount;

    removeItemsOfZeroQuantity(playerInventory);
  }

  return doesPlayerHaveRequiredItems >= requiredItemAmount;
};

const questSetProgression = (questId: number) => {
  questList[questId].playerProgress += 1;
};

const questCheckProgressible = (questId: number | null) => {
  if (questId !== null) {
    const quest = questList[questId];
    if (quest.questRequirements[quest.playerProgress].progressionEligible()) {
      questSetProgression(quest.id);
    }
  } else {
    for (const quest in questList) {
      if (
        questList[quest].playerProgress > 0 &&
        questList[quest].questRequirements[questList[quest].playerProgress].progressionEligible()
      ) {
        questSetProgression(questList[quest].id);
      }
    }
  }
};

export {
  removeItemsOfZeroQuantity,
  questPlaceItemsOnMap,
  questCheckPlayerInventory,
  questSetProgression,
  questCheckProgressible,
};
