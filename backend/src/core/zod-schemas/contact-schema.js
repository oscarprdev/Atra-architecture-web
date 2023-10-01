import { z } from 'zod';

const contactSchema = z.object({
  image: z.string().url({
    message: 'Image must be a valid URL',
  }),
});

export function validateContactSchema(input) {
  return contactSchema.safeParse(input);
}
