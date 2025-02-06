import { closeDB } from "./db/client";
import { CloseServer } from "./server";
import logger from "./utils/logger";

const terminateProcessSignals = ['SIGINT', 'SIGTERM'];

const hookExit = async () => {
    for (const signal of terminateProcessSignals) {
        process.once(signal, async () => {
            logger.info({ signal }, 'Terminating process on signal:');
            await shutdown();
        });
    }
    
    process
        .once('uncaughtException', async (err: Error, origin: string) => {
            logger.fatal({ err, origin }, 'Uncaught Exception thrown');
            await shutdown();
        })
        .once('unhandledRejection', async (reason: Error) => {
            logger.fatal({ err: reason }, 'Unhandled Rejection at Promise');
            await shutdown();
        });
}

const shutdown = async () => {
	try {
		logger.info('Starting shutdown');
		await closeDB();
        await CloseServer()
		logger.info('Successfully finished shutdown');
		process.exitCode = 0;
	} catch (error) {
		logger.fatal(error, 'Close up failed:');
		process.exitCode = 1;
	}
};

export default hookExit