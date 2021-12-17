import { store } from '../..';
import { World } from './World';

const Camera = () => {
  const playerX = store.getState().player.xCoordinate;
  const playerY = store.getState().player.yCoordinate;

  // odd view height/width so player is centered
  // const cameraViewX = 31;
  // const cameraViewY = 21;

  let cameraPositionLeft = 15;
  let cameraPositionTop = 10;

  const calcCameraPosition = () => {
    if (playerX < 15) {
      cameraPositionLeft = Math.abs(playerX - cameraPositionLeft);
    }

    if (playerX > 53) {
      cameraPositionLeft += playerX;
    }

    if (playerY < 10) {
      cameraPositionTop = Math.abs(playerY - cameraPositionTop);
    }

    if (playerY > 30) {
      cameraPositionTop -= 39 - playerY;
    }

    console.log(cameraPositionLeft, cameraPositionTop);
  };

  const drawCamera = () => {
    calcCameraPosition();

    return (
      <>
        <World cameraPositionLeft={cameraPositionLeft} cameraPositionTop={cameraPositionTop} />
      </>
    );
  };

  return drawCamera();
};

export { Camera };
