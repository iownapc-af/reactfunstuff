import { PlayerDirection } from '../Game/systems/InputHandler';

export type Action =
  | { type: 'RESET_GAME' }
  | { type: 'UPDATE_PLAYER_COORDS'; updatePlayerCoords: [number, number] }
  | { type: 'UPDATE_PLAYER_DIRECTION'; updatePlayerDirection: PlayerDirection }
  | { type: 'UPDATE_PLAYER_MAP'; updatePlayerMap: number }
  | { type: 'UPDATE_MAP'; updateMap: string[][][] }
  | { type: 'SET_PLAYER_TILE_PLACED'; setPlayerTilePlaced: string }
  | { type: 'SET_INVENTORY_VISIBILITY'; setInventoryVisibility: boolean };
