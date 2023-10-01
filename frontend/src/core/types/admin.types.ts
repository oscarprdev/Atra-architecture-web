export interface PersonalInfoServiceOutput {
  data?: PersonalInfoServiceInput;
  status: number;
}

export interface PersonalInfoServiceInput {
  email: string;
  direction: string;
  phone: string;
}

export interface AboutServiceInput {
  image?: string;
  newImage?: File;
  project: string;
  text: string[];
}

export interface AboutServiceOutput {
  data?: AboutServiceInput;
  status: number;
}

export interface ProvideMainImageProjectPromiseInput {
  image: File;
  project: string;
  id: string;
}

export interface UpdateProjectFormData {
  name: string;
  year: number;
  images?: string[];
  description: string;
  top: boolean;
  mainImage?: File;
  newImages?: File[];
}

export interface UpdateProjectInput {
  project: UpdateProjectFormData;
  id: string;
}

export interface UpdateProjectHttpInput {
  name: string;
  year: number;
  images: string[];
  description: string;
  top: boolean;
  newImages?: File[];
}

export interface UpdateMainImageHttpInput {
  mainImage: File;
  project: string;
}

export interface UpdateProjectByIdOutput {
  status: number;
}

export interface RemoveProjectInput {
  id: string;
}

export interface DeleteProjectOk {
  status: number;
  id: string;
}

export interface CreateProjectInput {
  name: string;
  description: string;
  year: number;
  top: boolean;
  newImages: File[];
}
