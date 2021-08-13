import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSpring, animated as a } from "react-spring";
import { VscRefresh, ImQrcode } from "react-icons/all";

import { BackCard } from "./components/BackCard";
import "./App.css";
import { FrontCard } from "./components";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import { RemoveScroll } from "react-remove-scroll";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { RandomObjectMover } from "./animation";

import StukCo from "./assets/img/stuk-co.png";

const schema = yup.object().shape({
  name: yup.string().required("Obligatorisk"),
  securityNo: yup.string().required("Obligatorisk"),
  semester: yup.string().required("Obligatorisk"),
});

// function getRandom(length) {
//   return Math.floor(
//     Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
//   );
// }

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

function App() {
  const [student, setStudent] = useState({
    name: "",
    securityNo: "",
    randomId: "",
    semester: "",
    validUntil: "",
  });
  const [combination, setCombination] = useState("");
  const {
    isOpen: isDrawerOpen,
    onClose: onCloseDrawer,
    onOpen: onOpenDrawer,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "Martin Nordström",
      securityNo: "990624-8936",
      randomId: "6032 9211 5170 1834",
      semester: "HT 20",
      validUntil: "2021-09-15",
    },
  });

  const onResetCombination = () => setCombination("");

  useEffect(() => {
    var x = new RandomObjectMover(document.getElementById("a"), window);
    var y = new RandomObjectMover(document.getElementById("b"), window);
    var a = new RandomObjectMover(document.getElementById("c"), window);
    var b = new RandomObjectMover(document.getElementById("d"), window);
    x.start();
    y.start();
    a.start();
    b.start();
  }, []);

  useEffect(() => {
    const isRightCombination = RIGHT_COMBINATION === combination;
    const wantsToReset = combination.includes(RESET_COMBINATION);
    const shouldReset = wantsToReset || combination.length >= 6;

    shouldReset && onResetCombination();
    isRightCombination && onOpenDrawer();
  }, [combination, onOpenDrawer]);

  const handleOnCloseDrawer = () => {
    onCloseDrawer();
    onResetCombination();
  };

  const onClickCombinationButton = (value) => {
    setCombination(() => combination + value);
  };

  function onSubmit(values) {
    setStudent(values);
    handleOnCloseDrawer();
  }

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? -180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80, duration: 125 },
  });

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
              style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
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
              mb={6}
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
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={handleOnCloseDrawer}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Your card info</DrawerHeader>
            <DrawerBody>
              <form>
                <FormControl isInvalid={errors.name} mb={4}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input id="name" placeholder="name" {...register("name")} />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.securityNo} mb={4}>
                  <FormLabel htmlFor="securityNo">Security No</FormLabel>
                  <Input
                    id="securityNo"
                    placeholder="securityNo"
                    {...register("securityNo")}
                  />
                  <FormErrorMessage>
                    {errors.securityNo?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.semester} mb={4}>
                  <FormLabel htmlFor="semester">Semester</FormLabel>
                  <Input
                    id="semester"
                    placeholder="semester"
                    {...register("semester")}
                  />
                  <FormErrorMessage>
                    {errors.semester?.message}
                  </FormErrorMessage>
                </FormControl>
              </form>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={handleOnCloseDrawer}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Container>
    </RemoveScroll>
  );
}

export default App;
