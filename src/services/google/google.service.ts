// src/google.service.ts

import { Injectable } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import axios from 'axios';
import { instructions, message, stories } from './prompt/stories';
import { Story } from '../workflow/model/story.model';

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

  private async downloadFile(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary').toString('base64');
  }

  private async urlToGenerativePart(url: string, mimeType: string) {
    const base64Data = await this.downloadFile(url);
    return {
      inlineData: {
        data: base64Data,
        mimeType,
      },
    };
  }

  async generateStory(): Promise<Story> {
    const model = this.getModel();
    const prompt = instructions;

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: stories,
            },
          ],
        },
        {
          role: 'model',
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage(message);
    const parsedResult = JSON.parse(
      result.response.candidates[0].content.parts[0].text,
    );
    return parsedResult;
  }
}
