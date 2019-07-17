import React from 'react';
import styled from 'styled-components';
import { IconButton } from '../misc';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid black;
  @media (max-width: 768px) {
    border: none;
    border-top: 1px solid black;
  }
`;

const InnerContainer = styled.div`
  height: 100%;
  background: #1f212e;
`;

const ContainerItem = styled.div<{ isItem?: boolean }>`
  background: ${props => (props.isItem ? 'transparent' : '#292e42')};
  padding: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;

  ${props =>
    props.isItem &&
    `
    padding-bottom: 12px; 
    `}

  &:last-of-type {
    border-bottom: none;
  }
`;

export default (props: any) => (
  <Container>
    <InnerContainer>
      <ContainerItem>
        <IconButton
          title={'Hide All'}
          icon={'eye'}
          size={16}
          fill={'#fff'}
          onClick={() => props.onHide(-1)}
        />
        Objects [{props.objects.length}]
      </ContainerItem>
      {props.objects.map((i, index) => (
        <ContainerItem isItem={true} isHighlighted={i.highlighted}>
          <IconButton
            title={`Hide obj ${index}`}
            icon={'eye'}
            size={16}
            fill={i.hidden ? 'rgba(255,255,255,.5)' : 'white'}
            onClick={() => props.onHide(index)}
          />
          <p style={{ marginLeft: '8px', color: i.highlighted ? '#40C284' : 'white' }}>
            Obj {index}
          </p>
        </ContainerItem>
      ))}
    </InnerContainer>
  </Container>
);
