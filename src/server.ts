import app from "./app"
import config from "./config"
import logger from "./utils/logger"

export const StartServer = async () => {
  try {
  await app.listen({ port: config.port })
  logger.info('Server successfully connected')
  } catch (err) {
    throw new Error(`Unable to connect server: ${err}`)
  }
}

export const CloseServer = async () => {
  try {
    await app.close()
    logger.info('Server disconnected')
  } catch (err) {
    logger.error('Unable to disconnect server')
  }
}