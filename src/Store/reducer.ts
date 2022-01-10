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

  overworld: [
    [
      't t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t '.split(''),
      ' t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t'.split(''),
      'ttteeeebbbeeeeet t t t t t eee  t t t t t t t t t t t t t t t t t t '.split(''),
      ' teeeebbbbbeeseet t t t t eeeMet t t t t t t t t t t t t t t t t t t'.split(''),
      't eseebbbbbeeeee t t t t teeeee t t t t t t t t t t t t t t t t t t '.split(''),
      ' teeeebb:bbeseeet t t t t eeee t t t t t t t t t t t t t t t t t t t'.split(''),
      't eMeeeeeeeeeeee t t t t t et t t t t t t t t t t t t t t t t t t t '.split(''),
      ' teeeeeeeeMeeMeet t t t t te t t t t t t t t t t t t t t t t t t t t'.split(''),
      't eeeeeeeeeeeeeeett t t t tet t t t t t t t t t t t t t t t t t t t '.split(''),
      't eeeeMeeeeeMeeeet tttttttte t t t t t t t t t t t t t t t t t t t t'.split(''),
      'tteeeeeeeeeMwMeeeetteeeeeeeet t t t t t t t t t t t t t t t t t t t '.split(''),
      'wwMeeeeeeeeMwwMeeMteeeeeeeeeeeettttttttttttttttttttttttttttttttttttt'.split(''),
      'wwwMeeeeeeeeMMeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeM'.split(''),
      'wwwMeeeeeeeeeeeeeeeetttttttteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeMM'.split(''),
      'wwwMeeeeeeeeeeeeeeett t t tttteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeM'.split(''),
      'wwMeeeeeeeeeeeeeeett t t t t ttttetttttttttttttttttttteeettttttttttt'.split(''),
      'ww eeeeeeeeeeeeeeett t t tt t t tet t t tt t t t      eeet t t t    '.split(''),
      'ww eeeeeeeeeeeeeett t t tt t t t et t t tt t t t      eeet t t t    '.split(''),
      'wwttttttt  t t t t t t t t t t t et t t t t t t t t t eeet t t t t t'.split(''),
      'wwt t t t  t t tt t t tt t t t  eet t t tt t t t      eeet t t t    '.split(''),
      'wwt t t t t t t t t t t t t t t  et t t tt t t tt t t teeet t t t   '.split(''),
      'wwt t t  t t t tt t t t tt    eeeet t t tt t t tt t t teeet t t t   '.split(''),
      'wwt t t t t t tt t t t eeeeeet t t tt t t tt t t t   eeet t t t     '.split(''),
      'wwt t t tt t t tt t t t eeeee  wwwwtttwwwwttttttttttttMMMttttttttttt'.split(''),
      'wwt t t tt t t tt t t t eeeee  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'.split(''),
      'wwwwwMt t t tt t t t    wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'.split(''),
      'wwwwwwwwwtMMMtwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'.split(''),
      'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwttttwwwttttwwwwwwwwwwwwMMMwwwwwwwwwww'.split(''),
      'tttttwwwwwwwwwwwwttttttwwwwwtttttttttttttttttttttttttttttttttttttttt'.split(''),
      'tttttttttwwwwwttttttttttwwwwwttttttttttttttttttttttttttttttttttt    '.split(''),
      'tttttttttttttttttttttttttwwwwwttttttttttttttttttttttttttttttttttt   '.split(''),
      'ttttttttttttttttttttttttttwwwwwttttttttttttttttttttttttttttttttttt  '.split(''),
      'tttttttttttttttttttttttttttwwwwwttttttttttttttttttttttttttttttttttt '.split(''),
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
      '#      t t t t t t t t t t t t t t t t t t t t                     #'.split(''),
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
    default:
      return state;
  }
};
