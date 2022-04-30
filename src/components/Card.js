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
      background: #ECB251);
background: linear-gradient(150deg, #ECB251 10%, #ECB251 23%, #D24B36  55%, #87297A 92%);

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
