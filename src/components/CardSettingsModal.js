import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormHelperText,
  Alert,
  AlertIcon,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocalStorage } from "react-use";
import { LOCAL_STORAGE } from "../lib/constants";
import { getRandomId } from "../lib/functions";
import { addYears, format } from "date-fns";
import { VscRefresh } from "react-icons/vsc";
import { ImQrcode } from "react-icons/im";

const schema = yup.object().shape({
  name: yup.string().required("Obligatorisk"),
  securityNo: yup.string().required("Obligatorisk"),
  semester: yup.string().required("Obligatorisk"),
});

const validUntil = format(addYears(new Date(), 1), "yyyy-MM-dd");

export const CardSettingsModal = (props) => {
  const [localStudentInfo] = useLocalStorage(LOCAL_STORAGE.STUDENT_INFO);

  const [hasPressedSave, setHasPressedSave] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: localStudentInfo.name ?? "",
      securityNo: localStudentInfo.securityNo ?? "",
      randomId: localStudentInfo.randomId ?? getRandomId(),
      semester: localStudentInfo.semester ?? "",
      validUntil: localStudentInfo.validUntil ?? validUntil,
    },
  });

  const onSaveClick = () => {
    if (!hasPressedSave) {
      setHasPressedSave(true);
    } else {
      handleSubmit(props.onSubmit)();
    }
  };

  return (
    <Modal
      isCentered
      scrollBehavior="inside"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{hasPressedSave ? "All done" : "Card info"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {hasPressedSave ? (
            <Box>
              <Alert status="success" variant="subtle">
                <AlertIcon />
                Card info saved to device
              </Alert>

              <Stack isInline spacing={2} mt={3} mb={4}>
                <Text>
                  You can always edit your card info by pressing these buttons
                  <VscRefresh
                    style={{ marginLeft: "0.25rem", display: "inline-block" }}
                  />
                  <ImQrcode
                    style={{
                      marginLeft: "0.25rem",
                      marginRight: "0.25rem",
                      display: "inline-block",
                    }}
                  />
                  in this combination:
                </Text>
              </Stack>
              <Stack isInline>
                <VscRefresh />
                <ImQrcode />
                <VscRefresh />
                <ImQrcode />
                <VscRefresh />
                <ImQrcode />
              </Stack>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(props.onSubmit)}>
              <FormControl isInvalid={errors.name} isRequired mb={4}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.securityNo} isRequired mb={4}>
                <FormLabel htmlFor="securityNo">Security No</FormLabel>
                <Input
                  id="securityNo"
                  placeholder="xxxxxx-xxxx"
                  {...register("securityNo")}
                />
                <FormHelperText>10 digits</FormHelperText>
                <FormErrorMessage>
                  {errors.securityNo?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.semester} isRequired mb={4}>
                <FormLabel htmlFor="semester" placeholder="HT 22">
                  Semester
                </FormLabel>
                <Input id="semester" {...register("semester")} />
                <FormErrorMessage>{errors.semester?.message}</FormErrorMessage>
              </FormControl>
            </form>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            onClick={onSaveClick}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
