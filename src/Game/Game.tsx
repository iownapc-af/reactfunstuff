/* eslint-disable react/no-unused-state */
import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { GameEngine } from './Engine';
import Systems from './systems';
import Entities from './Entities';
import './Game.scss';
import './Tiles.scss';
import { AppState } from '..';
import { Inventory } from './components/Inventory/Inventory';

interface Props {
  isInventoryVisible: boolean;
}

export class ReactGame extends PureComponent<Props> {
  render() {
    return (
      <>
        {' '}
        <div className="game-render-wrapper">
          <GameEngine
            className="game-render-window"
            systems={!this.props.isInventoryVisible ? Systems : []}
            entities={Entities()}
            running={!this.props.isInventoryVisible}
          />
        </div>
        {this.props.isInventoryVisible ? <Inventory /> : <></>}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isInventoryVisible: state.isInventoryVisible,
});

export default connect(mapStateToProps)(ReactGame);
