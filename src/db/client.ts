import { MongoClient } from "mongodb";
import config from "../config";
import logger from "../utils/logger";

const { dbUrl } = config
const client = new MongoClient(dbUrl)

export const StartDB = async () => {
	try {
		client.connect()
		logger.info('Connected successfully to server');
	} catch (err) {
		throw new Error(`Unable to connect to DB: ${err}`)
	}
}

export const closeDB = async () => {
	try {
		await client.close()
		logger.info(`successfully disconnected DB`)
	} catch (err) {
		throw new Error(`Unable to disconnect DB: ${err}`)
	}
}

export const getDB = (dbName: string) => client.db(dbName) 
