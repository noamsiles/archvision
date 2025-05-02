import z from "zod";
import { purposesListSchema } from "../../commons/purposes";
import areaSchema from "./area";
import { ObjectId } from "mongodb";

export const newProjectBodySchema = z.object({
  cityId: z.string().refine((id) => ObjectId.isValid(id)),
  name: z.string(),
  manager: z.string(),
  coManager: z.string().optional(),
  priority: z.number(),
  cost: z.number().gte(0),
  area: areaSchema,
  purpose: purposesListSchema,
});

export const newProjectSchema = {
  schema: {
    body: newProjectBodySchema,
    response: {
      201: z.string(),
    },
  },
};

const getPatchSchema = <T extends z.ZodRawShape>(bodySchema: z.ZodObject<T> | z.ZodEffects<z.ZodString>) => ({
  schema: {
    body: bodySchema,
    response: {
      200: z.string(),
    },
  },
})

const patchProjectBodySchema = z.object({
  id: z.string().refine((id) => ObjectId.isValid(id)),
  name: z.string().optional(),
  manager: z.string().optional(),
  coManager: z.string().optional(),
})

export const patchProjectSchema = getPatchSchema(patchProjectBodySchema)

const cancelProjectBodySchema = z.string().refine((id) => ObjectId.isValid(id))

export const cancelProjectSchema = getPatchSchema(cancelProjectBodySchema)
