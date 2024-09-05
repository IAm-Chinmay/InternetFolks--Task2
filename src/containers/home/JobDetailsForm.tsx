import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider"; // Import the custom hook

// Define prop types for the component
interface JobDetailsFormProps {
  handleTabChange: (index: number) => void; // Correct typing for handleTabChange
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ handleTabChange }) => {
  const context = useData(); // Access the context

  // Ensure context is available
  if (!context) return null;

  const { state, setState } = context;

  const formik = useFormik<IJobDetails>({
    initialValues: state.jobDetails,
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details are required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      setState((prev) => ({ ...prev, jobDetails: values }));
      handleTabChange(2);
    },
    enableReinitialize: true,
  });

  const handleFieldChange = (field: string, value: any) => {
    formik.setFieldValue(field, value);
    setState((prev) => ({
      ...prev,
      jobDetails: { ...prev.jobDetails, [field]: value },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={formik.handleBlur}
          value={formik.values.jobTitle}
          error={formik.errors.jobTitle}
          touched={formik.touched.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={formik.handleBlur}
          value={formik.values.jobDetails}
          error={formik.errors.jobDetails}
          touched={formik.touched.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={formik.handleBlur}
          value={formik.values.jobLocation}
          error={formik.errors.jobLocation}
          touched={formik.touched.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button
            colorScheme="gray"
            type="button"
            onClick={() => handleTabChange(0)}
          >
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
