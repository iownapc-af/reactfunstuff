import { PlayerDirection } from '../Game/systems/InputHandler';
import { Action } from './action';

interface State {
  indexMap: number;
  isInventoryVisible: boolean;

  overworld: string[][][];

  player: {
    direction: PlayerDirection;
    xCoordinate: number;
    yCoordinate: number;
    tilePlacedOn: string;
    map: number;
    health: number;
    mana: number;
    stamina: number;
    inventory: { id: number; amount: number }[];
  };
}

export const defaultState: State = {
  indexMap: 0,
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
      'wwttttttttttttttttttttteeeeeettttttttttttttttttttttttteeettttttttttt'.split(''),
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
      '####################################################################'.split(''),
      '#                                                                  #'.split(''),
      '#    11111            #                                            #'.split(''),
      '#   1111111    #                                                   #'.split(''),
      '#   1111111                                                        #'.split(''),
      '#   111:111    #                                                   #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#   p                                                              #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                               M                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#      ttttttttttttttttttttttttt t t t t t t t                     #'.split(''),
      '#                                                                  #'.split(''),
      '#                        :                                         #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                   M                              #'.split(''),
      '#               M      M                                           #'.split(''),
      '#                     MM      M                                    #'.split(''),
      '#            M                                                     #'.split(''),
      '#                                                                  #'.split(''),
      '#        M                M     M                                  #'.split(''),
      '#      t t t t t t t t t t t t t t t t t t t t                     #'.split(''),
      '#     t t t t t t t t t t t t t t t t t t t t                      #'.split(''),
      '#        t t t t t t t t t t t t t t t t t t t t                   #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '####################################################################'.split(''),
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
    tilePlacedOn: 'e',
    map: 0,
    health: 100,
    mana: 50,
    stamina: 50,
    inventory: [
      { id: 5, amount: 30 },
      { id: 2, amount: 1 },
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
          tilePlacedOn: state.player.tilePlacedOn,
          map: state.player.map,
          health: state.player.health,
          mana: state.player.mana,
          stamina: state.player.stamina,
          inventory: state.player.inventory,
        },
      };
    case 'UPDATE_PLAYER_DIRECTION':
      return {
        ...state,
        player: {
          direction: action.updatePlayerDirection,
          xCoordinate: state.player.xCoordinate,
          yCoordinate: state.player.yCoordinate,
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
    case 'SET_INVENTORY_VISIBILITY':
      return {
        ...state,
        isInventoryVisible: action.setInventoryVisibility,
      };
    case 'SET_PLAYER_TILE_PLACED':
      return {
        ...state,
        player: {
          direction: state.player.direction,
          xCoordinate: state.player.xCoordinate,
          yCoordinate: state.player.yCoordinate,
          tilePlacedOn: action.setPlayerTilePlaced,
          map: state.player.map,
          health: state.player.health,
          mana: state.player.mana,
          stamina: state.player.stamina,
          inventory: state.player.inventory,
        },
      };
    default:
      return state;
  }
};
