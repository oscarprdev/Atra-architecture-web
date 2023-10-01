import { Project, ProjectDetail, ProjectGallery } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

interface ProjectsService {
  getProjects(): Promise<Project[]>;
  getProjectsGallery(): Promise<ProjectGallery[]>;
  getProjectById(id: string): Promise<ProjectDetail>;
}

export class DefaultProjectsService
  extends DefaultHttpBase
  implements ProjectsService
{
  async getProjects(): Promise<Project[]> {
    const projects = await this.get<Project[]>('projects');

    return projects.data;
  }

  async getProjectsGallery(): Promise<ProjectGallery[]> {
    const projects = await this.get<ProjectGallery[]>('projects?top=true');

    return projects.data;
  }

  async getProjectById(id: string): Promise<ProjectDetail> {
    const project = await this.get<ProjectDetail>(`projects/${id}`);

    return project.data;
  }
}
