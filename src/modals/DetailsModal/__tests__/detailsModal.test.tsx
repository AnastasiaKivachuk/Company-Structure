import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import DetailsModal from '@modals/DetailsModal/detailsModal';
import { NodeData } from 'reaflow';

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

describe('DetailsModal Component without update profile', () => {
  const props = { isEditMode: false,
    closeModal: jest.fn(),
    setFromNodeId: jest.fn(),
    selectedNodeToUpdate: Node };

  it('should render DetailsModal', () => {
    act(() => {
      render(<DetailsModal {...props} />);
    });
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();

    const img = screen.getByTestId('img');
    expect(img).toBeInTheDocument();

    const position = screen.getByTestId('position');
    expect(position).toBeInTheDocument();

    expect(screen.queryByTestId('updateBtn')).not.toBeInTheDocument();
  });
});

describe('DetailsModal Component with update profile', () => {
  const props = { isEditMode: true,
    closeModal: jest.fn(),
    setFromNodeId: jest.fn(),
    selectedNodeToUpdate: Node };

  it('click button', () => {
    act(() => {
      render(<DetailsModal {...props} />);
    });
    const updateBtn = screen.getByTestId('updateBtn');
    fireEvent.click(updateBtn);
    expect(props.setFromNodeId).toBeCalled();
  });

});
