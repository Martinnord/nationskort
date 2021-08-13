import styled from "styled-components";

import { Flex } from "../..";
import Stuk from "../../../assets/img/stuk_test.png";
import KOnly from "../../../assets/img/k-only.png";
import LogoTwo from "../../../assets/img/logo-2.png";
import LogoThree from "../../../assets/img/logo-3.png";
import LogoFour from "../../../assets/img/logo-4.png";
import LogoFive from "../../../assets/img/logo-5.png";
import LogoSix from "../../../assets/img/logo-6.png";
import LogoSeven from "../../../assets/img/logo-7.png";
import SlLogo from "../../../assets/img/sl-logo.png";
import SjLogo from "../../../assets/img/sj-logo.png";
import BookLogo from "../../../assets/img/book.jpg";

const StyledLeftSponsor = styled.div`
  background: white;
  border: 1px solid black;
  border-radius: 3rem;
  width: 100%;
`;

const Test = ({ src, height, width }) => (
  <img
    src={src}
    alt={src}
    style={{
      height: height || "50px",
      width: width || "50px",
      marginRight: "1rem",
      objectFit: "cover",
    }}
  />
);

const LeftSponsors = () => (
  <Flex
    justify="space-between"
    align="center"
    style={{ gridArea: "leftSponsors", padding: "0 0 0.8rem 2rem" }}
  >
    <Test alt="1" src={KOnly} />
    <Test alt="2" src={LogoTwo} height="60px" width="60px" />
    <Test alt="3" src={LogoThree} />
    <Test alt="4" src={LogoFour} />
    <Test alt="5" src={LogoFive} />
    <Test alt="6" src={LogoSix} />
    <Test alt="7" src={LogoSeven} />
  </Flex>
);

const RightSponsors = () => (
  <Flex
    direction="column"
    style={{
      gridArea: "rightSponsors",
      padding: "0 2rem 2rem 0",
      justifySelf: "center",
      alignSelf: "end",
    }}
  >
    <div style={{ marginBottom: "1rem" }}>
      <Flex style={{ width: "100%" }}>
        <StyledLeftSponsor style={{ padding: "0.5rem" }}>
          <Flex align="center">
            <img
              alt="8"
              src={SlLogo}
              style={{ height: 22, width: 22, marginRight: "0.5rem" }}
            />
            <img alt="9" src={BookLogo} style={{ height: 22, width: 22 }} />
          </Flex>
        </StyledLeftSponsor>
        {/* <Sponsor marginRight="0.25rem" />
      <Sponsor /> */}
        <img
          src={SjLogo}
          alt="10"
          style={{ height: 30, width: 30, position: "absolute", right: "0px" }}
        />
      </Flex>
    </div>
    <StyledLeftSponsor>
      <Flex direction="column" align="center" style={{ marginTop: "0.2rem" }}>
        <p
          style={{
            fontSize: "0.3rem",
            letterSpacing: 1,
            textAlign: "center",
            marginTop: 0,
            marginBottom: -3,
          }}
        >
          VERIFIED BY
        </p>
        <img alt="11" src={Stuk} style={{ height: 30, width: 65 }} />
      </Flex>
    </StyledLeftSponsor>
  </Flex>
);

export { LeftSponsors, RightSponsors };
