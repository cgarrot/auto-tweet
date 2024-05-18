import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TwitterService],
  exports: [TwitterService],
})
export class TwitterModule {}
