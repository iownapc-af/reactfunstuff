import { Npcs } from '../components/Npcs';
import { Player } from '../components/Player';
import { World } from '../components/World';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const player = { renderer: <Player /> };
  const world = { renderer: <World /> };
  const npcs = { renderer: <Npcs /> };

  const entities = {
    player,
    world,
    npcs,
  };

  return entities;
};
