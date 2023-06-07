import * as yup from 'yup';
import { contentSuggestionValidationSchema } from 'validationSchema/content-suggestions';
import { integrationValidationSchema } from 'validationSchema/integrations';
import { keywordValidationSchema } from 'validationSchema/keywords';
import { performanceValidationSchema } from 'validationSchema/performances';

export const pencraftProValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  content_suggestion: yup.array().of(contentSuggestionValidationSchema),
  integration: yup.array().of(integrationValidationSchema),
  keyword: yup.array().of(keywordValidationSchema),
  performance: yup.array().of(performanceValidationSchema),
});
