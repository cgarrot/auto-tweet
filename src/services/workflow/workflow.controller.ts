import { Controller, Post } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  // @Post()
  // async startWorkflow() {
  //   return await this.workflowService.createWorkflow();
  // }
}
