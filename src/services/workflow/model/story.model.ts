import { Model } from 'src/utils/model';

export class StoryResult extends Model<StoryResult> {
  title: string;
  text: string[];
}
