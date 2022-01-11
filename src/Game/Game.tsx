import { connect } from 'react-redux';
import { PureComponent } from 'react';
import { GameEngine } from './Engine';
import Systems from './systems';
import Entities from './Entities/Entities';
import './Game.scss';
import './Tiles.scss';
import { Inventory } from './components/Interfaces/Inventory/Inventory';
import { UserInterface } from './components/Interfaces/UserInterface/UserInterface';
import { AppState } from '..';

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
        <Inventory />
        <UserInterface />
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isInventoryVisible: state.isInventoryVisible,
});

export default connect(mapStateToProps)(ReactGame);
