import React from "react";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const PageWrapper = (props) => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" h="full">
      <Navbar title={props.title} />
      <Container
        h="full"
        display="flex"
        overflow="auto"
        pb="5rem"
        flexDirection="column"
        mt={4}
      >
        <Box flex="1">{props.children}</Box>
      </Container>
      <Button
        pos="absolute"
        bottom="0"
        right="0"
        left="0"
        colorScheme="blue"
        rounded="0"
        size="lg"
        onClick={() => navigate("/app/card")}
      >
        Go to card
      </Button>
    </Flex>
  );
};
