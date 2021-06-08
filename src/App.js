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
          map[y][x] = '.';
        }
      }
    }
  }

  return map;
}

const App = () => {
  const gameMap = createGameMap(10, 25);
  const [state, setState] = useState(gameMap);
  const [keyDown, setKeyDown] = useState(null);

  
  useEffect(() => {
    document.addEventListener('keydown', (e)=>{
      console.log("onkeydown:", e);
      setKeyDown(e);
    });

    document.addEventListener('keyup', (e)=>{
      console.log('onkeyup');
      setKeyDown(null);
    });

    setInterval(() => {
      movement();
    }, 500);
  }, []);

  const movement = () => {
    
    if (keyDown !== null)
      console.log(keyDown);
  }

  return (
    <div className="wrapper">
      <div className="gameMap">
        {state.map((item) => (
          <div className="row" key={item.id}>
            {Object.values(item).map((val) => (
              <div className="cell ${val == '#' ? 'wall' : 'empty'}">{val}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
