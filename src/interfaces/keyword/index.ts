import { PencraftProInterface } from 'interfaces/pencraft-pro';

export interface KeywordInterface {
  id?: string;
  keyword: string;
  pencraft_pro_id: string;
  created_at?: Date;
  updated_at?: Date;

  pencraft_pro?: PencraftProInterface;
  _count?: {};
}
