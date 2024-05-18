// src/google.service.ts

import { Injectable } from '@nestjs/common';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { message } from '../../utils/prompt/stories';
import { generationConfig, safetySettings } from './google.const';

@Injectable()
export class GoogleService {
  private readonly genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  private getModel() {
    return this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro-latest',
    });
  }

  async generate<T>(
    prompt: string,
    history: Content[],
    jsonOuput: boolean = false,
  ): Promise<string | T> {
    const model = this.getModel();

    const chatSession = model.startChat({
      generationConfig: {
        ...generationConfig,
        responseMimeType: jsonOuput ? 'application/json' : 'text/plain',
      },
      safetySettings,
      history,
    });

    if (jsonOuput) {
      const result = await chatSession.sendMessage(message);
      const parsedResult = JSON.parse(
        result.response.candidates[0].content.parts[0].text,
      );
      return parsedResult as T;
    }

    const result = await chatSession.sendMessage(prompt);
    return result.response.candidates[0].content.parts[0].text;
  }
}
