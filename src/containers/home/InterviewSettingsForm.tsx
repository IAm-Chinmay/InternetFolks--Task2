import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

const InterviewSettingsForm: React.FC<{
  handleTabChange: (index: number) => void;
}> = ({ handleTabChange }) => {
  const context = useData();

  if (!context) return null;

  const { state, setState } = context;

  const formik = useFormik<IInterViewSettings>({
    initialValues: state.interviewSettings,
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview mode is required"),
      interviewDuration: Yup.string().required(
        "Interview duration is required"
      ),
      interviewLanguage: Yup.string().required(
        "Interview language is required"
      ),
    }),
    onSubmit: (values) => {
      setState((prev) => ({ ...prev, interviewSettings: values }));
      alert("YOO IT WORKED ! SUBMITTED");
    },
    enableReinitialize: true,
  });

  const handleFieldChange = (field: string, value: any) => {
    formik.setFieldValue(field, value);
    setState((prev) => ({
      ...prev,
      interviewSettings: { ...prev.interviewSettings, [field]: value },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(field: string, value: any) =>
            handleFieldChange(field, value)
          }
          onBlur={(field: string) => formik.setFieldTouched(field, true)}
          value={formik.values.interviewMode}
          error={formik.errors.interviewMode}
          touched={formik.touched.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(field: string, value: any) =>
            handleFieldChange(field, value)
          }
          onBlur={(field: string) => formik.setFieldTouched(field, true)}
          value={formik.values.interviewDuration}
          error={formik.errors.interviewDuration}
          touched={formik.touched.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(field: string, value: any) =>
            handleFieldChange(field, value)
          }
          onBlur={(field: string) => formik.setFieldTouched(field, true)}
          value={formik.values.interviewLanguage}
          error={formik.errors.interviewLanguage}
          touched={formik.touched.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button
            colorScheme="gray"
            type="button"
            onClick={() => handleTabChange(1)}
          >
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewSettingsForm;
