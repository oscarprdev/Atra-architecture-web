import { apiUrl } from '../constants/api-url';
import { Project } from '../types/project.type';

export const getAllProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${apiUrl}/projects`);

    const { data }: { data: Project[] } = await response.json();

    return data;
};

export const getAllProjectsIds = async (): Promise<string[]> => {
    const response = await fetch(`${apiUrl}/projects`);

    const { data }: { data: Project[] } = await response.json();

    return data.map((project) => project.id);
};
