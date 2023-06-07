import * as yup from 'yup';

export const integrationValidationSchema = yup.object().shape({
  platform: yup.string().required(),
  api_key: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  pencraft_pro_id: yup.string().nullable().required(),
});
