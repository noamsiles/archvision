import z from "zod";

const coordinatesSchema = z.tuple([z.array(z.array(z.number()).length(2))]);

const polygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: coordinatesSchema
})

export default polygonSchema