import { AppState, useAppSelector } from '../../Store/AppState';
import '../Tiles.scss';

const Player = () => {
  const player = useAppSelector((state: AppState) => state.player);

  return (
    <div
      className="player"
      id={`${player.xCoordinate},${player.yCoordinate},${player.map}`}
      style={{ top: `${player.yScreen}`, left: `${player.xScreen}` }}
    >
      <div className={`player-image ${player.direction}`} id="player" />{' '}
    </div>
  );
};

export { Player };
