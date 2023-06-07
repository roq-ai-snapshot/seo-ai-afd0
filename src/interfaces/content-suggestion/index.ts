import { PencraftProInterface } from 'interfaces/pencraft-pro';

export interface ContentSuggestionInterface {
  id?: string;
  suggestion: string;
  pencraft_pro_id: string;
  created_at?: Date;
  updated_at?: Date;

  pencraft_pro?: PencraftProInterface;
  _count?: {};
}
