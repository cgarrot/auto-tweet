import { Injectable } from '@nestjs/common';
import { ImageService } from '../image';
import { TwitterService } from '../twitter';
import { GoogleService } from '../google';
import { simpleBubble } from '../image/html/simpleBubble';
import { text } from 'stream/consumers';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly imageService: ImageService,
    private readonly twitterService: TwitterService,
    private readonly googleService: GoogleService,
  ) {}

  async createWorkflow() {
    const story = await this.googleService.generateStory();
    const mediaIds = [];
    let index = 0;

    console.log(story);
    for (const page of story.text) {
      const imageBuffer = await this.imageService.generateImage(
        simpleBubble(page),
      );
      const mediaId = await this.twitterService.uploadMedia(imageBuffer);
      mediaIds.push({
        text: [index + 1, story.text.length].join('/'),
        mediaId,
      });
      index++;
    }

    return await this.twitterService.postTweetWithMediaThread(mediaIds);
  }
}
