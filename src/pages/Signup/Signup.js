import React, { useState, useRef, useEffect } from "react";
import { Container } from "@chakra-ui/react";

import { firebaseApp } from "../../lib/firebase";
import { PhoneNumberVerification } from "./components/PhoneNumberVerification";

export const SignUp = () => {
  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);

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
  });

  return (
    <Container>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div ref={element}></div>
    </Container>
  );
};
