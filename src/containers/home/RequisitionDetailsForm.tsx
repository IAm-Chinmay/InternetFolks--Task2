import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useData } from "./DataProvider";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC<{
  handleTabChange: (index: number) => void;
}> = ({ handleTabChange }) => {
  const context = useData();

  if (!context) return null;

  const { state, setState } = context;

  const formik = useFormik({
    initialValues: state.requisitionDetails,
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      setState((prev) => ({ ...prev, requisitionDetails: values }));
      handleTabChange(1);
    },
    enableReinitialize: true,
  });

  const handleFieldChange = (field: string, value: any) => {
    formik.setFieldValue(field, value);
    setState((prev) => ({
      ...prev,
      requisitionDetails: { ...prev.requisitionDetails, [field]: value },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.requisitionTitle}
          error={formik.errors.requisitionTitle}
          touched={formik.touched.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={formik.handleBlur}
          value={formik.values.noOfOpenings}
          error={formik.errors.noOfOpenings}
          touched={formik.touched.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(field: string, value: any) =>
            handleFieldChange(field, value)
          }
          onBlur={(field: string) => formik.setFieldTouched(field, true)}
          error={formik.errors.gender}
          touched={formik.touched.gender}
          value={formik.values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(field: string, value: any) =>
            handleFieldChange(field, value)
          }
          onBlur={(field: string) => formik.setFieldTouched(field, true)}
          error={formik.errors.urgency}
          touched={formik.touched.urgency}
          value={formik.values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
