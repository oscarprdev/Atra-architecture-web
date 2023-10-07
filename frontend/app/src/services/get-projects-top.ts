import { apiUrl } from '../constants/api-url';
import { GalleryProject, Project } from '../types/project.type';

export const getProjectsByTop = async (): Promise<GalleryProject[]> => {
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
