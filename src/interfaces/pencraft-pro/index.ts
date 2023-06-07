import { ContentSuggestionInterface } from 'interfaces/content-suggestion';
import { IntegrationInterface } from 'interfaces/integration';
import { KeywordInterface } from 'interfaces/keyword';
import { PerformanceInterface } from 'interfaces/performance';
import { UserInterface } from 'interfaces/user';

export interface PencraftProInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  content_suggestion?: ContentSuggestionInterface[];
  integration?: IntegrationInterface[];
  keyword?: KeywordInterface[];
  performance?: PerformanceInterface[];
  user?: UserInterface;
  _count?: {
    content_suggestion?: number;
    integration?: number;
    keyword?: number;
    performance?: number;
  };
}
