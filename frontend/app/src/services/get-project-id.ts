import { apiUrl } from '../constants/api-url';
import { Project } from '../types/project.type';

export const getProjectById = async (id: string): Promise<Project> => {
    const response = await fetch(`${apiUrl}/projects/${id}`);

    const { data }: { data: Project } = await response.json();

    return data;
};
