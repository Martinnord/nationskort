import React from "react";
import styled from "styled-components";

import { Card } from "../Card";
import K from "../../../../assets/img/k.png";
import NationLogo from "../../../../assets/img/v-dala.png";
import {
  Headers,
  LeftSponsors,
  RightSponsors,
  SmallHeaders,
  StudentInfo,
} from "./components";

const BigLogo = styled.img`
  width: 275px;
  height: 275px;
  opacity: 0.15;
  position: absolute;
  top: -18px;
  right: -18px;
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
        marginBottom: "-1rem",
      }}
    />
  );
};

export const FrontCard = ({ student }) => {
  return (
    <Card isBackOfCard={false}>
      <BigLogo src={K} />
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
          <RightSponsors student={student} />
        </div>
      </div>
    </Card>
  );
};
