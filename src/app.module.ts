import { Module } from '@nestjs/common';
import { WorkflowModule } from './services';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), WorkflowModule],
})
export class AppModule {}
