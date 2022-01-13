/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from '../..';
import { PlayerInteraction } from './PlayerInteraction';
import { PlayerMovement } from './PlayerMovement';

export type PlayerDirection = 'north' | 'west' | 'south' | 'east';

// eslint-disable
const InputHandler = (entities: any, { input }: any) => {
  const { payload } = input.find((x: any) => x.name === 'onKeyDown') || {};
  const [isDialogVisible] = [store.getState().isDialogVisible];

  // crap solution to putting player in map on first load
  const [player, gameWorld] = [store.getState().player, store.getState().overworld];
  if (gameWorld[player.map][player.yCoordinate][player.xCoordinate] !== 'p') {
    const updatedGameWorld = gameWorld;
    updatedGameWorld[player.map][player.yCoordinate][player.xCoordinate] = 'p';
    store.dispatch({ type: 'UPDATE_MAP', updateMap: updatedGameWorld });
  }

  if (isDialogVisible) return entities;

  if (payload) {
    switch (payload.key) {
      case 'w' || 'W':
      case 'ArrowUp':
        PlayerMovement(0, -1, 'north');
        break;

      case 's' || 'S':
      case 'ArrowDown':
        PlayerMovement(0, 1, 'south');
        break;

      case 'a' || 'A':
      case 'ArrowLeft':
        PlayerMovement(-1, 0, 'west');
        break;

      case 'd' || 'D':
      case 'ArrowRight':
        PlayerMovement(1, 0, 'east');
        break;

      case '`':
        // debug button
        break;

      case 'b':
        store.dispatch({
          type: 'SET_INVENTORY_VISIBILITY',
          setInventoryVisibility: !store.getState().isInventoryVisible,
        });
        break;

      case ' ':
        PlayerInteraction();
        break;
      default:
        break;
    }
  }

  return entities;
};

export { InputHandler };
