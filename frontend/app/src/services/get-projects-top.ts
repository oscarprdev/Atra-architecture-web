import { apiUrl } from '../constants/api-url';
import { Project } from '../types/project.type';

export type GetProjectsByTopOutput = Promise<
    Pick<Project, 'id' | 'name' | 'mainImage' | 'description' | 'year'>[]
>;

export const getProjectsByTop = async (): GetProjectsByTopOutput => {
    const response = await fetch(`${apiUrl}/projects?top=true`);

    const { data }: { data: Project[] } = await response.json();

    return data.map(({ id, name, description, year, mainImage }) => ({
        id,
        name,
        description,
        year,
        mainImage
    }));
};
