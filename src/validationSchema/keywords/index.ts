import * as yup from 'yup';

export const keywordValidationSchema = yup.object().shape({
  keyword: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  pencraft_pro_id: yup.string().nullable().required(),
});
