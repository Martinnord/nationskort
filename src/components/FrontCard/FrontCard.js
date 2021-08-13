import React from "react";
import styled from "styled-components";

import { Card } from "../Card";
import K from "../../assets/img/k.png";
import NationLogo from "../../assets/img/nation.png";
import {
  Headers,
  LeftSponsors,
  RightSponsors,
  SmallHeaders,
  StudentInfo,
} from "./components";

const BigLogo = styled.img`
  width: 250px;
  height: 250px;
  opacity: 0.1;
  position: absolute;
  top: -15px;
  right: -15px;
`;

const BlackLogo = () => {
  return (
    <img
      alt="blackk"
      src={NationLogo}
      style={{
        height: 90,
        width: 90,
        gridArea: "blackLogo",
        alignSelf: "end",
      }}
    />
  );
};

export const FrontCard = ({ student }) => {
  return (
    <Card isBackOfCard={false}>
      <BigLogo alt="helloooo" src={K} />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateAreas: `"bigHeader smallHeader smallHeader" "studentInfo blackLogo rightSponsors" "leftSponsors leftSponsors rightSponsors"`,
          }}
        >
          <Headers />
          <SmallHeaders />
          <StudentInfo student={student} />
          <BlackLogo />
          <LeftSponsors />
          <RightSponsors />
        </div>
      </div>
    </Card>
  );
};
