import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import ConfirmModal from '@modals/ConfirmModal/confirmModal';

describe('ConfirmModal Component', () => {
  const props = { name: 'Name', closeModal: jest.fn(), removeNode: jest.fn() };

  it('should render ConfirmModal', () => {
    act(() => {
      render(<ConfirmModal {...props} />);
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
      render(<ConfirmModal {...props} />);
    });
    const positiveBtn = screen.getByTestId('positiveBtn');
    fireEvent.click(positiveBtn);
    expect(props.removeNode).toBeCalled();

    const negativeBtn = screen.getByTestId('negativeBtn');
    fireEvent.click(negativeBtn);
    expect(props.closeModal).toBeCalled();

    const closeBtn = screen.getByTestId('closeBtn');
    fireEvent.click(closeBtn);
    expect(props.closeModal).toBeCalled();
  });

});
