/* eslint-disable react/no-unused-state */
import { PureComponent } from 'react';
import { GameEngine } from './Engine';
import Systems from './systems';
import Entities from './Entities';
import './Game.scss';
import './Tiles.scss';

export default class ReactGame extends PureComponent {
  // start npc movement 

  render() {
    return (
      <div className="game-render-wrapper">
        <GameEngine className="game-render-window" systems={Systems} entities={Entities()} />
      </div>
    );
  }
}
