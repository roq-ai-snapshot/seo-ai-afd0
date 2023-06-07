import * as yup from 'yup';

export const contentSuggestionValidationSchema = yup.object().shape({
  suggestion: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  pencraft_pro_id: yup.string().nullable().required(),
});
