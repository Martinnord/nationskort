import React, { useState, useRef, useEffect } from "react";
import { Container } from "@chakra-ui/react";

import { auth, firebaseApp } from "../../lib/firebase";
import { PhoneNumberVerification } from "./components/PhoneNumberVerification";
import { useNavigate } from "react-router-dom";

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
  }, [user]);

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
  }, []);

  return (
    <Container>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div ref={element}></div>
    </Container>
  );
};
