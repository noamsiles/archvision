import pino from 'pino';

import config from '../config';

const { logLevel } = config;

const logger = pino({ level: logLevel});

export default logger;