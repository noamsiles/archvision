import { insertProject } from "../../repositories/project";
import { Project } from "../../types/project";

export const addProject = async (username: string, project: Project) => {
  await insertProject(username, project)
}