import React, { useCallback, useEffect, useState } from 'react';
import {
  Canvas,
  removeAndUpsertNodes,
  NodeData,
  NodeProps, createEdgeFromNodes, detectCircular,
} from 'reaflow';
import { UUID } from 'uuid-generator-ts';

import DragMove from '@components/DragMove/dragMove';
import EmployeeModal from '@modals/EmployeeModal/employeeModal';
import ConfirmModal from '@modals/ConfirmModal/confirmModal';
import NodeElement from '@modules/MainPage/components/nodeElement';
import { EmployeeInterfaces } from '@modules/MainPage/interfaces/employee.interfaces';
import DetailsModal from '@modals/DetailsModal/detailsModal';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDTO } from '@redux/interfaces/store.interface';
import { addEmployee, deleteEmployee, moveNode, updateEmployee } from '@redux/actions/actionCreator';

type Props = {
  isEditMode?: boolean
  isEditPositionMode?: boolean
  setPositionCoordinates?: (val: {x: number, y: number}) => void
}

function MainPage({ isEditMode, isEditPositionMode, setPositionCoordinates }: Props) {
  const uuid = new UUID();
  const [fromNodeId, setFromNodeId] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<null | NodeData>(null);
  const [selectedNodeToUpdate, setSelectedNodeToUpdate] = useState<null | NodeData>(null);

  const edges = useSelector((store: StoreDTO) => store.employees.edges);
  const nodes = useSelector((store: StoreDTO) => store.employees.employees);
  const positionStore = useSelector((store: StoreDTO) => store.position);
  const dispatch = useDispatch();
  const [translate, setTranslate] = useState(positionStore);

  const handleDragMove = (e: MouseEvent) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });

    if (isEditPositionMode && setPositionCoordinates) {
      setPositionCoordinates(
        { x: translate.x + e.movementX,
          y: translate.y + e.movementY },
      );
    }
  };

  useEffect(() => {
    if (isEditPositionMode) {
      setTranslate(positionStore);
    }

  }, [isEditPositionMode, positionStore]);

  const handleAddNodes = useCallback((data: EmployeeInterfaces) => {
    const id = uuid.getDashFreeUUID();
    const idEdges = uuid.getDashFreeUUID();
    dispatch(addEmployee({ employees: {
      id,
      height: 190,
      width: 140,
      data,
    },
    edges: {
      id: idEdges,
      from: fromNodeId,
      to: id,
    } }));
    setFromNodeId('');
  }, [nodes, fromNodeId]);

  const handleUpdateNodes = useCallback((data: EmployeeInterfaces) => {
    const id = (selectedNodeToUpdate as any).properties?.id;

    const updatedNode = nodes.map((item) => (item.id === id ? { ...item, data: { ...item.data, ...data } } : item));
    dispatch(updateEmployee({ employees: updatedNode }));
    setFromNodeId('');
    setSelectedNodeToUpdate(null);
  }, [selectedNodeToUpdate, nodes]);

  const handleRemoveNode = useCallback(() => {
    if (selectedNodeId !== null) {
      const result = removeAndUpsertNodes(nodes, edges, selectedNodeId);
      dispatch(deleteEmployee({ employees: result.nodes,
        edges: result.edges }));
    }
  }, [selectedNodeId, nodes, edges]);

  const createNode = (node: NodeProps) => (
    <NodeElement
      isEditMode={!!isEditMode}
      node={node}
      notDraggable={!isEditMode}
      setFromNodeId={setFromNodeId}
      setSelectedNodeId={setSelectedNodeId}
      setSelectedNodeToUpdateId={setSelectedNodeToUpdate}
    />
  );

  const onNodeLinkCheck = useCallback((_event: any, from: NodeData, to: NodeData) => {

    if (from.id === to.id) {
      return false;
    }
    return !detectCircular(nodes, edges, to, from);

  }, []);

  const onNodeLink = useCallback((_event: any, from: NodeData, to: NodeData) => {

    const result = removeAndUpsertNodes(
      nodes,
      edges,
      from,
    );
    if ((from.parent || to.parent) && from.parent !== to.parent) {
      const newNodes = nodes.map((n) => (
        n.id === from.id
          ? { ...n, parent: to.parent }
          : { ...n }
      ));
      from.parent = to.parent;
      dispatch(moveNode({ employees: newNodes }));
    }

    dispatch(moveNode({ edges: [
      ...result.edges,
      createEdgeFromNodes(to, from),
    ] }));
  }, [nodes, edges]);

  return (
    <>
      <div className="relative overflow-hidden w-screen max-w-full max-h-full w-screen h-[calc(100vh-100px)] bg-white">
        <DragMove onDragMove={handleDragMove} className="cursor-grab" isEditMode={!!isEditMode}>
          <div
            className="wrapCanvas"
            style={{ transform: `translate(${translate.x}px, ${translate.y}px)` }}
          >
            <Canvas
              className="!overflow-visible"
              nodes={nodes}
              edges={edges}
              node={createNode}
              onNodeLinkCheck={onNodeLinkCheck}
              onNodeLink={onNodeLink}
            />

          </div>
        </DragMove>
      </div>
      <DetailsModal
        isEditMode={!!isEditMode}
        selectedNodeToUpdate={selectedNodeToUpdate}
        setFromNodeId={setFromNodeId}
        closeModal={() => setSelectedNodeToUpdate(null)}
      />
      <EmployeeModal
        closeModal={() => setFromNodeId('')}
        fromNodeId={fromNodeId}
        handleAddNodes={handleAddNodes}
        handleUpdateNodes={handleUpdateNodes}
        selectedNodeToUpdate={selectedNodeToUpdate}
      />
      <ConfirmModal
        name={selectedNodeId ? ((selectedNodeId as any)?.properties)?.data?.name : ''}
        closeModal={() => setSelectedNodeId(null)}
        removeNode={handleRemoveNode}
      />
    </>
  );
}

MainPage.defaultProps = {
  isEditMode: false,
  isEditPositionMode: false,
  setPositionCoordinates: () => {},
};

export default MainPage;
