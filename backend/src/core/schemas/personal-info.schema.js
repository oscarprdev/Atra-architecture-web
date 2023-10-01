export function validatePersonalInfoSchema(input) {
  const errors = {};

  // Validate 'name'
  if (!input.name) {
    errors.name = 'Name is required.';
  } else if (typeof input.name !== 'string') {
    errors.name = 'Name must be a string';
  }

  // Validate 'phone'
  if (!input.phone) {
    errors.phone = 'Phone is required.';
  } else if (typeof input.phone !== 'string') {
    errors.phone = 'Phone must be a string';
  }

  // Validate 'email'
  if (!input.email) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Email must be a valid email string';
  }

  // Validate 'direction'
  if (!input.direction) {
    errors.direction = 'Direction is required.';
  } else if (typeof input.direction !== 'string') {
    errors.direction = 'Direction must be a string';
  }

  // Check if there are any errors
  if (Object.keys(errors).length === 0) {
    return { success: true };
  } else {
    return { success: false, errors };
  }
}

export function validatePartialPersonalInfoSchema(input) {
  const errors = {};

  // Validate 'name' if it exists
  if (input.name && typeof input.name !== 'string') {
    errors.name = 'Name must be a string';
  }

  // Validate 'phone' if it exists
  if (input.phone && typeof input.phone !== 'string') {
    errors.phone = 'Phone must be a string';
  }

  // Validate 'email' if it exists
  if (input.email) {
    if (!isValidEmail(input.email)) {
      errors.email = 'Email must be a valid email string';
    }
  }

  // Validate 'direction' if it exists
  if (input.direction && typeof input.direction !== 'string') {
    errors.direction = 'Direction must be a string';
  }

  // Check if there are any errors
  if (Object.keys(errors).length === 0) {
    return { success: true };
  } else {
    return { success: false, errors };
  }
}

// Helper function to validate email format
function isValidEmail(email) {
  // Use a regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
