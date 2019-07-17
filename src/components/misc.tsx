// Stuff to small for its own folder because of the size of the projcet
import React from 'react';
import styled from 'styled-components';
import Icon from './icons';

const StyledIconButton = styled.button`
  display: flex;
  padding: 2px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const IconButton = (props: any) => (
  <StyledIconButton {...props}>
    <Icon {...props} />
  </StyledIconButton>
);
