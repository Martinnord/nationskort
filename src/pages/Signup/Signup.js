import React, { useState, useRef, useEffect } from "react";
import { Box, Container, Image, Stack, Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { auth, firebaseApp } from "../../lib/firebase";
import { PhoneNumberVerification } from "./components/PhoneNumberVerification";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import StepOne from "../../assets/tutorial/ios/step-one.png";
import StepTwo from "../../assets/tutorial/ios/step-two.png";
import StepThree from "../../assets/tutorial/ios/step-three.png";
import StepFour from "../../assets/tutorial/ios/step-four.png";

export const SignUp = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  console.log("user in signup", user);

  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/app/profile");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new firebaseApp.auth.RecaptchaVerifier(element.current, {
        size: "invisible",
      });

      verifier
        .verify()
        .then(() => setRecaptcha(verifier))
        .catch((error) => {
          console.log("err", error);
        });
    }
  }, [recaptcha]);

  const iosSteps = [StepOne, StepTwo, StepThree, StepFour];

  return (
    <Container>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div ref={element}></div>

      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Unsure?
        </Text>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  iPhone
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text mb={2} color="blue.500">
                <Text as="span">When added to homescreen, </Text>
                <Text as="span" fontWeight="bold">
                  only{" "}
                </Text>
                <Text as="span">open via homescreen app</Text>
              </Text>
              <Stack spacing={4}>
                {iosSteps.map((step, index) => {
                  const text = `Step ${index + 1}`;
                  return (
                    <Box key={index}>
                      <Text fontWeight="semibold" mb={1}>
                        {text}
                      </Text>
                      <Image src={step} maxW="300px" />
                    </Box>
                  );
                })}
              </Stack>
              <Text mt={2} color="blue.500">
                <Text as="span">When added to homescreen, </Text>
                <Text as="span" fontWeight="bold">
                  only{" "}
                </Text>
                <Text as="span">open via homescreen app</Text>
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Android
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>Upgrade yourself bro</Text>
              <Text>
                If you have an android you should be able to figure this out
                yourself :)
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Container>
  );
};
