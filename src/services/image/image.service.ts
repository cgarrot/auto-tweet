import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ImageService {
  async generateImage(htmlContent: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Useful for certain environments
    });
    const page = await browser.newPage();

    // Set the content of the page
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Capture a screenshot of the page
    const imageBuffer = await page.screenshot({ fullPage: true });

    await browser.close();
    return imageBuffer;
  }
}
