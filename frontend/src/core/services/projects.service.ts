import { Project, ProjectDetail, ProjectGallery } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

interface ProjectsService {
  getProjects(): Promise<Project[] | { status: number }>;
  getProjectsGallery(): Promise<ProjectGallery[] | { status: number }>;
  getProjectById(id: string): Promise<ProjectDetail | { status: number }>;
}

export class DefaultProjectsService
  extends DefaultHttpBase
  implements ProjectsService
{
  async getProjects(): Promise<Project[] | { status: number }> {
    const projects = await this.get<Project[]>('projects');

    if (projects.status !== 400 && projects.data) {
      return projects.data;
    }

    return { status: projects.status };
  }

  async getProjectsGallery(): Promise<ProjectGallery[] | { status: number }> {
    const projects = await this.get<ProjectGallery[]>('projects?top=true');

    if (projects.status !== 400 && projects.data) {
      return projects.data;
    }

    return { status: projects.status };
  }

  async getProjectById(
    id: string
  ): Promise<ProjectDetail | { status: number }> {
    const project = await this.get<ProjectDetail>(`projects/${id}`);

    if (project.status !== 400 && project.data) {
      return project.data;
    }

    return { status: project.status };
  }
}
