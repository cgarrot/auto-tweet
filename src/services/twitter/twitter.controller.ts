import { Controller, Post, Body } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { Buffer } from 'buffer';
@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Post('tweetMedia')
  async postTweetMedia(@Body() body: { text: string; imageBuffer: Buffer }) {
    const mediaId = await this.twitterService.uploadMedia(body.imageBuffer);
    const tweet = await this.twitterService.postTweetWithMedia({
      text: body.text,
      mediaId,
    });
    return tweet;
  }

  @Post('tweet')
  async postTweet() {
    // console.log('text', text);
    const tweet = await this.twitterService.postTweet('text');
    return tweet;
  }
}
