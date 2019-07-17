import React from 'react';
import styled from 'styled-components';
import SelectionArea from '../../components/SelectionArea';
import Sidebar from '../../components/Sidebar';
import { SelectionObject } from '../../types';

// Green #40C284
// light #292e42
// dark #1F212E

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 20%;
  background: #292e42;
  border: 2px solid #292e42;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

interface State {
  objects: SelectionObject[];
}

export default class Home extends React.Component<any, State> {
  public state: State = {
    objects: [],
  };

  public hideObject = (index: number) => {
    const { objects } = this.state;
    if (index === -1) {
      this.setState({
        objects: objects.map(obj => ({ ...obj, hidden: !obj.hidden })),
      });
    } else {
      objects[index] = {
        ...objects[index],
        hidden: !objects[index].hidden,
      };

      this.setState({
        objects,
      });
    }
  };

  public highlightObject = (index: number) => {
    const { objects } = this.state;
    objects[index] = {
      ...objects[index],
      highlighted: !objects[index].highlighted,
    };
    this.setState({
      objects,
    });
  };

  public render() {
    return (
      <Container>
        <SelectionArea
          highlightObject={this.highlightObject}
          objects={this.state.objects}
          newObject={(obj: SelectionObject) =>
            this.setState({
              objects: [...this.state.objects, obj],
            })
          }
        />
        <Sidebar objects={this.state.objects} onHide={this.hideObject} />
      </Container>
    );
  }
}
