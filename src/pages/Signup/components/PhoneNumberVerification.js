import React, { useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import {
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import delay from "lodash.delay";
import { useNavigate } from "react-router-dom";

import { auth, firestore } from "../../../lib/firebase";

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Required"),
});

const codeSchema = yup.object().shape({
  code: yup
    .string()
    .min(6, "Six digits")
    .max(6, "Six digits")
    .required("Required"),
});

export function PhoneNumberVerification({ recaptcha }) {
  const [confirmationResult, setConfirmationResult] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

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

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors, isSubmitting: codeIsSubmitting },
  } = useForm({
    resolver: yupResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const signInWithPhoneNumber = async (values) => {
    const phoneNumber = `+46${values.phoneNumber}`;

    firestore
      .collection("invites")
      .doc(phoneNumber)
      .get()
      .then((res) => {
        console.log("res in invites", res.data());
        if (!res.exists) {
          setError("phoneNumber", { message: "You are not invited" });
        } else {
          auth
            .signInWithPhoneNumber(phoneNumber, recaptcha)
            .then((res) => {
              console.log("res in signin", res);
              setConfirmationResult(res);
            })
            .catch((error) => {
              console.error("Error when trying to sign in", error);
              if (error.code === "auth/too-many-requests") {
                setError("phoneNumber", { message: "Stop spamming" });
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error when verifying invite", error);
      });
  };

  const verifyCode = async (values) => {
    try {
      const result = await confirmationResult.confirm(values.code);
      console.log("result", result);

      if (result.user) {
        if (result.additionalUserInfo.isNewUser) {
          const inviteDoc = firestore.doc(`invites/${result.user.phoneNumber}`);
          const userDoc = firestore.doc(`users/${result.user.uid}`);

          const batch = firestore.batch();

          batch.update(inviteDoc, { status: "ACTIVE" });
          batch.set(userDoc, {
            phoneNumber: result.user.phoneNumber,
            role: "USER",
          });

          await batch.commit();
        }

        toast({
          status: "success",
          title: "You're in",
          duration: 2000,
        });
        delay(() => navigate("/app/card"), 2500);
      } else {
        toast({ status: "error", title: "Code is not valid" });
      }
    } catch (error) {
      console.error("Error when verifying code", error);
    }
  };

  return (
    <div>
      <Heading>Try you luck</Heading>
      <form>
        <FormControl isInvalid={errors.phoneNumber} isRequired mb={4}>
          <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
          <InputGroup>
            <InputLeftAddon children="+46" />
            <Input id="phoneNumber" {...register("phoneNumber")} type="tel" />
          </InputGroup>
          <FormHelperText>12 digits in total</FormHelperText>
          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="blue"
          isFullWidth
          isLoading={isSubmitting}
          onClick={handleSubmit(signInWithPhoneNumber)}
        >
          Sign in
        </Button>
      </form>
      {confirmationResult && (
        <Box mt={8}>
          <FormControl isInvalid={codeErrors.code} isRequired mb={4}>
            <FormLabel htmlFor="code">Code</FormLabel>
            <Input id="code" type="tel" {...registerCode("code")} />
            <FormErrorMessage>{codeErrors.code?.message}</FormErrorMessage>
          </FormControl>
          <Button
            onClick={handleSubmitCode(verifyCode)}
            isFullWidth
            isLoading={codeIsSubmitting}
          >
            Verify code
          </Button>
        </Box>
      )}
    </div>
  );
}
