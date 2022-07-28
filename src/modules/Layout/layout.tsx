import React, { useEffect, useState } from 'react';

import Toggle from '@components/Toggle/toggle';
import { useDispatch, useSelector } from 'react-redux';
import { setInitPosition } from '@redux/actions/actionCreator';
import { StoreDTO } from '@redux/interfaces/store.interface';

type Props = {
  children: JSX.Element
}

function Layout({ children }: Props) {
  const [isEditMode, setEditMode] = useState(false);
  const [isEditPositionMode, setEditPositionMode] = useState(false);
  const position = useSelector((state: StoreDTO) => state.position);
  const [positionCoordinates, setPositionCoordinates] = useState(position);
  const [isMount, setIsMount] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMount(true);
  }, []);

  const handleEditPositionMode = () => setEditPositionMode(!isEditPositionMode);

  const savePosition = () => { dispatch(setInitPosition(positionCoordinates)); handleEditPositionMode(); };

  const childrenWithAddedProps = React.cloneElement(children, { isEditMode, isEditPositionMode, setPositionCoordinates });

  return (
    <>
      <div className="bg-gray-light">
        <h1 className="text-center text-purple h1">Company Structure</h1>
        <div className={`flex ${isEditMode ? 'justify-between' : 'justify-end'}`}>
          {isEditMode && !isEditPositionMode && (
            <button
              className="btn btn-sm btn-active btn-primary mx-2"
              onClick={handleEditPositionMode}
            >Change init structure position
            </button>
          )}
          {isEditPositionMode && (
            <div className="flex gap-2 mx-2">
              <button className="btn btn-sm btn-active btn-primary" onClick={savePosition}>Save position</button>
              <button className="btn btn-sm btn-outline" onClick={handleEditPositionMode}>Cancel</button>
            </div>
          )}
          <Toggle isEditMode={isEditMode} setEditMode={setEditMode} />
        </div>
      </div>
      {isMount && childrenWithAddedProps }
    </>
  );
}

export default Layout;
