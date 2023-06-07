import { PencraftProInterface } from 'interfaces/pencraft-pro';

export interface IntegrationInterface {
  id?: string;
  platform: string;
  api_key: string;
  pencraft_pro_id: string;
  created_at?: Date;
  updated_at?: Date;

  pencraft_pro?: PencraftProInterface;
  _count?: {};
}
