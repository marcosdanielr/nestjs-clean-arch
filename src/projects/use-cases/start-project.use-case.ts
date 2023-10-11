import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StartProjectDto } from '../dto/start-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';

export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findOneByOrFail({ id });

    if (project.status === ProjectStatus.ACTIVE) {
      throw new Error('Cannot start activated project');
    }

    if (project.status === ProjectStatus.COMPLETED) {
      throw new Error('Cannot start completed project');
    }

    if (project.status === ProjectStatus.CANCELLED) {
      throw new Error('Cannot start canceled project');
    }

    project.started_at = input.started_at;
    project.status = ProjectStatus.ACTIVE;
  }
}
