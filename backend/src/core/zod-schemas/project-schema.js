import { z } from 'zod';

const projectSchema = z.object({
  name: z.string({
    required_error: 'Project name is required.',
    invalid_type_error: 'Project name must be a string',
  }),
  year: z
    .number()
    .gte(2000, { message: 'Project Year must be greater than 2000' }),
  description: z.string({
    required_error: 'Project name is required.',
    invalid_type_error: 'Project name must be a string',
  }),
  images: z.array(
    z.string().url({
      message: 'mainImage must be a valid url',
    })
  ),
  top: z.boolean({
    required_error: 'top value is required',
    invalid_type_error: 'top value must be a boolean',
  }),
});

export function validateProjectSchema(input) {
  return projectSchema.safeParse(input);
}

export function validatePartialProjectSchema(input) {
  return projectSchema.partial().safeParse(input);
}

const projectImageSchema = z.object({
  mainImage: z.string().url({
    message: 'mainImage must be a valid url',
  }),
});

export function validateProjectImageSchema(input) {
  return projectImageSchema.safeParse(input);
}
