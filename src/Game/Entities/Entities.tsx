import { Npcs } from '../components/Npcs';
import { World } from '../components/World';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const world = { renderer: <World /> };
  const npcs = { renderer: <Npcs /> };

  const entities = {
    world,
    npcs,
  };

  return entities;
};
