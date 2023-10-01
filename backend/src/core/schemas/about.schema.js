export function validateAboutSchema(input) {
  const errors = {};

  if (!input.title) {
    errors.title = 'About title is required.';
  } else if (typeof input.title !== 'string') {
    errors.title = 'About title must be a string';
  }

  if (!input.text) {
    errors.text = 'About text is required.';
  } else if (
    !Array.isArray(input.text) ||
    input.text.some((item) => typeof item !== 'string')
  ) {
    errors.text = 'About text must be an array of strings';
  }

  if (input.image && typeof input.image !== 'string') {
    errors.image = 'Image must be a valid URL';
  }

  if (Object.keys(errors).length === 0) {
    return { success: true };
  } else {
    return { success: false, errors };
  }
}

export function validatePartialAboutSchema(input) {
  const errors = {};

  if (input.title && typeof input.title !== 'string') {
    errors.title = 'About title must be a string';
  }

  if (input.text) {
    if (
      !Array.isArray(input.text) ||
      input.text.some((item) => typeof item !== 'string')
    ) {
      errors.text = 'About text must be an array of strings';
    }
  }

  if (input.image && typeof input.image !== 'string') {
    errors.image = 'Image must be a valid URL';
  }

  if (Object.keys(errors).length === 0) {
    return { success: true };
  } else {
    return { success: false, errors };
  }
}
