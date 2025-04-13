import 'dotenv/config';

const config = {
  logLevel: process.env.LOG_LEVEL ?? 'info',
  dbUrl: process.env.DB_URL!,
  projectsCollectionName: process.env.PROJECTS_COLLECTION_NAME ?? 'projects',
  port: Number(process.env.PORT) ?? 3000,
};

export default config;
