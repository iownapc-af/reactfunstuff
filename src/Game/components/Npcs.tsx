import { useEffect } from 'react';
import { AppState } from '../..';
import { useAppDispatch, useAppSelector } from '../../Store/AppState';

export const npcList = [
  {
    id: 0,
    name: 'test_npc',
    spawnCoords: [7, 7, 0],
    currentCoords: [7, 7, 0],
    leash: 5,
    health: 1,
  },
  {
    id: 1,
    name: 'test_npc',
    spawnCoords: [15, 17, 0],
    currentCoords: [15, 17, 0],
    leash: 5,
    health: 1,
  },
  {
    id: 2,
    name: 'test_npc',
    spawnCoords: [10, 20, 0],
    currentCoords: [10, 20, 0],
    leash: 5,
    health: 1,
  },
];

const Npcs = () => {
  const dispatch = useAppDispatch();
  const gameWorld = useAppSelector((state: AppState) => state.overworld);

  const updateNpc = () => {
    return <></>;
  };

  useEffect(() => {
    setInterval(() => {
      npcList.forEach((npc) => {
        npcMove(npc.id);
      });
    }, 750);
  }, []);

  const npcMove = (id: number) => {
    const moveDirection = Math.floor(Math.random() * 6);

    checkMovement(id, moveDirection);
  };

  const checkMovement = (id: number, moveDirections: number) => {
    const updatedGameWorld = gameWorld;

    updatedGameWorld[npcList[id].currentCoords[2]][npcList[id].currentCoords[0]][
      npcList[id].currentCoords[1]
    ] = ' ';

    switch (moveDirections) {
      case 0: // up
        if (
          returnMapTile(
            npcList[id].currentCoords[2],
            npcList[id].currentCoords[0] - 1,
            npcList[id].currentCoords[1]
          )
        ) {
          npcList[id].spawnCoords = npcList[id].currentCoords;
          // npcList[id].moveDirection = 'north';
          npcList[id].currentCoords = [
            npcList[id].currentCoords[0] - 1,
            npcList[id].currentCoords[1],
            npcList[id].currentCoords[2],
          ];
        }
        break;
      case 1: // down
        if (
          returnMapTile(
            npcList[id].currentCoords[2],
            npcList[id].currentCoords[0] + 1,
            npcList[id].currentCoords[1]
          )
        ) {
          npcList[id].spawnCoords = npcList[id].currentCoords;
          // npcList[id].moveDirection = 'south';
          npcList[id].currentCoords = [
            npcList[id].currentCoords[0] + 1,
            npcList[id].currentCoords[1],
            npcList[id].currentCoords[2],
          ];
        }
        break;
      case 2: // left
        if (
          returnMapTile(
            npcList[id].currentCoords[2],
            npcList[id].currentCoords[0],
            npcList[id].currentCoords[1] - 1
          )
        ) {
          npcList[id].spawnCoords = npcList[id].currentCoords;
          // npcList[id].moveDirection = 'west';
          npcList[id].currentCoords = [
            npcList[id].currentCoords[0],
            npcList[id].currentCoords[1] - 1,
            npcList[id].currentCoords[2],
          ];
        }
        break;
      case 3: // right
        if (
          returnMapTile(
            npcList[id].currentCoords[2],
            npcList[id].currentCoords[0],
            npcList[id].currentCoords[1] + 1
          )
        ) {
          npcList[id].spawnCoords = npcList[id].currentCoords;
          // npcList[id].moveDirection = 'east';
          npcList[id].currentCoords = [
            npcList[id].currentCoords[0],
            npcList[id].currentCoords[1] + 1,
            npcList[id].currentCoords[2],
          ];
        }
        break;
      case 4: // Doesn't move if 4/5 are rolled
      case 5:
        break;
    }

    updatedGameWorld[npcList[id].currentCoords[2]][npcList[id].currentCoords[0]][
      npcList[id].currentCoords[1]
    ] = 'x';
    dispatch({ type: 'UPDATE_MAP', updateMap: updatedGameWorld });

    return false;
  };

  const returnMapTile = (indexMap: number, indexY: number, indexX: number) => {
    if (gameWorld[indexMap][indexY][indexX] == ' ') return true; // return gameWorld[indexMap][indexY][indexX]

    return false;
  };

  return updateNpc();
};

export { Npcs };
