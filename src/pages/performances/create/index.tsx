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
import { createPerformance } from 'apiSdk/performances';
import { Error } from 'components/error';
import { performanceValidationSchema } from 'validationSchema/performances';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PencraftProInterface } from 'interfaces/pencraft-pro';
import { getPencraftPros } from 'apiSdk/pencraft-pros';
import { PerformanceInterface } from 'interfaces/performance';

function PerformanceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PerformanceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPerformance(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PerformanceInterface>({
    initialValues: {
      user_engagement: 0,
      seo_score: 0,
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      pencraft_pro_id: (router.query.pencraft_pro_id as string) ?? null,
    },
    validationSchema: performanceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Performance
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="user_engagement" mb="4" isInvalid={!!formik.errors?.user_engagement}>
            <FormLabel>User Engagement</FormLabel>
            <NumberInput
              name="user_engagement"
              value={formik.values?.user_engagement}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('user_engagement', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.user_engagement && <FormErrorMessage>{formik.errors?.user_engagement}</FormErrorMessage>}
          </FormControl>
          <FormControl id="seo_score" mb="4" isInvalid={!!formik.errors?.seo_score}>
            <FormLabel>Seo Score</FormLabel>
            <NumberInput
              name="seo_score"
              value={formik.values?.seo_score}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('seo_score', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.seo_score && <FormErrorMessage>{formik.errors?.seo_score}</FormErrorMessage>}
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
  entity: 'performance',
  operation: AccessOperationEnum.CREATE,
})(PerformanceCreatePage);
