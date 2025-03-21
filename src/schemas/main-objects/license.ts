import { z } from "zod";

const licenseBodySchema = z.object({
  contact: z
    .string()
    .email()
    .or(
      z
        .string()
        .regex(/^\+?(\d{1,3})?[-. ]?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/)
    ), // Email or phone number
  username: z.string(),
  password: z.string().min(8),
  isActive: z.boolean(),
});

export const licenseSchema = {
  schema: {
    body: licenseBodySchema,
    response: {
      200: z.string(),
    },
  },
};
