import React, { useCallback, useEffect, useState } from 'react';
import {
  Canvas,
  EdgeData,
  hasLink,
  removeAndUpsertNodes,
  NodeData,
  NodeProps, createEdgeFromNodes,
} from 'reaflow';
import { UUID } from 'uuid-generator-ts';

import Toggle from '@components/Toggle/toggle';
import DragMove from '@components/DragMove/dragMove';
import EmployeeModal from '@modals/EmployeeModal/employeeModal';
import ConfirmModal from '@modals/ConfirmModal/confirmModal';
import NodeElement from '@modules/MainPage/components/nodeElement';
import { EmployeeInterfaces } from '@modules/MainPage/interfaces/employee.interfaces';
import DetailsModal from '@modals/DetailsModal/detailsModal';
import { InitEdges, InitNodes } from './utils/mockData';

function MainPage() {
  const [translate, setTranslate] = useState({
    x: -300,
    y: -600,
  });
  const uuid = new UUID();
  const [fromNodeId, setFromNodeId] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<null | NodeData>(null);
  const [selectedNodeToUpdate, setSelectedNodeToUpdate] = useState<null | NodeData>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [nodes, setNodes] = useState<NodeData[]>(InitNodes);
  const [isMount, setIsMount] = useState(false);
  const [edges, setEdges] = useState<EdgeData[]>(InitEdges);

  const handleDragMove = (e: MouseEvent) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  const handleAddNodes = useCallback((data: EmployeeInterfaces) => {
    const id = uuid.getDashFreeUUID();
    const idEdges = uuid.getDashFreeUUID();
    setNodes([...nodes, {
      id,
      height: 190,
      width: 140,
      data,
    }]);
    setEdges([...edges, {
      id: idEdges,
      from: fromNodeId,
      to: id,
    }]);
    setFromNodeId('');
  }, [nodes, fromNodeId]);

  const handleUpdateNodes = useCallback((data: EmployeeInterfaces) => {
    const id = (selectedNodeToUpdate as any).properties?.id;

    const updatedNode = nodes.map((item) => (item.id === id ? { ...item, data: { ...item.data, ...data } } : item));
    setNodes(updatedNode);
    setFromNodeId('');
    setSelectedNodeToUpdate(null);
  }, [selectedNodeToUpdate, nodes]);

  const handleRemoveNode = useCallback(() => {
    if (selectedNodeId !== null) {
      const result = removeAndUpsertNodes(nodes, edges, selectedNodeId);
      setEdges(result.edges);
      setNodes(result.nodes);
    }
  }, [selectedNodeId, nodes, edges]);

  const createNode = (node: NodeProps) => {
    const children = nodes.filter((n) => n.parent && n?.parent === node?.id);
    const notDraggable = !isEditMode || children.length > 3;

    return (
      <NodeElement
        isEditMode={isEditMode}
        node={node}
        notDraggable={notDraggable}
        setFromNodeId={setFromNodeId}
        setSelectedNodeId={setSelectedNodeId}
        setSelectedNodeToUpdateId={setSelectedNodeToUpdate}
      />
    );
  };

  const onNodeLinkCheck = useCallback((_event: any, from: NodeData, to: NodeData) => {
    if (from.id === to.id) {
      return false;
    }

    if (from.id === to.parent) {
      return false;
    }

    if (hasLink(edges, to, from)) {
      return false;
    }

    return true;
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
      setNodes(newNodes);
    }

    setEdges([
      ...result.edges,
      createEdgeFromNodes(to, from),
    ]);
  }, [nodes, edges]);

  useEffect(() => setIsMount(true), []);

  return (
    <>
      <div className="bg-gray-light">
        <h1 className="text-center text-purple h1">Company Structure</h1>
        <div className="flex justify-end">
          <Toggle isEditMode={isEditMode} setEditMode={setEditMode} />
        </div>
      </div>
      {isMount && (
        <div className="relative overflow-hidden w-screen max-w-full max-h-full w-screen h-[calc(100vh-100px)]">
          <DragMove onDragMove={handleDragMove} className="cursor-grab" isEditMode={isEditMode}>
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
      )}

      <DetailsModal
        isEditMode={isEditMode}
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

export default MainPage;
