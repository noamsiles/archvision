import z from "zod";
import { purposesListSchema } from "../../commons/purposes";
import areaSchema from "./area";
import { ObjectId } from "mongodb";

export const projectBodySchema = z.object({
  cityId: z.string().refine((id) => ObjectId.isValid(id)),
  name: z.string(),
  manager: z.string(),
  coManager: z.string().optional(),
  priority: z.number(),
  cost: z.number().gte(0),
  area: areaSchema,
  purpose: purposesListSchema,
});

const projectSchema = {
  schema: {
    body: projectBodySchema,
    response: {
      201: z.string(),
    },
  },
};

export default projectSchema;
