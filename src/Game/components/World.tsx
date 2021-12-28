import { AppState } from '../..';
import { useAppSelector } from '../../Store/AppState';

interface WorldProps {}

const World = (props: WorldProps) => {
  const player = useAppSelector((state: AppState) => state.player);
  const gameWorld = useAppSelector((state: AppState) => state.overworld);

  const gridsquare = (gridclass: string, indexX: number, indexY: number, worldIndex: number) => {
    let classString = gridclass;

    if (gridclass === 'player') {
      classString = `${gridclass}`;
      return (
        <div className={`${classString}`} id={`${indexX},${indexY},${worldIndex}`}>
          <div className={`players ${player.direction}`} id="players"></div>{' '}
        </div>
      );
    }

    return (
      <div className={`gridTile ${classString}`} id={`${indexX},${indexY},${worldIndex}`}>
        {' '}
      </div>
    );
  };

  const mapGridType = (indexX: number, indexY: number, worldIndex: number) => {
    // if (indexX === player.yCoordinate && indexY === player.xCoordinate) {
    //   return gridsquare('player', indexY, indexX, worldIndex);
    // }

    switch (gameWorld[worldIndex][indexY][indexX]) {
      case '#':
        return gridsquare('border', indexY, indexX, worldIndex);
      case '1':
        return gridsquare('wall', indexY, indexX, worldIndex);
      case ' ':
        return gridsquare('empty', indexY, indexX, worldIndex);
      case ':':
        return gridsquare('door', indexY, indexX, worldIndex);
      case '-':
        return gridsquare('attac', indexY, indexX, worldIndex);
      case 't':
        return gridsquare('tree', indexY, indexX, worldIndex);
      case 'M':
        return gridsquare('boulder', indexY, indexX, worldIndex);
      case 'x':
        return gridsquare('enemy', indexY, indexX, worldIndex);
      case 'p':
        return gridsquare('player', indexY, indexX, worldIndex);
    }
  };

  const renderX = (indexY: number, row: string[]) => {
    return (
      <div className="gridRow" key={`${indexY - 1}`}>
        {row.map((column: unknown, indexX: number) => {
          if (gameWorld[player.map][indexY].length < 34 || player.xCoordinate < 15) {
            while (indexX < 34) {
              return mapGridType(indexX, indexY, player.map);
            }
          } else if (player.xCoordinate > gameWorld[player.map][indexY].length - 20) {
            while (indexX > gameWorld[player.map][indexY].length - 35) {
              return mapGridType(indexX, indexY, player.map);
            }
          } else {
            while (
              indexX > player.xCoordinate - 15 &&
              indexX < gameWorld[player.map][indexY].length
            ) {
              return mapGridType(indexX, indexY, player.map);
            }
          }
        })}
      </div>
    );
  };

  const renderWorld = () => {
    return (
      <>
        {gameWorld[player.map]?.map((row, indexY) => {
          if (gameWorld[player.map].length < 21 || player.yCoordinate < 10) {
            while (indexY < 20) {
              return renderX(indexY, row);
            }
          } else if (player.yCoordinate > gameWorld[player.map].length - 10) {
            while (indexY > gameWorld[player.map].length / 2) {
              return renderX(indexY, row);
            }
          } else {
            while (indexY > player.yCoordinate - 10 && indexY < player.yCoordinate + 30) {
              return renderX(indexY, row);
            }
          }
        })}
      </>
    );
  };

  return renderWorld();
};

export { World };
