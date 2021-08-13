import React from "react";

import { Flex } from "../..";

const Headers = () => (
  <Flex
    direction="column"
    style={{ gridArea: "bigHeader", padding: "2rem 0 0 2rem" }}
  >
    <h1
      style={{
        color: "white",
        marginTop: 0,
        marginBottom: "0.25rem",
        fontWeight: 900,
        fontSize: "1.5rem",
      }}
    >
      Kår- och nationskort
    </h1>
    <h3 style={{ color: "white", margin: 0, fontWeight: 200 }}>
      uppsalastudent.com
    </h3>
  </Flex>
);

const SmallHeaders = () => (
  <Flex
    direction="column"
    style={{ gridArea: "smallHeader", padding: "2rem 2rem 0 0" }}
  >
    <p
      style={{
        color: "black",
        margin: 0,
        textAlign: "right",
        fontSize: "0.8rem",
      }}
    >
      Norrlands nation
    </p>
    <p
      style={{
        color: "black",
        margin: 0,
        marginBottom: "0.25rem",
        textAlign: "right",
        fontSize: "0.8rem",
      }}
    >
      Västmanlands-Dala nation
    </p>
    <p
      style={{
        color: "black",
        margin: 0,
        textAlign: "right",
        fontSize: "0.8rem",
      }}
    >
      www.nationsguiden.se
    </p>
  </Flex>
);

export { Headers, SmallHeaders };
