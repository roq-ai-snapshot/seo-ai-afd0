import * as yup from 'yup';

export const performanceValidationSchema = yup.object().shape({
  user_engagement: yup.number().integer().required(),
  seo_score: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  pencraft_pro_id: yup.string().nullable().required(),
});
