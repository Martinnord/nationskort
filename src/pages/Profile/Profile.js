import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { PageWrapper } from "../../components";
import { auth } from "../../lib/firebase";

export const Profile = () => {
  const [user] = useAuthState(auth);

  return (
    <PageWrapper title="Profile">
      <Text>
        <Text as="span">Logged in with phone number </Text>
        <Text as="span" color="blue.500">
          {user.phoneNumber}
        </Text>
      </Text>
      <Flex justify="flex-end" mt={8}>
        <Button
          onClick={() => auth.signOut()}
          colorScheme="red"
          variant="ghost"
        >
          Logout
        </Button>
      </Flex>
    </PageWrapper>
  );
};
