import { PlayerDirection } from '../Game/systems/Movement';
import { Action } from './action';

interface State {
  indexMap: number;
  overworld: string[][][];
  rooms: string[][][];

  player: {
    direction: PlayerDirection;
    xCoordinate: number;
    yCoordinate: number;
    map: number;
    health: number;
    mana: number;
    stamina: number;
  };
}

export const defaultState: State = {
  indexMap: 0,
  overworld: [
    [
      '####################################################################'.split(''),
      '#p                                                                 #'.split(''),
      '#    11111            #                                            #'.split(''),
      '#   1111111    #                                                   #'.split(''),
      '#   1111111                                                        #'.split(''),
      '#   111:111    #                                                   #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
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
      '#                                    t t t t t                     #'.split(''),
      '#                                                                  #'.split(''),
      '#                        :                                         #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
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
      '####################################################################'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '#                                                                  #'.split(''),
      '####################################################################'.split(''),
    ],
  ],

  rooms: [
    [
      '##########'.split(''),
      '#        #'.split(''),
      '# ##     #'.split(''),
      '#        #'.split(''),
      '####:#####'.split(''),
    ],
    [
      '##########'.split(''),
      '#     ## #'.split(''),
      '#        #'.split(''),
      '#        #'.split(''),
      '##########'.split(''),
    ],
  ],

  player: {
    direction: 'south',
    xCoordinate: 1,
    yCoordinate: 1,
    map: 0,
    health: 100,
    mana: 50,
    stamina: 50,
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
        },
      };
    case 'UPDATE_MAP':
      return {
        ...state,
        overworld: action.updateMap,
      };
    default:
      return state;
  }
};
