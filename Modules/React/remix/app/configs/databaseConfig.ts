import { env } from "process";

export const databaseConfig = {
  default: 'mysql',

  driver: {
    'mysql': {
      type: "mysql",
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      // keepConnectionAlive: false,
      synchronize: true,
      entities: [],
    }
  },

  pagination: {
    perPage: 10,
  }
}