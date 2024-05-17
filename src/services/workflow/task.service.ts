import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WorkflowService } from './workflow.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private readonly workflowService: WorkflowService;

  constructor(workflowService: WorkflowService) {
    this.workflowService = workflowService;
  }

  @Cron('0 */30 12-17 * * *')
  handleCron() {
    this.logger.debug('Creating story...');
    this.workflowService.createWorkflow();
    this.logger.debug('Story created!');
  }
}
