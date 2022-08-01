import React from 'react';

type Props = {
  name: string, closeModal: () => void, removeNode: () => void,
}

function ConfirmModal({ name, closeModal, removeNode }: Props) {
  const onSubmit = () => {
    removeNode();
    closeModal();
  };
  return (
    <>
      <input type="checkbox" id="confirmModal" className="modal-toggle" checked={!!name} onChange={() => {}} />
      <label htmlFor="confirmModal" className="modal cursor-pointer" id="confirmModalLabel">
        <div className="modal-box relative">
          <div
            className="closeBtn"
            onClick={closeModal}
            role="presentation"
            data-testid="closeBtn"
          >✕
          </div>
          <h3 className="text-lg font-bold" data-testid="title">Do you want to delete {name}?</h3>
          <div className="flex gap-3 justify-end mt-3">
            <button className="primaryBtn" onClick={onSubmit} data-testid="positiveBtn">Yes</button>
            <button className="outlineBtn" onClick={closeModal} data-testid="negativeBtn">Cancel</button>
          </div>
        </div>
      </label>
    </>
  );
}

export default ConfirmModal;
