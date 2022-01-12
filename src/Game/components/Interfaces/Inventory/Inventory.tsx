import { useEffect } from 'react';
import { AppState, useAppDispatch, useAppSelector } from '../../../../Store/AppState';
import './Inventory.scss';
import { ItemComponent } from './ItemComponent';

const Inventory = () => {
  const dispatch = useAppDispatch();
  const isInventoryVisible = useAppSelector((state: AppState) => state.isInventoryVisible);
  const playerInventoryItems = useAppSelector((state: AppState) => state.player.inventory);

  let currentIndex: number = 0;

  useEffect(() => {
    document.getElementById(`inv-item-${currentIndex}`)?.focus();
  }, [currentIndex, isInventoryVisible]);

  useEffect(() => {
    document.addEventListener('keydown', toggleIsGameRunning, false);

    return () => {
      document.removeEventListener('keydown', toggleIsGameRunning, false);
    };
  });

  const toggleIsGameRunning = (e: KeyboardEvent) => {
    if (isInventoryVisible && e.key) {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (currentIndex > 0) currentIndex -= 1;
          break;
        case 's':
        case 'ArrowDown':
          if (currentIndex < playerInventoryItems.length - 1) currentIndex += 1;
          break;
        case 'Escape':
        case 'b':
          dispatch({ type: 'SET_INVENTORY_VISIBILITY', setInventoryVisibility: false });
          break;
      }

      focusCurrentItem();
    }
  };

  const focusCurrentItem = () => {
    document.getElementById(`inv-item-${currentIndex}`)?.focus();
  };

  return (
    <>
      {isInventoryVisible ? (
        <div className="inventory">
          <div className="inventory-header">INVENTORY</div>
          <div className="inventory-items">
            {playerInventoryItems.map((item, index) => {
              return (
                <ItemComponent
                  key={item.id}
                  index={`inv-item-${index}`}
                  id={item.id}
                  amount={item.amount}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export { Inventory };
