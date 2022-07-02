import React, { useContext } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

import { PageWrapper } from "../../components";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../lib/UserContext";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <PageWrapper title="Profile">
      <Text>
        <Text as="span">Logged in with phone number </Text>
        <Text as="span" color="blue.500">
          {user.phoneNumber}
        </Text>
      </Text>
      <Flex justify="flex-end" mt={8}>
        <Button onClick={handleSignOut} colorScheme="red" variant="ghost">
          Logout
        </Button>
      </Flex>
    </PageWrapper>
  );
};
