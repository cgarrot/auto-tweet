import { Model } from 'src/utils/model';
import {
  EndingStory,
  SituationType,
  StoryType,
  TextStrong,
} from './storyParam';

export class Story extends Model<Story> {
  when: string;
  where: string;
  situation: SituationType;
  story_type: StoryType;
  text_strong: TextStrong;
  ending: EndingStory;
}
