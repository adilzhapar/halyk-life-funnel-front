import z from 'zod';

export const CreateAttributionInput = z.object({
  id: z.string().uuid(),
  gender: z.enum(['MALE, FEMALE']),
  age: z.enum(['18-24', '25-34', '35-44', '45+']),
});

export type CreateAttributionInputType = z.infer<typeof CreateAttributionInput>;