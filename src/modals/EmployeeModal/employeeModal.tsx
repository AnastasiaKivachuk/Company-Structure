import React, { ChangeEventHandler, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { EmployeeInterfaces } from '@modules/MainPage/interfaces/employee.interfaces';
import { NodeData } from 'reaflow';
import { FIELD_NAMES, schema } from './validation/employeeModal.validation';

type Props = {
  closeModal: () => void, handleAddNodes: (data: EmployeeInterfaces) => void
  fromNodeId: string,
  handleUpdateNodes: (data: EmployeeInterfaces) => void,
  selectedNodeToUpdate: NodeData | null
}

function EmployeeModal({ closeModal, handleAddNodes, fromNodeId, handleUpdateNodes, selectedNodeToUpdate }: Props) {

  const defaultValues = useMemo(() => ({
    [FIELD_NAMES.NAME]: (selectedNodeToUpdate as any)?.properties?.data?.name || '',
    [FIELD_NAMES.POSITION]: (selectedNodeToUpdate as any)?.properties?.data?.position || '',
    [FIELD_NAMES.PHOTO_URL]: (selectedNodeToUpdate as any)?.properties?.data?.photoUrl || '',
  }), [selectedNodeToUpdate]);
  const {
    setValue, handleSubmit, setError, control, reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  useEffect(() => {
    reset(defaultValues);
  }, [selectedNodeToUpdate]);

  const onSubmit = (data: any) => {
    if (selectedNodeToUpdate) {
      handleUpdateNodes(data);
    } else { handleAddNodes(data); }
    closeModal();
    reset();
  };

  const onValueChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setError(event.target.name, { message: '' });
    setValue(event.target.name, event.target.value);
  };

  return (
    <>
      <input type="checkbox" id="employeeModal " className="modal-toggle" checked={!!fromNodeId} onChange={() => {}} />
      <label htmlFor="employeeModal" className="modal" id="employeeLabel">
        <div className="modal-box relative">
          <div
            className="closeBtn"
            onClick={closeModal}
            role="presentation"
            data-testid="closeBtn"
          >✕
          </div>
          <h3 className="text-lg font-bold" data-testid="title">{ selectedNodeToUpdate ? 'Edit' : 'Add New' } Employee</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={FIELD_NAMES.NAME}
              control={control}
              render={({ field: { value }, fieldState: { error } }) => (
                <div className="wrapInput">
                  <label className="label" htmlFor={FIELD_NAMES.NAME}>
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    className={`inputClass ${error?.message ? 'input-error' : ''}`}
                    required
                    id={FIELD_NAMES.NAME}
                    name={FIELD_NAMES.NAME}
                    value={value}
                    onChange={onValueChange}
                    data-testid="fieldName"
                  />
                  {error?.message && <div className="error">{error?.message}</div>}
                </div>
              )}
            />
            <Controller
              name={FIELD_NAMES.POSITION}
              control={control}
              render={({ field: { value }, fieldState: { error } }) => (
                <div className="wrapInput">
                  <label className="label" htmlFor={FIELD_NAMES.POSITION}>
                    <span className="label-text">Position</span>
                  </label>
                  <input
                    className={`inputClass ${error?.message ? 'input-error' : ''}`}
                    id={FIELD_NAMES.POSITION}
                    required
                    name={FIELD_NAMES.POSITION}
                    value={value}
                    onChange={onValueChange}
                  />
                  {error?.message && <div className="error">{error?.message}</div>}
                </div>
              )}
            />
            <Controller
              name={FIELD_NAMES.PHOTO_URL}
              control={control}
              render={({ field: { value }, fieldState: { error } }) => (
                <div className="wrapInput">
                  <label className="label" htmlFor={FIELD_NAMES.PHOTO_URL}>
                    <span className="label-text">Photo url</span>
                  </label>
                  <input
                    id={FIELD_NAMES.PHOTO_URL}
                    className={`inputClass ${error?.message ? 'input-error' : ''}`}
                    required
                    name={FIELD_NAMES.PHOTO_URL}
                    value={value}
                    onChange={onValueChange}
                  />
                  {error?.message && <div className="error">{error?.message}</div>}
                </div>
              )}
            />
            <div className="flex gap-3 justify-end mt-3">
              <button className="primaryBtn" type="submit" data-testid="positiveBtn">Yes</button>
              <button className="outlineBtn" onClick={closeModal} data-testid="negativeBtn">Cancel</button>
            </div>
          </form>
        </div>
      </label>
    </>
  );
}

export default EmployeeModal;
