import { z } from "zod";
import polygonSchema from "../../commons/polygon";

const timeLine = z.object({
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
}).refine((time) => {
  const startTime = new Date(time.startTime as string)
  const endTime = new Date(time.endTime as string)
  return startTime < endTime
})

const areaSchema = z
  .object({
    polygon: polygonSchema,
    isTemporary: z.boolean(),
    estimatedTime: timeLine,
  }).optional();

export default areaSchema;
