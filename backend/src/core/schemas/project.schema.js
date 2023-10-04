export function validateProjectSchema(input) {
  const errors = {};

  // Validate 'name'
  if (!input.name) {
    errors.name = 'Project name is required.';
  } else if (typeof input.name !== 'string') {
    errors.name = 'Project name must be a string';
  }

  // Validate 'year'
  if (!input.year || typeof input.year !== 'number' || input.year < 2000) {
    errors.year = 'Project Year must be greater than or equal to 2000';
  }

  // Validate 'description'
  if (!input.description) {
    errors.description = 'Project description is required.';
  } else if (typeof input.description !== 'string') {
    errors.description = 'Project description must be a string';
  }

  // Validate 'images'
  if (!input.images || !Array.isArray(input.images) || input.images.some((item) => typeof item !== 'string')) {
    errors.images = 'Images must be an array of valid URLs';
  } else {
    // Validate each image URL
    input.images.forEach((imageUrl, index) => {
      if (!isValidUrl(imageUrl)) {
        if (!errors.images) {
          errors.images = [];
        }
        errors.images[index] = 'Image URL must be a valid URL';
      }
    });
  }

  // Validate 'top'
  if (typeof input.top !== 'boolean') {
    errors.top = 'Top value must be a boolean';
  }

  // Check if there are any errors
  if (Object.keys(errors).length === 0) {
    return { success: true };
  } else {
    return { success: false, errors };
  }
}

export function validatePartialProjectSchema(input) {
  const errors = {};

  // Validate 'name' if it exists
  if (input.name && typeof input.name !== 'string') {
    errors.name = 'Project name must be a string';
  }

  // Validate 'year' if it exists
  if (input.year) {
    if (typeof input.year !== 'number' || input.year < 2000) {
      errors.year = 'Project Year must be greater than or equal to 2000';
    }
  }

  // Validate 'description' if it exists
  if (input.description && typeof input.description !== 'string') {
    errors.description = 'Project description must be a string';
  }

  // Validate 'images' if it exists
  if (input.images) {
    if (!Array.isArray(input.images) || input.images.some((item) => typeof item !== 'string')) {
      errors.images = 'Images must be an array of valid URLs';
    } else {
      // Validate each image URL
      input.images.forEach((imageUrl, index) => {
        if (!isValidUrl(imageUrl)) {
          if (!errors.images) {
            errors.images = [];
          }
          errors.images[index] = 'Image URL must be a valid URL';
        }
      });
    }
  }

  // Validate 'top' if it exists
  if (input.top !== undefined && typeof input.top !== 'boolean') {
    errors.top = 'Top value must be a boolean';
  }

  // Check if there are any errors
  if (Object.keys(errors).length === 0) {
    return { success: true };
  } else {
    return { success: false, errors };
  }
}

export function validateProjectImageSchema(input) {
  const errors = {};

  // Validate 'mainImage'
  if (!input.mainImage || !isValidUrl(input.mainImage)) {
    errors.mainImage = 'mainImage must be a valid URL';
  }

  // Check if there are any errors
  if (Object.keys(errors).length === 0) {
    return { success: true };
  } else {
    return { success: false, errors };
  }
}

// Helper function to validate URL format
function isValidUrl(url) {
  // Use a regular expression to validate the URL format
  const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}
