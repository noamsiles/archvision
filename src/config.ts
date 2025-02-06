import 'dotenv/config'

const config = {
  logLevel: process.env.LOG_LEVEL ?? 'info',
  dbUrl: process.env.DB_URL!,
  dbName: process.env.DB_NAME ?? 'aliexpress-agent',
  port: Number(process.env.PORT) ?? 3000
}

export default config