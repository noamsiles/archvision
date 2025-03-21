import { z } from 'zod'

const divisionPreference = z.object({
  education: z.number().gte(0).lte(100).optional(),
  living: z.number().gte(0).lte(100).optional(),
  recreation: z.number().gte(0).lte(100).optional(),
  decoration: z.number().gte(0).lte(100).optional(),
  commemoration: z.number().gte(0).lte(100).optional(),
  other: z.number().gte(0).lte(100).optional()
})

export const divisionPreferenceSchema = divisionPreference.refine((purposes) =>
Number(purposes.commemoration) +
Number(purposes.decoration) +
Number(purposes.education) +
Number(purposes.living) +
Number(purposes.other) +
Number(purposes.recreation) === 100
).optional()

export const purposesList = Object.keys(divisionPreference.shape) as [string, ...string[]]

export const purposesListSchema = z.enum(purposesList).optional()