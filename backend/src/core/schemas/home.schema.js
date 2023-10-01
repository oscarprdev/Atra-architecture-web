import { z } from 'zod';

const homeSchema = z.object({
  title: z.string({
    invalid_type_error: 'Home title must be a string',
    required_error: 'Home title is required.',
  }),
  subtitle: z.string({
    invalid_type_error: 'Home subtitle must be a string',
    required_error: 'Home subtitle is required.',
  }),
});

export function validateHomeSchema(input) {
  return homeSchema.safeParse(input);
}

export function validatePartialHomeSchema(input) {
  return homeSchema.partial().safeParse(input);
}
