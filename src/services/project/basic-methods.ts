import { insertProject, patchSingleProject } from "../../repositories/project";
import { Project } from "../../types/project";

export const addProject = async (username: string, project: Project) => {
  await insertProject(username, project)
}

export const updateSingleProject = async (username: string, update: Partial<Project> & { id: string }) => {
  await patchSingleProject(username, update)
}
