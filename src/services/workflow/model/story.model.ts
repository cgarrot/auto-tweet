import { Model } from 'src/utils/model';

export class Story extends Model<Story> {
  title: string;
  text: string[];
}
