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
      background: rgba(79,74,143,1) ;
        background: linear-gradient(320deg, rgba(79,74,143,1) 20%, rgb(236,171,121) 80%);      


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
