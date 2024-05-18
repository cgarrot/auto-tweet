import { Module } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenaiService } from './openai.service';

@Module({
  providers: [
    OpenaiService,
    {
      provide: OpenAI,
      useFactory: () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
    },
  ],
  exports: [OpenaiService],
})
export class OpenaiModule {}
