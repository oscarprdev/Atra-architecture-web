import { z } from 'zod';

const aboutSchema = z.object({
  title: z.string({
    invalid_type_error: 'About title must be a string',
    required_error: 'About title is required.',
  }),
  text: z.array(
    z.string({
      required_error: 'About text is required.',
      invalid_type_error: 'About text must be an array of strings',
    })
  ),
  image: z.string().url({
    message: 'Image must be a valid URL',
  }),
});

export function validateAboutSchema(input) {
  return aboutSchema.safeParse(input);
}

export function validatePartialAboutSchema(input) {
  return aboutSchema.partial().safeParse(input);
}
