import z from "zod";
import polygonSchema from "../commons/polygon";
import { divisionPreferenceSchema } from "../commons/purposes";

const cityBodySchema = z.object({
  name: z.string(),
  mayor: z.string(),
  area: polygonSchema,
  budget: z.number().gte(0),
  divisionPreference: divisionPreferenceSchema,
});

const citySchema = {
  schema: {
    body: cityBodySchema,
    response: {
      200: z.string(),
    },
  },
};

export default citySchema;
