import AppDataSource from "@infra/database/db";
import { buildServer } from "server";

async function bootstrap() {
  await AppDataSource.initialize();

  const app = buildServer();

  app.listen({ port: 3000, host: '0.0.0.0' }, () => {
    console.log("App listen on port 3000");
  });
}

bootstrap();