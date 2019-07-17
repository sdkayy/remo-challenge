import React from 'react';
import styled from 'styled-components';

const PrettyTitle = styled.p`
  padding: 4px;
  font-size: 10px;
  color: white;
  background: #40c284;
  border-radius: 4px 4px 0 0;
  display: inline-block;
`;

interface Props {
  width: number;
  height: number;
  position: any;
  index: number;
  onSelect: any;
}

export default (props: Props) => (
  <div
    onClick={props.onSelect}
    style={{
      position: 'absolute',
      top: `${props.position.y - 22}px`,
      left: `${props.position.x}px`,
    }}
  >
    <PrettyTitle>Object{props.index}</PrettyTitle>
    <div
      style={{
        zIndex: 1,
        border: '1px solid #40C284',
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
    />
  </div>
);
