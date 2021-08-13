import React from "react";
import { Flex } from "../..";

export const StudentInfo = ({ student }) => {
  return (
    <Flex
      direction="column"
      style={{
        padding: "0 0 0 2rem",
        alignSelf: "end",
        marginBottom: "-0.5rem",
      }}
    >
      <p
        style={{
          color: "black",
          margin: 0,
          marginBottom: "0.5rem",
          fontSize: "0.85rem",
        }}
      >
        Endast nation
      </p>
      <p style={{ color: "black", fontSize: "1rem", margin: 0 }}>
        {student.name}
      </p>
      <p
        style={{
          color: "black",
          fontSize: "1rem",
          margin: 0,
          marginBottom: "0.1rem",
        }}
      >
        {student.securityNo}
      </p>
      <p
        style={{
          color: "black",
          fontSize: "0.75rem",
          margin: 0,
          marginBottom: "1rem",
        }}
      >
        {String(student.randomId)
          .replace(/[^\dA-Z]/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim()}
      </p>
      <p style={{ color: "black", fontSize: "0.8rem", margin: 0 }}>
        GILTIGT TILL: {student.validUntil}
      </p>
    </Flex>
  );
};
