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
      background: linear-gradient(60deg, #C3D7A4 10%, #C3D7A4 23%, #F3D1B6  55%, #F3D1B6 92%);

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
