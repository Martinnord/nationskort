import React, { useContext } from "react";
import {
  Box,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { FaHamburger } from "react-icons/fa";
import { Link as RLink } from "react-router-dom";
import { UserContext } from "../lib/UserContext";

export const Navbar = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  const { userData } = useContext(UserContext);

  const isModerator = userData?.role === "MODERATOR";

  return (
    <Box
      as="nav"
      borderBottomStyle="solid"
      borderBottomWidth="2px"
      borderBottomColor="gray.200"
    >
      <Box px={4} py={3}>
        <Flex align="center" justify="space-between">
          <Heading size="md">{props.title}</Heading>
          <IconButton
            variant="ghost"
            icon={<FaHamburger color="black" />}
            onClick={onToggle}
          />
        </Flex>
      </Box>
      <Collapse in={isOpen} p={4}>
        <Stack px={4} mb={3}>
          <Link color="blue.500" to="/app/profile" as={RLink}>
            Profile
          </Link>
          {isModerator && (
            <Link color="blue.500" to="/app/invite" as={RLink}>
              Invite
            </Link>
          )}
          <Link color="blue.500" to="/app/settings" as={RLink}>
            Card settings
          </Link>
        </Stack>
      </Collapse>
    </Box>
  );
};
