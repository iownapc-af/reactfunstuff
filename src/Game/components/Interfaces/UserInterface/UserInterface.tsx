import { useEffect, useState } from 'react';
import { AppState, useAppDispatch, useAppSelector } from '../../../../Store/AppState';
import '../Interface.scss';

const UserInterface = () => {
  const dispatch = useAppDispatch();
  const isDialogVisible = useAppSelector((state: AppState) => state.isDialogVisible);
  const dialog = useAppSelector((state: AppState) => state.dialog);

  const [dialogCounter, setDialogCounter] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', dialogControl, false);

    return () => {
      document.removeEventListener('keydown', dialogControl, false);
    };
  });

  const dialogControl = (e: KeyboardEvent) => {
    if (isDialogVisible && dialog.text && e.key) {
      if (dialog.text.length - 1 > dialogCounter) setDialogCounter(dialogCounter + 1);
      else {
        setTimeout(() => {
          dispatch({ type: 'SET_DIALOG_VISIBILITY', setDialogVisibility: false });
          setDialogCounter(0);
        }, 50);
      }
    }
  };

  return (
    <>
      {isDialogVisible ? (
        <div className="interface dialog">
          <span className="speaker">{dialog.speaker}</span>
          <span className="text">{dialog.text ? dialog.text[dialogCounter] : ''}</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export { UserInterface };
