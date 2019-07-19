import React from 'react';
import styled from 'styled-components';
import Selection from '../Selection';
import { SelectionObject } from '../../types';
import { IconButton } from '../misc';
const TopBar = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding-left: 8px;
  height: 32px;
  align-items: center;
  width: 100%;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageSelectorOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 3;
`;

const PositionMarker = styled.div<{ position: any }>`
  position: absolute;
  top: ${props => props.position.y - 5}px;
  left: ${props => props.position.x - 5}px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  z-index: 4;
`;

interface Props {
  objects: SelectionObject[];
  newObject: any;
  highlightObject: any;
  updatePosition: any;
}

interface State {
  positions: any;
  currentTool: number;
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

const Position = (props: any) => <PositionMarker {...props} />;

export default class SelectionArea extends React.Component<Props, State> {
  public state: State = {
    positions: [],
    currentTool: 0,
    maxX: 0,
    maxY: 0,
    minX: Number.MAX_SAFE_INTEGER,
    minY: Number.MAX_SAFE_INTEGER,
  };

  public clicked = (e: any) => {
    const { positions, minX, maxX, minY, maxY } = this.state;
    this.setState(
      {
        minX: e.clientX < minX ? e.clientX : minX,
        maxX: e.clientX > maxX ? e.clientX : maxX,
        minY: e.clientY < minY ? e.clientY : minY,
        maxY: e.clientY > maxY ? e.clientY : maxY,
        positions: [...positions, { x: e.clientX, y: e.clientY }],
      },
      () => {
        const { minX, maxX, minY, maxY } = this.state;
        if (this.state.positions.length > 3) {
          this.setState({
            positions: [],
            maxX: 0,
            maxY: 0,
            minX: Number.MAX_SAFE_INTEGER,
            minY: Number.MAX_SAFE_INTEGER,
          });
          this.props.newObject({
            width: maxX - minX,
            height: maxY - minY,
            index: this.props.objects.length > 0 ? this.props.objects.length : 0,
            hidden: false,
            position: { x: minX, y: minY },
          });
        }
      }
    );
  };
  public render() {
    const { positions, currentTool } = this.state;
    const { objects } = this.props;
    return (
      <div>
        <TopBar>
          <IconButton
            icon={'select'}
            title={'Select a current object'}
            size={16}
            fill={currentTool === 0 ? '#40C284' : '#fff'}
            onClick={() => this.setState({ currentTool: 0 })}
          />
          <IconButton
            icon={'dots'}
            title={'Create new object'}
            size={16}
            fill={currentTool === 1 ? '#40C284' : '#fff'}
            onClick={() => this.setState({ currentTool: 1 })}
          />
        </TopBar>
        <Body>
          {currentTool === 1 ? <ImageSelectorOverlay onClick={this.clicked} /> : null}
          {positions.map(p => (
            <Position position={p} />
          ))}
          {objects
            .filter(obj => !obj.hidden)
            .map((obj, index) => (
              <Selection
                onSelect={() => this.props.highlightObject(index)}
                index={index}
                width={obj.width}
                height={obj.height}
                position={obj.position}
                updatePosition={(e, ui) => this.props.updatePosition(e, ui, index)}
              />
            ))}
        </Body>
      </div>
    );
  }
}
