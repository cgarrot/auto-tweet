import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatOpenaiDetails } from './model/chatOpenai.model';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
  constructor(private readonly openai: OpenAI) {}

  async createChatCompletion(messages: ChatOpenaiDetails[]) {
    return this.openai.chat.completions.create({
      messages: messages as ChatCompletionMessageParam[],
      model: 'gpt-4o',
    });
  }
}
