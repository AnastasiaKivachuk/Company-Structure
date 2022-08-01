import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Toggle from '../toggle';

const mockFn = jest.fn();

const setUp = (props: { isEditMode: boolean, setEditMode: (val: boolean) => void }) => (
  render(<Toggle {...props} />));

const MockData = {
  isEditMode: false,
  setEditMode: mockFn,
};

describe('Toggle component', () => {

  it('should render Toggle component with isEditMode=false', () => {
    setUp(MockData);
    expect(screen.getByTestId('labelText')).toBeInTheDocument();
    const inputEl = screen.getByTestId('input') as HTMLInputElement;
    expect(inputEl).toBeInTheDocument();
    expect(inputEl.checked).toBe(MockData.isEditMode);
    fireEvent.click(inputEl);
    expect(MockData.setEditMode).toHaveBeenCalledTimes(1);
  });
});
