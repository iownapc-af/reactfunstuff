import { useEffect } from 'react';
import { AppState } from '../..';
import { useAppDispatch, useAppSelector } from '../../Store/AppState';
import { npcList } from '../Entities/EntityList';

const Npcs = () => {
  const dispatch = useAppDispatch();
  const gameWorld = useAppSelector((state: AppState) => state.overworld);
  const currentGameWorld = useAppSelector((state: AppState) => state.player.map);
  const isInventoryOpen = useAppSelector((state: AppState) => state.isInventoryVisible);

  const updateNpc = () => {
    return <></>;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      npcList.forEach((npc) => {
        calculateNpcMovement(npc.id);
      });
    }, 50);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInventoryOpen]);

  const calculateNpcMovement = (id: number) => {
    if (isInventoryOpen) {
      return;
    }

    const moveDirection = Math.floor(Math.random() * 6);
    checkMovement(id, moveDirection);
  };

  const checkMovement = (id: number, moveDirections: number) => {
    const updatedGameWorld = gameWorld;

    updatedGameWorld[npcList[id].currentCoords[2]][npcList[id].currentCoords[0]][
      npcList[id].currentCoords[1]
    ] = npcList[id].tilePlacedOn;

    switch (moveDirections) {
      case 0: // up
        moveNpc(id, -1, 0);
        break;
      case 1: // down
        moveNpc(id, 1, 0);
        break;
      case 2: // left
        moveNpc(id, 0, -1);
        break;
      case 3: // right
        moveNpc(id, 0, 1);
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

  const moveNpc = (id: number, indexY: number, indexX: number) => {
    if (
      returnMapTile(indexX + npcList[id].currentCoords[1], indexY + npcList[id].currentCoords[0]) &&
      isWithinLeash(id)
    ) {
      replaceMapTileOnMove(id, indexX, indexY);
      setTilePlacedOn(id, indexX, indexY);

      npcList[id].currentCoords = [
        npcList[id].currentCoords[0] + indexY,
        npcList[id].currentCoords[1] + indexX,
        npcList[id].currentCoords[2],
      ];
    }
  };

  const isWithinLeash = (id: number) => {
    return (
      npcList[id].currentCoords[0] - 1 - npcList[id].spawnCoords[0] < npcList[id].leash &&
      npcList[id].currentCoords[0] + 1 - npcList[id].spawnCoords[0] < npcList[id].leash &&
      npcList[id].currentCoords[1] - 1 - npcList[id].spawnCoords[1] < npcList[id].leash &&
      npcList[id].currentCoords[1] + 1 - npcList[id].spawnCoords[1] < npcList[id].leash
    );
  };

  const replaceMapTileOnMove = (npcId: number, indexX: number, indexY: number) => {
    const updatedGameWorld = gameWorld;
    updatedGameWorld[currentGameWorld][indexY][indexX] = npcList[npcId].tilePlacedOn;
    dispatch({ type: 'UPDATE_MAP', updateMap: updatedGameWorld });
  };

  const setTilePlacedOn = (npcId: number, indexX: number, indexY: number) => {
    npcList[npcId].tilePlacedOn = gameWorld[currentGameWorld][indexY][indexX];
  };

  const returnMapTile = (indexX: number, indexY: number) => {
    if (
      gameWorld[currentGameWorld][indexY][indexX] === ' ' ||
      gameWorld[currentGameWorld][indexY][indexX] === 'e'
    ) {
      return true;
    }

    return false;
  };

  return updateNpc();
};

export { Npcs };
