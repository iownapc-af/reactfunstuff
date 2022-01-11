import { useEffect, useState } from 'react';
import { AppState, useAppDispatch, useAppSelector } from '../../../../Store/AppState';
import '../Interface.scss';

const UserInterface = () => {
  const dispatch = useAppDispatch();
  const isDialogVisible = useAppSelector((state: AppState) => state.isDialogVisible);
  const dialogText = useAppSelector((state: AppState) => state.dialogText);

  const [dialogCounter, setDialogCounter] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', dialogControl, false);

    return () => {
      document.removeEventListener('keydown', dialogControl, false);
    };
  });

  const dialogControl = (e: KeyboardEvent) => {
    if (isDialogVisible && e.key) {
      if (dialogText.length - 1 > dialogCounter) setDialogCounter(dialogCounter + 1);
      else dispatch({ type: 'SET_DIALOG_VISIBILITY', setDialogVisibility: false });
    } else setDialogCounter(0);
  };

  return (
    <>
      {isDialogVisible ? (
        <div className="interface dialog">{dialogText[dialogCounter]}</div>
      ) : (
        <></>
      )}
    </>
  );
};

export { UserInterface };
