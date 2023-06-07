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
import { createKeyword } from 'apiSdk/keywords';
import { Error } from 'components/error';
import { keywordValidationSchema } from 'validationSchema/keywords';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PencraftProInterface } from 'interfaces/pencraft-pro';
import { getPencraftPros } from 'apiSdk/pencraft-pros';
import { KeywordInterface } from 'interfaces/keyword';

function KeywordCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: KeywordInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createKeyword(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<KeywordInterface>({
    initialValues: {
      keyword: '',
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      pencraft_pro_id: (router.query.pencraft_pro_id as string) ?? null,
    },
    validationSchema: keywordValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Keyword
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="keyword" mb="4" isInvalid={!!formik.errors?.keyword}>
            <FormLabel>Keyword</FormLabel>
            <Input type="text" name="keyword" value={formik.values?.keyword} onChange={formik.handleChange} />
            {formik.errors.keyword && <FormErrorMessage>{formik.errors?.keyword}</FormErrorMessage>}
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
  entity: 'keyword',
  operation: AccessOperationEnum.CREATE,
})(KeywordCreatePage);
