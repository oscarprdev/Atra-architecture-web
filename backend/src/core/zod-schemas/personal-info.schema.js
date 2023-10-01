import { z } from 'zod';

const personalInfoSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required.',
  }),
  phone: z.string({
    invalid_type_error: 'Phone must be a string',
    required_error: 'Phone is required.',
  }),
  email: z.string().email({
    invalid_type_error: 'Email must be a valid email string',
    required_error: 'Email is required.',
  }),
  direction: z.string({
    invalid_type_error: 'Direction must be a string',
    required_error: 'Direction is required.',
  }),
});

export function validatePersonalInfoSchema(input) {
  return personalInfoSchema.safeParse(input);
}

export function validatePartialPersonalInfoSchema(input) {
  return personalInfoSchema.partial().safeParse(input);
}
