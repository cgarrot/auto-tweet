import { Model } from 'src/utils/model';

export class Tweet extends Model<Tweet> {
  text: string;
  mediaId: string;
}
