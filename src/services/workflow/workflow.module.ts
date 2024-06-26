import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { ImageModule } from '../image';
import { TwitterModule } from '../twitter';
import { GoogleModule } from '../google';
import { TasksService } from './task.service';
import { OpenaiModule } from '../openai';

@Module({
  imports: [ImageModule, TwitterModule, GoogleModule, OpenaiModule],
  controllers: [WorkflowController],
  providers: [WorkflowService, TasksService],
  exports: [TasksService],
})
export class WorkflowModule {}
