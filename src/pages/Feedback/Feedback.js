import React from "react";
import { PageWrapper } from "../../components";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Flex,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { auth, firestore } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const schema = yup.object().shape({
  text: yup.string().required("Required"),
});

export const Feedback = () => {
  const [user] = useAuthState(auth);

  const toast = useToast();

  const handleSubmitFeedback = async (values) => {
    const res = await firestore.collection("feedback").add({
      userId: user.uid,
      text: values.text,
    });

    if (res) {
      toast({
        variant: "success",
        title: "Thanks for feedback",
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: "",
    },
  });

  return (
    <PageWrapper title="Give feedback">
      <form onSubmit={handleSubmit(handleSubmitFeedback)}>
        <FormControl isInvalid={errors.text} isRequired mb={4}>
          <FormLabel htmlFor="text">Text</FormLabel>
          <Textarea id="text" {...register("text")} />
          <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
        </FormControl>
        <Flex justify="flex-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
            onClick={handleSubmit(handleSubmitFeedback)}
            colorScheme="blue"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </PageWrapper>
  );
};
