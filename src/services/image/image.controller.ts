import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('generate')
  async generateImage(
    @Body('htmlContent') htmlContent: string,
    @Res() res: Response,
  ) {
    const imageBuffer = await this.imageService.generateImage(htmlContent);
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  }
}
