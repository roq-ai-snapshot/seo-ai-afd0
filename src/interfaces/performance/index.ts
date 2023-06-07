import { PencraftProInterface } from 'interfaces/pencraft-pro';

export interface PerformanceInterface {
  id?: string;
  user_engagement: number;
  seo_score: number;
  pencraft_pro_id: string;
  created_at?: Date;
  updated_at?: Date;

  pencraft_pro?: PencraftProInterface;
  _count?: {};
}
