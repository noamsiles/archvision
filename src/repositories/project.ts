import config from "../config";
import { Filter, ObjectId } from "mongodb";
import { createCollectionOperations } from "../db/operations";
import { Project, projectStatuses } from "../types/project";

const { projectsCollectionName } = config

export const insertProject = async (dbName: string, project: Project) => {
  const { insertOne } = createCollectionOperations<Project>(dbName, projectsCollectionName)
  
  const newProject = { ...project, status: projectStatuses.Ready}
  
  await insertOne(newProject)
}

export const patchSingleProject = async (dbName: string, data: Partial<Project> & { id: string }) => {
  const { updateOne } = createCollectionOperations<Project>(dbName, projectsCollectionName)
  
  const { id, ...update } = data
  const projectId = ObjectId.createFromBase64(id)
  const filter = { _id: projectId}
  
  await updateOne(filter, update)
}

export const patchProjects = async (dbName: string, filter: Filter<Project>, update: Partial<Project>) => {
  const { updateMany } = createCollectionOperations<Project>(dbName, projectsCollectionName)
  
  await updateMany(filter, update)
}
