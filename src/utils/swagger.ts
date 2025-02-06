import { SwaggerOptions } from "@fastify/swagger";
import config from "../config";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerConfig: SwaggerOptions = {
  openapi: {
    info: {
      title: 'aliexpress-dropshipping',
      description: 'Routes test tool for aliexpress-dropshipping project',
      version: '0.0.1',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        basicAuth:{
          type: 'http',
          scheme: 'basic',
        },
      },
    },
    security: [
			{
				basicAuth: [],
			},
		],
  },
  transform: jsonSchemaTransform,
	hideUntagged: true,
}