import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createContentSuggestion } from 'apiSdk/content-suggestions';
import { Error } from 'components/error';
import { contentSuggestionValidationSchema } from 'validationSchema/content-suggestions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PencraftProInterface } from 'interfaces/pencraft-pro';
import { getPencraftPros } from 'apiSdk/pencraft-pros';
import { ContentSuggestionInterface } from 'interfaces/content-suggestion';

function ContentSuggestionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ContentSuggestionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createContentSuggestion(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ContentSuggestionInterface>({
    initialValues: {
      suggestion: '',
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      pencraft_pro_id: (router.query.pencraft_pro_id as string) ?? null,
    },
    validationSchema: contentSuggestionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Content Suggestion
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="suggestion" mb="4" isInvalid={!!formik.errors?.suggestion}>
            <FormLabel>Suggestion</FormLabel>
            <Input type="text" name="suggestion" value={formik.values?.suggestion} onChange={formik.handleChange} />
            {formik.errors.suggestion && <FormErrorMessage>{formik.errors?.suggestion}</FormErrorMessage>}
          </FormControl>
          <FormControl id="created_at" mb="4">
            <FormLabel>Created At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <FormControl id="updated_at" mb="4">
            <FormLabel>Updated At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.updated_at}
              onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
            />
          </FormControl>
          <AsyncSelect<PencraftProInterface>
            formik={formik}
            name={'pencraft_pro_id'}
            label={'Select Pencraft Pro'}
            placeholder={'Select Pencraft Pro'}
            fetcher={getPencraftPros}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'content_suggestion',
  operation: AccessOperationEnum.CREATE,
})(ContentSuggestionCreatePage);
