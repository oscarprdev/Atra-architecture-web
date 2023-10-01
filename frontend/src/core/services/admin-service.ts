import {
  AboutServiceInput,
  AboutServiceOutput,
  CreateProjectInput,
  DeleteProjectOk,
  PersonalInfoServiceInput,
  PersonalInfoServiceOutput,
  ProvideMainImageProjectPromiseInput,
  RemoveProjectInput,
  UpdateMainImageHttpInput,
  UpdateProjectByIdOutput,
  UpdateProjectFormData,
  UpdateProjectHttpInput,
  UpdateProjectInput,
} from '../types/admin.types';
import { DefaultHttpBase } from './http-base';

export interface AdminSignInInput {
  email: string;
  password: string;
}

export const adminSignIn = async (
  input: AdminSignInInput
): Promise<boolean> => {
  const validInput: Record<string, string> = {
    email: 'prueba@gmail.com',
    password: '1234',
  };

  return (
    input.email === validInput.email && input.password === validInput.password
  );
};

export interface AdminService {
  updatePersonalInfo(
    input: PersonalInfoServiceInput
  ): Promise<PersonalInfoServiceOutput>;
  updateAboutInfo(input: AboutServiceInput): Promise<AboutServiceOutput>;
  updateProjectById(
    input: UpdateProjectInput
  ): Promise<UpdateProjectByIdOutput>;
  removeProjectById(input: RemoveProjectInput): Promise<number>;
}

export class DefaultAdminService
  extends DefaultHttpBase
  implements AdminService
{
  private async compressImages(
    file: File,
    { quality, type }: { quality: number; type: string }
  ) {
    const imageBitmap = await createImageBitmap(file);

    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(imageBitmap, 0, 0);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, type, quality)
    );

    if (blob) {
      return new File([blob], file.name, {
        type: type,
      });
    }
  }

  private async provideAboutFormData(input: AboutServiceInput) {
    const formData = new FormData();

    for (const [key, entry] of Object.entries(input)) {
      if (Array.isArray(entry)) {
        formData.append(key, JSON.stringify(entry));
        continue;
      }

      if (key === 'newImage') {
        const imageFile = await this.compressImages(entry, {
          quality: 0.5,
          type: entry.type,
        });

        formData.append(key, imageFile || entry);
        continue;
      }

      formData.append(key, entry);
    }

    return formData;
  }

  private async provideMainImageFormData(input: UpdateMainImageHttpInput) {
    const formData = new FormData();

    for (const [key, entry] of Object.entries(input)) {
      if (key === 'mainImage') {
        const fileCompressed = await this.compressImages(entry, {
          quality: 0.5,
          type: entry.type,
        });
        formData.append(key, fileCompressed || entry);
        continue;
      }

      formData.append(key, entry);
    }

    return formData;
  }

  private async provideProjectInputFormData(input: UpdateProjectFormData) {
    const formData = new FormData();

    for (const [key, entry] of Object.entries(input)) {
      if (key !== 'mainImage') {
        if (key === 'newImages') {
          for (const file of entry) {
            const fileCompressed = await this.compressImages(file, {
              quality: 0.5,
              type: file.type,
            });

            formData.append(key, fileCompressed || file);
          }
          continue;
        }

        if (key === 'images') {
          formData.append(key, JSON.stringify(entry));
          continue;
        }

        formData.append(key, entry);
      }
    }

    return formData;
  }

  private async provideMainImageProjectPromise({
    image,
    project,
    id,
  }: ProvideMainImageProjectPromiseInput) {
    const mainImageFormData = await this.provideMainImageFormData({
      mainImage: image,
      project: project,
    });

    if (mainImageFormData) {
      return await this.sendFormData<UpdateProjectHttpInput>(
        `projects/main-image/${id}`,
        mainImageFormData,
        'PATCH'
      );
    }

    return {
      status: 400,
    };
  }

  async updatePersonalInfo(
    input: PersonalInfoServiceInput
  ): Promise<PersonalInfoServiceOutput> {
    const response = await this.patchJson<PersonalInfoServiceInput>(
      'personal-info',
      input
    );

    if (response.data) {
      return {
        data: {
          email: response.data.email,
          direction: response.data.direction,
          phone: response.data.phone,
        },
        status: response.status,
      };
    }

    return {
      status: response.status,
    };
  }

  async updateAboutInfo(input: AboutServiceInput): Promise<AboutServiceOutput> {
    const aboutFormData = await this.provideAboutFormData(input);

    if (aboutFormData) {
      const response = await this.sendFormData<AboutServiceInput>(
        'about',
        aboutFormData,
        'PATCH'
      );

      return {
        status: response.status,
      };
    }

    return {
      status: 400,
    };
  }

  async createProject(input: CreateProjectInput) {
    const projectFormData = await this.provideProjectInputFormData(input);

    if (projectFormData) {
      const response = await this.sendFormData<CreateProjectInput>(
        `projects`,
        projectFormData,
        'POST'
      );

      if (response.data) {
        return {
          status: response.status,
          data: response.data,
        };
      }

      return {
        status: response.status,
      };
    }

    return {
      status: 400,
    };
  }

  async updateProjectById(
    input: UpdateProjectInput
  ): Promise<{ status: number }> {
    const promises = [];

    const projectFormData = await this.provideProjectInputFormData(
      input.project
    );

    if (projectFormData) {
      promises.push(
        this.sendFormData<UpdateProjectHttpInput>(
          `projects/${input.id}`,
          projectFormData,
          'PATCH'
        )
      );

      if (input.project.mainImage) {
        promises.push(
          this.provideMainImageProjectPromise({
            image: input.project.mainImage,
            project: input.project.name,
            id: input.id,
          })
        );
      }

      const responses = await Promise.all(promises);

      if (responses.every((res) => res.data)) {
        return {
          status: 200,
        };
      } else {
        return {
          status: 400,
        };
      }
    }

    return {
      status: 400,
    };
  }

  async removeProjectById({ id }: RemoveProjectInput): Promise<number> {
    const response = await this.delete<DeleteProjectOk>(`projects/${id}`);

    return response.status;
  }
}
