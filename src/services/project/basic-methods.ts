import { insertProject, patchSingleProject, removeProject } from "../../repositories/project";
import { Project, projectStatuses } from "../../types/project";

export const addProject = async (username: string, project: Project) => {
  await insertProject(username, project)
}

export const updateSingleProject = async (username: string, update: Partial<Project> & { id: string }) => {
  await patchSingleProject(username, update)
}

export const cancelProject = async (username: string, id: string) => {
  const update = { status: projectStatuses.Canceled }

  await removeProject(username, id, update)
}
