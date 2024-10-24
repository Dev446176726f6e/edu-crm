import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function start() {
  try {
    const PORT = process.env.API_PORT || 3030;
    console.log(PORT);
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle("EDU-CRM")
      .setDescription("CRM system for an education center.")
      .setVersion("1.0")
      .addTag("NESTJS")
      .addTag("TYPESCRIPT")
      .addTag("JAVASCRIPT")
      .addTag("PRISMA")
      .addTag("POSTGRESQL(PG)")
      .addTag("CLASS VALIDATION")
      .addTag("REST API")
      .addTag("JWT")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server working at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
