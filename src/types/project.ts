import { z } from "zod";
import { projectBodySchema } from "../schemas/main-objects/project/project";
import documentAdds from "./document-adds";

export type Project = z.infer<typeof projectBodySchema>;

export const projectStatuses = {
  Completed: 'Completed',
  Canceled: 'Canceled',
  OnhHold: 'On hold',
  InProcess: 'In process',
  Ready: 'Ready'
} as const

type projectStatuses = { status: typeof projectStatuses[keyof typeof projectStatuses] }

export type DBProject = Project & documentAdds & projectStatuses;
