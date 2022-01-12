import { PlayerDirection } from '../Game/systems/InputHandler';

export type Action =
  | { type: 'RESET_GAME' }
  | { type: 'UPDATE_PLAYER_INVENTORY'; updatePlayerInventory: { id: number; amount: number }[] }
  | { type: 'UPDATE_PLAYER_COORDS'; updatePlayerCoords: [number, number] }
  | { type: 'UPDATE_PLAYER_DIRECTION'; updatePlayerDirection: PlayerDirection }
  | { type: 'UPDATE_PLAYER_MAP'; updatePlayerMap: number }
  | { type: 'UPDATE_MAP'; updateMap: string[][][] }
  | { type: 'SET_PLAYER_TILE_PLACED'; setPlayerTilePlaced: string }
  | { type: 'SET_DIALOG_VISIBILITY'; setDialogVisibility: boolean }
  | { type: 'SET_DIALOG_TEXT'; setDialogSpeaker: string; setDialogText: string[] }
  | { type: 'SET_INVENTORY_VISIBILITY'; setInventoryVisibility: boolean };
