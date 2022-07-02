import React, { useEffect } from "react";
import {
  Box,
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  Text,
  Stack,
  InputGroup,
  InputLeftAddon,
  Button,
  FormErrorMessage,
  Collapse,
  IconButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "@chakra-ui/react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

import { auth, firestore } from "../../lib/firebase";
import { PageWrapper } from "../../components";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Required"),
});

export function SendInvites() {
  const [user] = useAuthState(auth);
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onToggle } = useDisclosure();

  const query = firestore.collection("invites").where("sender", "==", user.uid);
  const [invites] = useCollectionData(query);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  useEffect(() => {
    firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .then((res) => {
        const userData = res.data();
        const canInvite = userData.role === "MODERATOR";

        if (!canInvite) {
          navigate("/app/profile");
        }
      });
  }, [user, navigate]);

  const handleSendInvite = async (values) => {
    const phoneNumber = `+46${values.phoneNumber}`;

    const hasAlreadyInvitedNumber = !!invites.find(
      (invite) => invite.phoneNumber === phoneNumber
    );

    const isSameNumberAsUsers = user.phoneNumber === phoneNumber;

    if (isSameNumberAsUsers) {
      setError("phoneNumber", { message: "Bruh..." });

      return;
    }

    if (hasAlreadyInvitedNumber) {
      setError("phoneNumber", { message: "Number already invited" });

      return;
    }
    try {
      const inviteRef = firestore.collection("invites").doc(phoneNumber);
      await inviteRef.set({
        phoneNumber,
        sender: user.uid,
        status: "PENDING",
      });

      toast({
        status: "success",
        title: "Invite sent",
      });
    } catch (error) {
      console.error("Error when sending invite", error);
      toast({
        status: "error",
        title: "Something went wrong",
        description: "Please try again",
      });
    }
  };

  return (
    <PageWrapper title="Invite your friends">
      <Box mt={6}>
        <FormControl isInvalid={errors.phoneNumber} isRequired mb={4}>
          <FormLabel htmlFor="name">Phone number</FormLabel>
          <InputGroup>
            <InputLeftAddon children="+46" />
            <Input id="phoneNumber" {...register("phoneNumber")} type="tel" />
          </InputGroup>
          <FormHelperText>12 digits in total</FormHelperText>
          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>

        <Button
          onClick={handleSubmit(handleSendInvite)}
          isLoading={isSubmitting}
          mt={2}
          isFullWidth
          colorScheme="blue"
        >
          Send Invite
        </Button>
      </Box>

      {!!invites?.length && (
        <Box mt={4}>
          <Flex onClick={onToggle} justify="space-between" align="center">
            <Text fontSize="lg">See invites</Text>
            <IconButton
              variant="unstyled"
              icon={isOpen ? <VscChevronUp /> : <VscChevronDown />}
            />
          </Flex>
          <Collapse in={isOpen}>
            <Stack>
              {invites?.map((data) => (
                <Text key={data?.phoneNumber}>
                  {data?.phoneNumber} {data?.status}
                </Text>
              ))}
            </Stack>
          </Collapse>
        </Box>
      )}
    </PageWrapper>
  );
}
