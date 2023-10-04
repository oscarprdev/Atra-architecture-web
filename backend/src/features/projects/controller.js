import { MainController } from '../shared/main-controller.js';
import { ProjectsModel } from './model.js';

export class ProjectsController extends MainController {
  static async provideData(req, res) {
    try {
      if (req.query.top) {
        return ProjectsController.provideProjectsByTop(res, req.query.top);
      }

      const projects = await ProjectsModel.provideData();

      super.generateResponse({ res, status: 201, data: projects });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }

  static async provideProjectById(req, res) {
    try {
      const { id } = req.params;

      const project = await ProjectsModel.provideProjectById(id);

      super.generateResponse({ res, status: 201, data: project });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }

  static async provideProjectsByTop(res, top) {
    try {
      const projects = await ProjectsModel.provideProjectsByTop(top);

      super.generateResponse({ res, status: 201, data: projects });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }

  static async createNewProject(req, res) {
    try {
      const allImages = req.files_url;
      const projectInput = {
        ...req.body,
        year: JSON.parse(req.body.year),
        top: JSON.parse(req.body.top),
        mainImage: allImages[0],
        images: allImages.splice(1, allImages.length - 1)
      };

      const project = await ProjectsModel.createNewProject(projectInput);

      super.generateResponse({ res, status: 201, data: project });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }

  static async updateProject(req, res) {
    try {
      const { id } = req.params;
      const newImages = req.files_url;
      const currentImages = req.body.images || [];

      let projectInput = {
        ...req.body,
        year: JSON.parse(req.body.year),
        top: JSON.parse(req.body.top),
        images: super.provideProjectImages(newImages, currentImages)
      };

      const project = await ProjectsModel.updateProject(projectInput, id);

      super.generateResponse({ res, status: 201, data: project });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }

  static async updateMainImageProject(req, res) {
    try {
      const { id } = req.params;
      const image = req.file_url;

      const response = await ProjectsModel.updateMainImage(id, image);

      super.generateResponse({ res, status: 201, data: response });
    } catch (error) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }

  static async deleteProject(req, res) {
    try {
      const { id } = req.params;

      const response = await ProjectsModel.deleteProject(id);

      super.generateResponse({ res, status: 204, data: response });
    } catch (error) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }
}
