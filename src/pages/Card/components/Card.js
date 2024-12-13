import React from "react";

import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => {
    if (props.isBackOfCard) {
      return `
        background: white;
      `;
    } else {
      return `
      background: #C3D7A4);
      background: linear-gradient(40deg, #F4E39E 10%, #F4E39E 23%, #C55630  100%, #C55630 92%);

      `;
    }
  }}
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
`;

export const Card = ({ children, isBackOfCard }) => {
  return <StyledCard isBackOfCard={isBackOfCard}>{children}</StyledCard>;
};
