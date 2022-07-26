import React, { PointerEventHandler, useState } from 'react';

type Props = {
  onPointerDown?: (e: MouseEvent) => PointerEventHandler<HTMLDivElement>,
  onPointerUp?: (e: MouseEvent) => PointerEventHandler<HTMLDivElement>,
  onPointerMove?: (e: MouseEvent) => PointerEventHandler<HTMLDivElement>,
  onDragMove: (e: MouseEvent) => void,
  children: JSX.Element,
  className?: string,
  isEditMode: boolean
}

export default function DragMove(props: Props) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    className,
    isEditMode,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: MouseEvent) => {
    if (!isEditMode || (e.target && (e.target as any).localName === 'svg')) {
      setIsDragging(true);
      if (onPointerDown) {
        onPointerDown(e);
      }
    }
  };

  const handlePointerUp = (e: MouseEvent) => {
    setIsDragging(false);

    if (onPointerUp) {
      onPointerUp(e);
    }
  };

  const handlePointerMove = (e: MouseEvent) => {
    if (isDragging) onDragMove(e);

    if (onPointerMove) {
      onPointerMove(e);
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown as unknown as PointerEventHandler<HTMLDivElement>}
      onPointerUp={handlePointerUp as unknown as PointerEventHandler<HTMLDivElement>}
      onPointerMove={handlePointerMove as unknown as PointerEventHandler<HTMLDivElement>}
      className={className}
    >
      {children}
    </div>
  );
}

DragMove.defaultProps = {
  onPointerDown: () => {
  },
  onPointerUp: () => {
  },
  onPointerMove: () => {
  },
  className: '',
};
