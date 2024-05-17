// src/google.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('generate')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post('story')
  async generateStory(@Body() pdfUrls: string[]) {
    const result = await this.googleService.generateStory();
    return result;
  }
}
