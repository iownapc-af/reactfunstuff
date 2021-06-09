import React, { useEffect, useState } from 'react';

const createGameMap = (height, width) => {
  var tempMap = Array.from(Array(height), () => new Array(width));
  return fillGameMap(tempMap);
}

const fillGameMap = (map) => {
  for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map[0].length; x++) {
      map[y][x] = '#';
      if (y > 0 && y < map.length - 1) {
        if (x > 0 && x < map[0].length - 1) {
          map[y][x] = '';
        }
      }
    }
  }

  return map;
}

function init(playerCoords, map) {
  map[playerCoords[0]][playerCoords[1]] = '@';
}

let keyDown = null;
const setKeyDown = (key) => {
  keyDown = key;
}

let playerPosition = [5, 5];
const setPlayerPosition = (position) => {
  playerPosition = position;
}

const App = () => {
  const map = createGameMap(10, 25);
  // const [playerPosition, setPlayerPosition] = useState([5, 5]);
  const [gameMap, setGameMap] = useState(map);
  const [renderToggle, setRenderToggle] = useState(false);
  // const [keyDown, setKeyDown] = useState(null);
  
  init(playerPosition, gameMap);

  useEffect(() => {
    addListeners();
    setInterval(() => {
      if (keyDown !== null)
        movement();
    }, 500);
  return () => (removeListener());
  
  }, [renderToggle]);

  const addListeners = () => {
    document.addEventListener('keydown', (e) => { setKeyDown(e); });
    document.addEventListener('keyup', (e) => { setKeyDown(null); });
  }

  const removeListener = () => {
    document.removeEventListener('keydown', (e) => { setKeyDown(e); });
    document.removeEventListener('keyup', (e) => { setKeyDown(null); });
  }

  // handle what happens after keypress
  const movement = () => {
    console.log(keyDown);
    setRenderToggle(!renderToggle);

    if (keyDown.key === 'w')
      setPlayerPosition([playerPosition[0]-1, playerPosition[1]]);
    if (keyDown.key === 's')
      setPlayerPosition([playerPosition[0]+1, playerPosition[1]]);
    if (keyDown.key === 'a') // left
      setPlayerPosition([playerPosition[0], playerPosition[1]-1]);
    if (keyDown.key === 'd') // right
      setPlayerPosition([playerPosition[0], playerPosition[1]+1]);
  }

  // Display
  return (
    <div className="wrapper">
      <div className="gameMap">
        {gameMap.map((item) => (
          <div className="row" key={item.id}>
            {Object.values(item).map((val) => (
              <div className={val === '#' ? 'cell wall' : 'cell empty'}>{val}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

/*
keydown { target: body
, key: "d", charCode: 0, keyCode: 68 }
App.js:37
keydown { target: body
, key: "a", charCode: 0, keyCode: 65 }
App.js:37
keydown { target: body
, key: "w", charCode: 0, keyCode: 87 }
App.js:37
keydown { target: body, key: "s", charCode: 0, keyCode: 83 }
*/