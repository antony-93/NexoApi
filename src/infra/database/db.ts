import path from "path";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    migrationsRun: true,
    synchronize: false,
    logging: false,
    extra: {
        max: 20,
        connectionTimeoutMillis: 3000,
        idleTimeoutMillis: 10000,
    },
    ssl: false,
    entities: [path.join(__dirname, "../../modules/**/*-entity.{ts,js}")],
    migrations: [__dirname + '/migrations/**/*{.js,.ts}']
});

export default AppDataSource;