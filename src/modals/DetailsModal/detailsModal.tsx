import React from 'react';
import { NodeData } from 'reaflow';

type Props = {
  isEditMode: boolean,
  closeModal: () => void,
  selectedNodeToUpdate: NodeData | null,
  setFromNodeId: (val: string) => void
}

function DetailsModal({ closeModal, selectedNodeToUpdate, isEditMode, setFromNodeId }: Props) {
  return (
    <>
      <input type="checkbox" id="DetailsModal " className="modal-toggle" checked={!!selectedNodeToUpdate} />
      <label htmlFor="DetailsModal" className="modal" id="DetailsModal">
        <div className="modal-box relative">
          <div
            className="closeBtn"
            onClick={closeModal}
            role="presentation"
            data-testid="closeBtn"
          >✕
          </div>
          {selectedNodeToUpdate && (
            <>
              <h2 className="text-center text-2xl py-2" data-testid="title">{(selectedNodeToUpdate as any).properties?.data?.name}</h2>
              <img
                className="w-48 h-48 object-cover m-auto"
                src={(selectedNodeToUpdate as any).properties?.data?.photoUrl}
                alt={(selectedNodeToUpdate as any).properties?.data?.name}
                data-testid="img"
              />
              <p className="text-center text-xl py-2" data-testid="position">{(selectedNodeToUpdate as any).properties?.data?.position}</p>
            </>
          )}

          {isEditMode && (
            <button
              className="primaryBtn flex m-auto"
              onClick={() => setFromNodeId(selectedNodeToUpdate?.id as string)}
              data-testid="updateBtn"
            >Update profile
            </button>
          )}
        </div>
      </label>
    </>
  );
}

export default DetailsModal;
