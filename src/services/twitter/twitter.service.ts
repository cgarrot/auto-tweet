import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import * as crypto from 'crypto';
import * as OAuth from 'oauth-1.0a';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { TwitterApi } from 'twitter-api-v2';
import { Tweet } from './model/tweet.model';

@Injectable()
export class TwitterService {
  private readonly client: TwitterApi;
  private consumerKey: string = process.env.TWITTER_API_KEY;
  private consumerSecret: string = process.env.TWITTER_API_SECRET_KEY;
  private accessToken: string = process.env.TWITTER_ACCESS_TOKEN;
  private accessTokenSecret: string = process.env.TWITTER_ACCESS_TOKEN_SECRET;

  constructor(private httpService: HttpService) {
    this.client = new TwitterApi({
      appKey: this.consumerKey,
      appSecret: this.consumerSecret,
      accessToken: this.accessToken,
      accessSecret: this.accessTokenSecret,
    });
  }

  private getOAuth1Client() {
    return new OAuth({
      consumer: { key: this.consumerKey, secret: this.consumerSecret },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64');
      },
    });
  }

  async uploadMedia(imageBuffer: Buffer): Promise<string> {
    const url =
      'https://upload.twitter.com/1.1/media/upload.json?media_category=tweet_image';
    const form = new FormData();
    form.append('media', imageBuffer, {
      filename: 'image.png',
      contentType: 'image/png',
    });

    const oauth = this.getOAuth1Client();
    const request_data = {
      url,
      method: 'POST',
    };
    const headers = {
      ...form.getHeaders(),
      ...oauth.toHeader(
        oauth.authorize(request_data, {
          key: this.accessToken,
          secret: this.accessTokenSecret,
        }),
      ),
    };

    const response: AxiosResponse<any> = await this.httpService
      .post(url, form, { headers })
      .toPromise();
    return response.data.media_id_string;
  }

  async postTweetWithMediaThread(body: Tweet[]): Promise<void> {
    await this.client.v2.tweetThread(
      body.map((tweet) => {
        if (tweet.mediaId) {
          return {
            text: tweet.text,
            media: { media_ids: [tweet.mediaId] },
          };
        }
        return tweet.text;
      }),
    );
  }

  async postTweetWithMedia(body: Tweet): Promise<void> {
    await this.client.v2.tweet({
      text: body.text,
      media: { media_ids: [body.mediaId] },
    });
  }

  async postTweet(tweetText: string): Promise<void> {
    await this.client.v2.tweet(tweetText);
  }
}
