import React from 'react';
import {
  Node,
  Icon, Label, Add, Remove, NodeProps, NodeData,
} from 'reaflow';

type Props = {
  isEditMode: boolean,
  notDraggable: boolean,
  node: NodeProps,
  setFromNodeId: (id: string) => void,
  setSelectedNodeId: (val: NodeData) => void
  setSelectedNodeToUpdateId: (val: NodeData) => void
}

function NodeElement({ isEditMode, notDraggable, node, setFromNodeId, setSelectedNodeId, setSelectedNodeToUpdateId }: Props) {

  const nodeStyle = {
    fill: 'transparent',
    stroke: 'none',
    cursor: 'pointer',
  };

  return (
    <Node
      {...node}
      style={nodeStyle}
      dragType="node"
      draggable={!notDraggable}
      key={node.properties.id}
      onClick={(e) => {
        if ((e as any).target.className.baseVal === 'Node-module_rect__1Eal3') {
          setSelectedNodeToUpdateId(node as any);
        }
      }}
    >
      {(event) => (
        <>
          <Label
            x={0}
            y={20}
            text={event.node.data.position}
            style={{ fill: 'black', strokeWidth: '1' }}
          />

          {event.node.data.photoUrl
                        && (
                          <Icon
                            url={event.node.data.photoUrl}
                            height={160}
                            width={100}
                            style={{ transform: 'translate(0px, 10px)' }}
                          />
                        )}
          <Label
            x={0}
            y={180}
            text={event.node.data.name}
            style={{ fill: 'black', strokeWidth: '1' }}
          />
          <Icon
            url="./info.png"
            height={30}
            width={30}
            style={{ transform: 'translate(0px, 135px)' }}
          />
          {isEditMode && (
            <>
              <Add
                onClick={() => setFromNodeId(event.node.id)}
                hidden={false}
                size={20}
                x={40}
                y={150}
              />
              <Remove
                onClick={() => setSelectedNodeId(node as any)}
                hidden={false}
                size={20}
                x={65}
                y={150}
              />
            </>
          )}
        </>
      )}
    </Node>
  );
}

export default NodeElement;
