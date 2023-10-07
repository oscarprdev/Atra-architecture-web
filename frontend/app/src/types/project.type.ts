export interface Project {
    id: string;
    name: string;
    year: number;
    mainImage: string;
    images: string[];
    description: string;
    top: boolean;
}

export type GalleryProject = Pick<
    Project,
    'id' | 'name' | 'mainImage' | 'description' | 'year'
>;
