import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSpring, animated as a } from "react-spring";
import { VscRefresh, ImQrcode, BsPhoneLandscape } from "react-icons/all";

import { BackCard } from "./components/BackCard";
import "../../App.css";
import { FrontCard } from "./components";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { RemoveScroll } from "react-remove-scroll";
import { RandomObjectMover } from "../../animation";

import StukCo from "../../assets/img/stuk-co.png";
import { CardSettingsModal } from "../../components";
import { useLocalStorage, useOrientation } from "react-use";
import { LOCAL_STORAGE } from "../../lib/constants";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #606060;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const RIGHT_COMBINATION = "RQRQRQ";
const RESET_COMBINATION = "QQ";

export function Card() {
  const [localStudentInfo, setLocalStudentInfo] = useLocalStorage(
    LOCAL_STORAGE.STUDENT_INFO
  );

  const navigate = useNavigate();

  const orientation = useOrientation();
  const isInLandscape = orientation.angle === 90 || orientation.angle === -90;

  const [student, setStudent] = useState(localStudentInfo);
  const [combination, setCombination] = useState("");

  const {
    isOpen: isModalOpen,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure();

  const onResetCombination = () => setCombination("");

  useEffect(() => {
    if (student && isInLandscape) {
      var x = new RandomObjectMover(document.getElementById("a"), window);
      var y = new RandomObjectMover(document.getElementById("b"), window);
      var a = new RandomObjectMover(document.getElementById("c"), window);
      var b = new RandomObjectMover(document.getElementById("d"), window);
      x.start();
      y.start();
      a.start();
      b.start();
    }
  }, [student, isInLandscape]);

  console.log("student", student);

  useEffect(() => {
    const isRightCombination = RIGHT_COMBINATION === combination;
    const wantsToReset = combination.includes(RESET_COMBINATION);
    const shouldReset = wantsToReset || combination.length >= 6;

    shouldReset && onResetCombination();
    isRightCombination && navigate("/app/invite");
  }, [combination, onOpenModal, navigate]);

  const handleOnCloseDrawer = () => {
    onCloseModal();
    onResetCombination();
  };

  const onClickCombinationButton = (value) => {
    setCombination(() => combination + value);
  };

  function onSubmit(values) {
    setLocalStudentInfo(values);
    setStudent(values);
    handleOnCloseDrawer();
  }

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? -180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80, duration: 125 },
  });

  if (!student) {
    return (
      <Center h="100vh" w="full">
        <Center flexDirection="column" minW="xs">
          <Heading>Welcome!</Heading>
          <Text textAlign="center">Please fill in your information</Text>
          <Button mt={4} isFullWidth colorScheme="blue" onClick={onOpenModal}>
            Start
          </Button>
        </Center>
        <CardSettingsModal
          isOpen={isModalOpen}
          onClose={handleOnCloseDrawer}
          onSubmit={onSubmit}
        />
      </Center>
    );
  }

  if (!isInLandscape) {
    return (
      <Center h="full">
        <Center flexDirection="column">
          <Heading>Please rotate</Heading>
          <Box as={BsPhoneLandscape} size="100px" />
        </Center>
      </Center>
    );
  }
  return (
    <RemoveScroll style={{ height: "100%" }}>
      <Container style={{ position: "relative" }}>
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <img
            src={StukCo}
            id="a"
            alt="a"
            style={{
              width: "200px",
              height: "70px",
              position: "absolute",
            }}
          />
          <img
            src={StukCo}
            id="b"
            alt="b"
            style={{
              width: "200px",
              height: "70px",
              position: "absolute",
            }}
          />
          <img
            src={StukCo}
            id="c"
            alt="c"
            style={{
              width: "200px",
              height: "70px",
              position: "absolute",
            }}
          />
          <img
            src={StukCo}
            id="d"
            alt="d"
            style={{
              width: "200px",
              height: "70px",
              position: "absolute",
            }}
          />
          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              set((state) => !state);
            }}
          >
            <a.div
              className="c back"
              style={{
                opacity: opacity.interpolate((o) => 1 - o),
                transform,
              }}
            >
              <BackCard student={student} setStudent={setStudent} />
            </a.div>
            <a.div
              className="c front"
              style={{
                opacity,
                transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
              }}
            >
              <FrontCard student={student} />
            </a.div>
          </div>
          <div
            style={{
              display: "flex",
              background: "white",
              flexDirection: "column",
              alignItems: "center",
              width: "60px",
              padding: "1.5rem 0",
              zIndex: 9999999,
            }}
          >
            <IconButton
              icon={<VscRefresh />}
              width="35px"
              height="35px"
              onClick={() => onClickCombinationButton("R")}
              variant="ghost"
            />
            <IconButton
              icon={<ImQrcode />}
              width="35px"
              height="35px"
              onClick={() => onClickCombinationButton("Q")}
              variant="ghost"
            />
          </div>
        </div>
        <CardSettingsModal
          isOpen={isModalOpen}
          onClose={handleOnCloseDrawer}
          onSubmit={onSubmit}
        />
      </Container>
    </RemoveScroll>
  );
}
