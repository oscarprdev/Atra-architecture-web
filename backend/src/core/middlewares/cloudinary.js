import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cloudinary from 'cloudinary';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Local
const __dirname = path.dirname(__filename); // Local

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/temp')); // Local
    // cb(null, path.join('/tmp'));
  },
});

const fileFilter = (req, file, cd) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    cd(new Error('Invalid file type'));
  } else {
    cd(null, true);
  }
};

const provideImagesFromFolder = async () => {
  return await cloudinary.v2.api.resources({
    resource_type: 'image',
  });
};

const removeOldImageFromCloudinary = async (imageIds, folder) => {
  const images = await provideImagesFromFolder(folder);

  const oldImages = images.resources.filter(
    (image) => folder === image.folder && !imageIds.includes(image.public_id)
  );

  if (oldImages) {
    for (const oldImage of oldImages) {
      await cloudinary.v2.uploader.destroy(oldImage.public_id);
    }
  }

  return;
};

const uploadToCloudinary = async (file, folder) => {
  const filePath = file.path;

  const image = await cloudinary.v2.uploader.upload(filePath, {
    folder,
  });

  await fs.unlinkSync(filePath);

  return {
    url: image.secure_url,
    id: image.public_id,
  };
};

const uploadVariousImagesToCloudinary = async (
  method,
  newImages,
  currentImages,
  folder
) => {
  let secureImagesUrlPromises = await newImages.map(
    async (file) => await uploadToCloudinary(file, folder)
  );

  const cloudinaryImages = await Promise.all(secureImagesUrlPromises);

  if (
    method === 'PATCH' &&
    currentImages &&
    Array.isArray(currentImages) &&
    currentImages.length === 0
  ) {
    const imageIds = cloudinaryImages.map((image) => image.id);

    await removeOldImageFromCloudinary([...imageIds], folder);
  }

  return {
    currentImages,
    newImages: cloudinaryImages.map((image) => image.url),
  };
};

const uploadSingleImageToCloudinary = async (method, image, folder) => {
  const { url, id } = await uploadToCloudinary(image, folder);

  if (method === 'PATCH') {
    await removeOldImageFromCloudinary([id], folder);
  }

  return {
    newImage: url,
  };
};

const useCloudinary = async (req, res, next) => {
  const folderPrefix = req.body.name || req.body.project;
  const projectFolder = folderPrefix ? `ATRA/${folderPrefix}` : 'ATRA';

  try {
    if (req.files) {
      const imagesFormated = req.body.images ? JSON.parse(req.body.images) : [];
      const { currentImages, newImages } =
        await uploadVariousImagesToCloudinary(
          req.method,
          req.files,
          imagesFormated,
          projectFolder
        );

      req.body.images = currentImages;
      req.files_url = newImages;

      return next();
    }

    if (req.file) {
      const { newImage } = await uploadSingleImageToCloudinary(
        req.method,
        req.file,
        projectFolder
      );

      req.file_url = newImage;

      return next();
    }

    return next();
  } catch (error) {
    console.log(error, 'error');
    return next(error);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export { upload, useCloudinary };
