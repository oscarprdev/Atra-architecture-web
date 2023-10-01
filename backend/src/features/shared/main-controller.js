export class MainController {
  static generateDate() {
    const currentDate = new Date(Date.now());

    return currentDate.toLocaleString();
  }

  static generateResponse({ res, status, data }) {
    const outputResponse = {
      status,
      data,
      createdAt: MainController.generateDate(),
    };
    return res.json(outputResponse);
  }

  static generateErrorResponse({ res, status, error }) {
    return res.status(status).json({ error: JSON.parse(error) });
  }

  static provideProjectImages(imagesUrls, bodyImages) {
    let images = bodyImages;

    if (Array.isArray(imagesUrls) && imagesUrls.length > 0) {
      images.push(...imagesUrls);
    }

    return images;
  }
}
