import { Injectable } from '@nestjs/common';
import { ImageService } from '../image';
import { TwitterService } from '../twitter';
import {
  pickRandomAge,
  pickRandomGender,
  pickRandomSexualOrientation,
  pickRandomPersonality,
  pickRandomEthnic,
  pickRandomBeauty,
  pickRandomNumberPerson,
  pickRandomRelationType,
  pickRandomRelationGroupType,
  pickRandomEndingStory,
  pickRandomSituationType,
  pickRandomStoryType,
  pickRandomTextStrong,
  arrayNumberSlide,
  pickRandomNumberSlide,
} from 'src/utils/random';
import { StoryResult } from './model/story.model';
import { OpenaiService } from '../openai';
import { GoogleService } from '../google';
import {
  SecondCharacter,
  Story,
  instructions,
  paramMainCharacterPrompt,
  paramSecondCharacterPrompt,
  paramStoryPrompt,
  MainCharacter,
} from 'src/utils';
import { simpleBubble } from '../image/html/simpleBubble';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly imageService: ImageService,
    private readonly twitterService: TwitterService,
    private readonly googleService: GoogleService,
    private readonly openaiService: OpenaiService,
  ) {}

  async createWorkflow() {
    const story = await this.generateStory();
    const mediaIds = [];
    let index = 0;

    console.log(story);
    for (const page of story.text) {
      const imageBuffer = await this.imageService.generateImage(
        simpleBubble(page),
      );
      const mediaId = await this.twitterService.uploadMedia(imageBuffer);
      const text = [index + 1, story.text.length].join('/');
      mediaIds.push({
        text: index === 0 ? `${story.title}  ${text}` : text,
        mediaId,
      });
      index++;
    }

    return await this.twitterService.postTweetWithMediaThread(mediaIds);
  }

  async completeParams(prompt: string): Promise<string> {
    const complete = (await this.googleService.generate(prompt, [])) as string;
    return complete;
  }

  async completeParamsV2(prompt: string): Promise<any> {
    const complete = await this.openaiService.createChatCompletion([
      {
        role: 'user',
        content: prompt,
      },
    ]);
    return complete;
  }

  async generateMainCharacter(): Promise<string> {
    const mainCharacter = new MainCharacter({
      age: pickRandomAge(),
      gender: pickRandomGender(),
      ethnic: pickRandomEthnic(),
      sexual_orientation: pickRandomSexualOrientation(),
      physical_characteristics: {
        beauty: pickRandomBeauty(),
        height: 0,
        weight: 0,
        hair_color: '',
        eye_color: '',
        body: {
          type: '',
          boobs: '',
          butt: '',
          cock: '',
        },
      },
      mental_characteristics: {
        personality: pickRandomPersonality(),
        interests: ['', '', '', ''],
        hobbies: ['', '', ''],
      },
      highlight: '',
      sexual_fantasies: [''],
    });

    return await this.completeParams(
      paramMainCharacterPrompt(JSON.stringify(mainCharacter)),
    );
  }

  async generateSecondCharacter(): Promise<string> {
    const numberPerson = pickRandomNumberPerson();
    let secondCharacter;

    if (numberPerson === '1') {
      secondCharacter = new SecondCharacter({
        number: numberPerson,
        age: pickRandomAge(),
        gender: pickRandomGender(),
        ethnic: pickRandomEthnic(),
        relation_with_main_charactere: pickRandomRelationType(),
        sexual_orientation: pickRandomSexualOrientation(),
        physical_characteristics: {
          beauty: pickRandomBeauty(),
          height: 0,
          weight: 0,
          hair_color: '',
          eye_color: '',
          body: {
            type: '',
            boobs: '',
            butt: '',
            cock: '',
          },
        },
        mental_characteristics: {
          personality: pickRandomPersonality(),
          interests: ['', '', '', ''],
          hobbies: ['', '', ''],
        },
        highlight: '',
        sexual_fantasies: [''],
      });
    } else {
      secondCharacter = new SecondCharacter({
        number: numberPerson,
        age: pickRandomAge(),
        gender: pickRandomGender(),
        ethnic: pickRandomEthnic(),
        relation_with_main_charactere: pickRandomRelationGroupType(),
        sexual_orientation: pickRandomSexualOrientation(),
        highlight: '',
        sexual_fantasies: [''],
      });
    }

    return await this.completeParamsV2(
      paramSecondCharacterPrompt(JSON.stringify(secondCharacter)),
    );
  }

  async generateStoryContext(): Promise<string> {
    const storyContext = new Story({
      where: '',
      when: '',
      ending: pickRandomEndingStory(),
      situation: pickRandomSituationType(),
      story_type: pickRandomStoryType(),
      text_strong: pickRandomTextStrong(),
    });

    return await this.completeParamsV2(
      paramStoryPrompt(
        JSON.stringify(storyContext),
        await this.generateMainCharacter(),
        await this.generateSecondCharacter(),
      ),
    );
  }

  async generateStory(): Promise<StoryResult> {
    const numberSlide = pickRandomNumberSlide();
    return (await this.googleService.generate<StoryResult>(
      `New story with this context ${await this.generateStoryContext()}`,
      [
        {
          role: 'user',
          parts: [
            {
              text: '',
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: instructions(
                arrayNumberSlide(numberSlide).join(','),
                numberSlide,
              ),
            },
          ],
        },
      ],
      true,
    )) as StoryResult;
  }
}
