/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from '../..';
import { PlayerInteraction } from './PlayerInteraction';
import { PlayerMovement, resetPlayerPosition } from './PlayerMovement';

export type PlayerDirection = 'north' | 'west' | 'south' | 'east';

// eslint-disable
const InputHandler = (entities: any, { input }: any) => {
  const { payload } = input.find((x: any) => x.name === 'onKeyDown') || {};

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
        resetPlayerPosition();
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
