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
import { createIntegration } from 'apiSdk/integrations';
import { Error } from 'components/error';
import { integrationValidationSchema } from 'validationSchema/integrations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PencraftProInterface } from 'interfaces/pencraft-pro';
import { getPencraftPros } from 'apiSdk/pencraft-pros';
import { IntegrationInterface } from 'interfaces/integration';

function IntegrationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: IntegrationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createIntegration(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<IntegrationInterface>({
    initialValues: {
      platform: '',
      api_key: '',
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      pencraft_pro_id: (router.query.pencraft_pro_id as string) ?? null,
    },
    validationSchema: integrationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Integration
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="platform" mb="4" isInvalid={!!formik.errors?.platform}>
            <FormLabel>Platform</FormLabel>
            <Input type="text" name="platform" value={formik.values?.platform} onChange={formik.handleChange} />
            {formik.errors.platform && <FormErrorMessage>{formik.errors?.platform}</FormErrorMessage>}
          </FormControl>
          <FormControl id="api_key" mb="4" isInvalid={!!formik.errors?.api_key}>
            <FormLabel>Api Key</FormLabel>
            <Input type="text" name="api_key" value={formik.values?.api_key} onChange={formik.handleChange} />
            {formik.errors.api_key && <FormErrorMessage>{formik.errors?.api_key}</FormErrorMessage>}
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
  entity: 'integration',
  operation: AccessOperationEnum.CREATE,
})(IntegrationCreatePage);
