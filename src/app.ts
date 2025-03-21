import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import logger from './utils/logger'
import fastifySwagger from '@fastify/swagger'
import { swaggerConfig } from './utils/swagger'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

const app: FastifyInstance = Fastify({ logger })

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(200).send({ message: 'Hello world!'})
})

await app.register(fastifySwagger, swaggerConfig)

await app.ready()
app.swagger()

export default app