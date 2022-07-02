import React from "react";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
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
        <Text
          textAlign="center"
          letterSpacing="wider"
          fontWeight="semibold"
          textTransform="uppercase"
          color="gray.700"
        >
          From the Sniderice group
        </Text>
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
