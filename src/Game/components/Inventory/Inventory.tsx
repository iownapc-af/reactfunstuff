import { useEffect } from 'react';
import { store } from '../../..';
import './Inventory.scss';

const Inventory = () => {
  const isInventoryVisible = store.getState().isInventoryVisible.valueOf();

  useEffect(() => {
    document.addEventListener('keydown', toggleIsGameRunning, false);

    return () => {
      document.removeEventListener('keydown', toggleIsGameRunning, false);
    };
  });

  const toggleIsGameRunning = (e: KeyboardEvent) => {
    // e.preventDefault();
    if (isInventoryVisible && e.key) {
      if (e.key === 'b') {
        store.dispatch({ type: 'SET_INVENTORY_VISIBILITY', setInventoryVisibility: false });
      }
    }
  };

  return (
    <>
      {isInventoryVisible ? (
        <div className="inventory">
          <div className="paused" id="paused">
            PAUSED
          </div>
          <div className="inventory-wrapper">
            <div className="inventory-header">INVENTORY</div>
            <div className="inventory-item">Test Item #1</div>
            <div className="inventory-item">Test Item #2</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export { Inventory };
