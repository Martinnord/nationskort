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
      background: #5EB3BC);
background: linear-gradient(150deg, #5EB3BC 10%, #5EB3BC 23%, #588AC3  55%, #5D4890 92%);

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
