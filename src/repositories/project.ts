import config from "../config";
import { createCollectionOperations } from "../db/operations";
import { Project, projectStatuses } from "../types/project";

const { projectsCollectionName } = config

export const insertProject = async (dbName: string, project: Project) => {
  const { insertOne } = createCollectionOperations<Project>(dbName, projectsCollectionName)
  
  const newProject = { ...project, status: projectStatuses.Ready}
  
  await insertOne(newProject)
}
