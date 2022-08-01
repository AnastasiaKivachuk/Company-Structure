import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import EmployeeModal from '@modals/EmployeeModal/employeeModal';
import { NodeData } from 'reaflow';
import { FIELD_NAMES } from '@modals/EmployeeModal/validation/employeeModal.validation';

const Node = {
  $H: 428,
  edges: [],
  height: 190,
  id: '1.3',
  labels: [],
  ports: [],
  properties: {
    data: {
      name: 'Head of Unit 3',
      photoUrl: 'https://avatars.mds.yandex.net/i?id=a7e782fc9f2d963c87c72a79ae4228fb-4590899-images-thumbs&n=13&exp=1',
      position: 'Head of Unit 3',
    },
    height: 190,
    id: '1.3',
    width: 120 },
  width: 120,
  x: 852,
  y: 302,
} as NodeData;

describe('EmployeeModal Component update', () => {
  const props = { fromNodeId: '1',
    closeModal: jest.fn(),
    handleAddNodes: jest.fn(),
    handleUpdateNodes: jest.fn(),
    selectedNodeToUpdate: Node };

  it('should render EmployeeModal', () => {
    act(() => {
      render(<EmployeeModal {...props} />);
    });
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();

    const positiveBtn = screen.getByTestId('positiveBtn');
    expect(positiveBtn).toBeInTheDocument();

    const negativeBtn = screen.getByTestId('negativeBtn');
    expect(negativeBtn).toBeInTheDocument();

    const closeBtn = screen.getByTestId('closeBtn');
    expect(closeBtn).toBeInTheDocument();
  });

  it('click button', () => {
    act(() => {
      render(<EmployeeModal {...props} />);
    });

    const positiveBtn = screen.getByTestId('positiveBtn');
    fireEvent.click(positiveBtn);
    // expect(props.handleUpdateNodes).toBeCalled();

    const negativeBtn = screen.getByTestId('negativeBtn');
    fireEvent.click(negativeBtn);
    expect(props.closeModal).toBeCalled();

    const closeBtn = screen.getByTestId('closeBtn');
    fireEvent.click(closeBtn);
    expect(props.closeModal).toBeCalled();
  });
});

describe('EmployeeModal Component add', () => {
  const props = { fromNodeId: '1',
    closeModal: jest.fn(),
    handleAddNodes: jest.fn(),
    handleUpdateNodes: jest.fn(),
    selectedNodeToUpdate: null };

  it('click button', () => {
    act(() => {
      render(<EmployeeModal {...props} />);
    });
    const positiveBtn = screen.getByTestId('positiveBtn');
    act(() => { fireEvent.click(positiveBtn); });
  });

  it('onValueChange should change value in field', async () => {
    act(() => {
      render(<EmployeeModal {...props} />);
    });
    const value = 'test';
    const inputEl = await screen.findByTestId('fieldName');
    expect((inputEl as HTMLInputElement).value).toBe('');
    fireEvent.change(inputEl, { target: { value }, name: FIELD_NAMES.NAME });
    expect((inputEl as HTMLInputElement).value).toBe(value);
  });

});
