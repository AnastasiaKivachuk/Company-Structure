import React from 'react';

type Props = {
  isEditMode: boolean, setEditMode: (val: boolean) => void
}

function Toggle({ isEditMode, setEditMode }: Props) {
  return (
    <label className="label cursor-pointer mx-2 flex gap-2 items-center" role="presentation" htmlFor="checkbox">
      <span className="label-text" data-testid="labelText">Edit mode: </span>
      <input
        id="checkbox"
        type="checkbox"
        className="toggle toggle-primary"
        checked={isEditMode}
        onChange={() => setEditMode(!isEditMode)}
        data-testid="input"
      />
    </label>
  );
}

export default Toggle;
