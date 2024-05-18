// src/google.controller.ts

import { Controller, Post } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('generate')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  // @Post('story')
  // async generateStory() {
  //   const result = await this.googleService.generateStory();
  //   return result;
  // }
}
