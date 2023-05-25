import React from "react";
import { PageWrapper } from "../../components";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocalStorage } from "react-use";
import { addYears, format } from "date-fns";

import { LOCAL_STORAGE } from "../../lib/constants";
import { getRandomId } from "../../lib/functions";

const schema = yup.object().shape({
  name: yup.string().required("Obligatorisk"),
  securityNo: yup.string().required("Obligatorisk"),
  semester: yup.string().required("Obligatorisk"),
  validUntil: yup.string().required("Obligatorisk"),
});

const validUntil = format(addYears(new Date(), 1), "yyyy-MM-dd");

export const Settings = () => {
  const [localStudentInfo, setLocalStudentInfo] = useLocalStorage(
    LOCAL_STORAGE.STUDENT_INFO
  );
  const toast = useToast();

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

  function onSubmit(values) {
    setLocalStudentInfo(values);
    toast({
      status: "success",
      title: "Card settings saved",
    });
  }

  return (
    <PageWrapper title="Card settings">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <FormErrorMessage>{errors.securityNo?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.semester} isRequired mb={4}>
          <FormLabel htmlFor="semester" placeholder="HT 22">
            Semester
          </FormLabel>
          <Input id="semester" {...register("semester")} />
          <FormErrorMessage>{errors.semester?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.semester} isRequired mb={4}>
          <FormLabel htmlFor="validUntil" placeholder="2024-05-15">
            Valid until
          </FormLabel>
          <Input id="validUnitl" {...register("validUntil")} />
          <FormErrorMessage>{errors.validUntil?.message}</FormErrorMessage>
        </FormControl>
        <Flex justify="flex-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            colorScheme="blue"
          >
            Save
          </Button>
        </Flex>
      </form>
    </PageWrapper>
  );
};
