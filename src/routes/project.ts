import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { cancelProjectSchema, newProjectSchema, patchProjectSchema } from "../schemas/main-objects/project/project";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { Project } from "../types/project";
import { addProject, cancelProject, updateSingleProject } from "../services/project/basic-methods";

const projectsRouts = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/create/:username",
      newProjectSchema,
      async (request: FastifyRequest, response: FastifyReply) => {
        const username = request.params as string;
        const project = request.body as Project;

        await addProject(username, project);

        response.code(201).send({ message: "Project created successfully!" });
      }
    );

    app
    .withTypeProvider<ZodTypeProvider>()
    .patch(
      "/update/:username",
      patchProjectSchema,
      async (request: FastifyRequest, response: FastifyReply) => {
        const username = request.params as string;
        const update = request.body as Partial<Project> & { id: string };

        await updateSingleProject(username, update);

        response.code(200).send({ message: "Project updated successfully!" });
      }
    );

    app
    .withTypeProvider<ZodTypeProvider>()
    .patch(
      "/cancel/:username",
      cancelProjectSchema,
      async (request: FastifyRequest, response: FastifyReply) => {
        const username = request.params as string;
        const update = request.body as string;

        await cancelProject(username, update);

        response.code(200).send({ message: "Project canceled successfully!" });
      }
    );
};
