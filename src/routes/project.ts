import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import projectSchema from "../schemas/main-objects/project/project";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { Project } from "../types/project";
import { addProject } from "../services/project/add-project";

const projectsRouts = (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/create/:username",
      projectSchema,
      async (request: FastifyRequest, response: FastifyReply) => {
        const username = request.params as string;
        const project = request.body as Project;

        await addProject(username, project);

        response.code(201).send({ message: "Project created successfully!" });
      }
    );
};
