import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

export interface IProjectRepository {
  create(project: Project): Promise<void>;
  update(project: Project): Promise<void>;
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project>;
}

@Injectable()
export class ProjectTypeOrmRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private typeOrmRepo: Repository<Project>,
  ) {}

  async create(project: Project) {
    await this.typeOrmRepo.save(project);
  }

  async update(project: Project) {
    await this.typeOrmRepo.update(project.id, project);
  }

  findAll() {
    return this.typeOrmRepo.find();
  }

  findById(id: string) {
    return this.typeOrmRepo.findOneByOrFail({ id });
  }
}
