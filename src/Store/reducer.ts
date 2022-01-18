import { PlayerDirection } from '../Game/systems/InputHandler';
import { Action } from './action';

interface State {
  isDialogVisible: boolean;
  dialog: {
    speaker: string | null;
    text: string[] | null;
  };

  isInventoryVisible: boolean;

  indexMap: number;
  overworld: string[][][];

  player: {
    direction: PlayerDirection;
    xCoordinate: number;
    yCoordinate: number;
    xScreen: number;
    yScreen: number;
    tilePlacedOn: string;
    map: number;
    health: number;
    mana: number;
    stamina: number;
    inventory: { id: number; amount: number }[];
  };
}

export const defaultState: State = {
  isDialogVisible: false,
  dialog: {
    speaker: null,
    text: null,
  },

  isInventoryVisible: false,

  /*
  Map Legend
    t - Tree
    e - dirt/earth
    p - player
    : - door
    M - boulder
    w - water
    s - shrub/bush
    b - building
    q - quest giver
    */

  indexMap: 0,
  overworld: [
    [
      'tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt'.split(''),
      'tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt'.split(''),
      'ttteeeebbbeeeeetttttttttttteeetttttttttttttttttttttttttttttttttttttt'.split(''),
      'tteeeebbbbbeeseetttttttttteeeMettttttttttttttttttttttttttttttttttttt'.split(''),
      'tteseebbbbbeeeeetttttttttteeeeettttttttttttttttttttttttttttttttttttt'.split(''),
      'tteeeebb:bbeseeetttttttttteeeetttttttttttttttttttttttttttttttttttttt'.split(''),
      'tteMeeeeeeeeeeeetttttttttttetttttttttttttttttttttttttttttttttttttttt'.split(''),
      'tteeeeeeeeMeeMeetttttttttttetttttttttttttttttttttttttttttttttttttttt'.split(''),
      'tteeeeeeeeqeeeeeettttttttttetttttttttttttttttttttttttttttttttttttttt'.split(''),
      'tteeeeMeeeeeMeeeettttttttttetttttttttttttttttttttttttttttttttttttttt'.split(''),
      'tteeeeeeeeeMwMeeeetteeeeeeeetttttttttttttttttttttttttttttttttttttttt'.split(''),
      'wwMeeeeeeeeMwwMeeMteeeeeeeeeeeettttttttttttttttttttttttttttttttttttt'.split(''),
      'wwwMeeeeeeeeMMeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeM'.split(''),
      'wwwMeeeeeeeeeeeeeeeetttttttteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeMM'.split(''),
      'wwwMeeeeeeeeeeeeeeettttttttttteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeM'.split(''),
      'wwMeeeeeeeeeeeeeeetttttttttttttttetttttttttttttttttttteeettttttttttt'.split(''),
      'wwteeeeeeeeeeeeeeetttttttttttttttetttttttttttttttttttteeettttttttttt'.split(''),
      'wwteeeeeeeeeeeeeettttttttttttttttetttttttttttttttttttteeettttttttttt'.split(''),
      'wwtttttttttttttttttttttttttttttttetttttttttttttttttttteeettttttttttt'.split(''),
      'wwtttttttttttttttttttttttttttttteetttttttttttttttttttteeettttttttttt'.split(''),
      'wwtttttttttttttttttttttttttttttttetttttttttttttttttttteeettttttttttt'.split(''),
      'wwtttttttttttttttttttttttttttteeeetttttttttttttttttttteeettttttttttt'.split(''),
      'wwttttttttttttttttttttteeeeeeeettttttttttttttttttttttteeettttttttttt'.split(''),
      'wwtttttttttttttttttttttteeeeettwwwwtttwwwwttttttttttttMMMttttttttttt'.split(''),
      'wwtttttttttttttttttttttteeeeettwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'.split(''),
      'wwwwwMttttttttttttttttttwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'.split(''),
      'wwwwwwwwwtMMMtwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'.split(''),
      'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwttttwwwttttwwwwwwwwwwwwMMMwwwwwwwwwww'.split(''),
      'tttttwwwwwwwwwwwwttttttwwwwwtttttttttttttttttttttttttttttttttttttttt'.split(''),
      'tttttttttwwwwwttttttttttwwwwwttttttttttttttttttttttttttttttttttttttt'.split(''),
      'tttttttttttttttttttttttttwwwwwtttttttttttttttttttttttttttttttttttttt'.split(''),
      'ttttttttttttttttttttttttttwwwwwttttttttttttttttttttttttttttttttttttt'.split(''),
      'tttttttttttttttttttttttttttwwwwwtttttttttttttttttttttttttttttttttttt'.split(''),
      'ttttttttttttttttttttttttttttwwwwwttttttttttttttttttttttttttttttttttt'.split(''),
      'tttttttttttttttttttttttttttttwwwwttttttttttttttttttttttttttttttttttt'.split(''),
      'tttttttttttttttttttttttttttttwwwwttttttttttttttttttttttttttttttttttt'.split(''),
    ],
    [
      '#######################'.split(''),
      '#eeeeeeeeeeeeeeeeeeeee#'.split(''),
      '#eeeeeeeeeeeeeeeeeeeee#'.split(''),
      '#fffffffffeeefffffffff#'.split(''),
      '#eeeeeeeeeeeeeeeeeeeee#'.split(''),
      '#eeeeeeeeeeeeeeeeeeeee#'.split(''),
      '#eeeeeeeeeeeeeeeeeeeee#'.split(''),
      '##########:############'.split(''),
    ],
    [
      '####################################################################'.split(''),
      '#                                                                  #'.split(''),
      '#   #######      #                                                 #'.split(''),
      '#   #     #      ##                                                #'.split(''),
      '#   #     #      # #                                               #'.split(''),
      '#   ###:###      #  #                                              #'.split(''),
      '#                #   #                                             #'.split(''),
      '#                     #                                            #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#########################:##########################################'.split(''),
    ],
    [
      '#################################################'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#       :                                       #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#                                               #'.split(''),
      '#################################################'.split(''),
    ],
    [
      '##########'.split(''),
      '#        #'.split(''),
      '#        #'.split(''),
      '#        #'.split(''),
      '######:###'.split(''),
    ],
  ],

  player: {
    direction: 'south',
    xCoordinate: 4,
    yCoordinate: 8,
    xScreen: 160,
    yScreen: 320,
    tilePlacedOn: 'e',
    map: 0,
    health: 100,
    mana: 50,
    stamina: 50,
    inventory: [
      { id: 5, amount: 30 },
      { id: 1, amount: 1 },
      // { id: 0, amount: 1 },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const Reducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'RESET_GAME':
      return defaultState;
    case 'UPDATE_PLAYER_COORDS':
      return {
        ...state,
        player: {
          direction: state.player.direction,
          xCoordinate: action.updatePlayerCoords[0],
          yCoordinate: action.updatePlayerCoords[1],
          xScreen: state.player.xScreen,
          yScreen: state.player.yScreen,
          tilePlacedOn: state.player.tilePlacedOn,
          map: state.player.map,
          health: state.player.health,
          mana: state.player.mana,
          stamina: state.player.stamina,
          inventory: state.player.inventory,
        },
      };
    case 'UPDATE_PLAYER_INVENTORY':
      return {
        ...state,
        player: {
          direction: state.player.direction,
          xCoordinate: state.player.xCoordinate,
          yCoordinate: state.player.yCoordinate,
          xScreen: state.player.xScreen,
          yScreen: state.player.yScreen,
          tilePlacedOn: state.player.tilePlacedOn,
          map: state.player.map,
          health: state.player.health,
          mana: state.player.mana,
          stamina: state.player.stamina,
          inventory: action.updatePlayerInventory,
        },
      };
    case 'UPDATE_PLAYER_DIRECTION':
      return {
        ...state,
        player: {
          direction: action.updatePlayerDirection,
          xCoordinate: state.player.xCoordinate,
          yCoordinate: state.player.yCoordinate,
          xScreen: state.player.xScreen,
          yScreen: state.player.yScreen,
          tilePlacedOn: state.player.tilePlacedOn,
          map: state.player.map,
          health: state.player.health,
          mana: state.player.mana,
          stamina: state.player.stamina,
          inventory: state.player.inventory,
        },
      };
    case 'UPDATE_PLAYER_MAP':
      return {
        ...state,
        player: {
          direction: state.player.direction,
          xCoordinate: state.player.xCoordinate,
          yCoordinate: state.player.yCoordinate,
          xScreen: state.player.xScreen,
          yScreen: state.player.yScreen,
          tilePlacedOn: state.player.tilePlacedOn,
          map: action.updatePlayerMap,
          health: state.player.health,
          mana: state.player.mana,
          stamina: state.player.stamina,
          inventory: state.player.inventory,
        },
      };
    case 'UPDATE_MAP':
      return {
        ...state,
        overworld: action.updateMap,
      };
    case 'SET_PLAYER_TILE_PLACED':
      return {
        ...state,
        player: {
          direction: state.player.direction,
          xCoordinate: state.player.xCoordinate,
          yCoordinate: state.player.yCoordinate,
          xScreen: state.player.xScreen,
          yScreen: state.player.yScreen,
          tilePlacedOn: action.setPlayerTilePlaced,
          map: state.player.map,
          health: state.player.health,
          mana: state.player.mana,
          stamina: state.player.stamina,
          inventory: state.player.inventory,
        },
      };
    case 'SET_DIALOG_VISIBILITY':
      return {
        ...state,
        isDialogVisible: action.setDialogVisibility,
      };
    case 'SET_DIALOG_TEXT':
      return {
        ...state,
        dialog: {
          speaker: action.setDialogSpeaker,
          text: action.setDialogText,
        },
      };
    case 'SET_INVENTORY_VISIBILITY':
      return {
        ...state,
        isInventoryVisible: action.setInventoryVisibility,
      };
    default:
      return state;
  }
};
