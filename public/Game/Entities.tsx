import { Camera } from './components/Camera';
import { Npcs } from './components/Npcs';
// import { World } from './components/World';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const camera = { renderer: <Camera /> };
  // const world = { renderer: <World worldIndex={0} /> };
  const npcs = { renderer: <Npcs /> };

  const entities = {
    camera,
    // world,
    npcs,
  };

  return entities;
};
